import { Request, Response, NextFunction } from 'express';
import Invoice from '../models/Invoice';
import { generateInvoicePDF } from '../services/pdf.service';
import { sendInvoiceEmail } from '../services/email.service';

export const createInvoice = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const invoiceNumber = `INV-${new Date().getFullYear()}-${Math.floor(100 + Math.random() * 900)}`;
    const invoice = await Invoice.create({
      ...req.body,
      invoiceNumber,
      vendor: req.body.vendor || req.user._id,
    });
    res.status(201).json(invoice);
  } catch (error) {
    next(error);
  }
};

export const getInvoices = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const invoices = await Invoice.find()
      .populate('vendor', 'companyName')
      .populate('purchaseOrder', 'poNumber');
    res.json(invoices);
  } catch (error) {
    next(error);
  }
};

export const getInvoiceById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const invoice = await Invoice.findById(req.params.id)
      .populate('vendor', 'companyName address gstNumber')
      .populate('purchaseOrder', 'poNumber');
    if (!invoice) {
      res.status(404);
      throw new Error('Invoice not found');
    }
    res.json(invoice);
  } catch (error) {
    next(error);
  }
};

export const markInvoicePaid = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const invoice = await Invoice.findById(req.params.id);
    if (!invoice) {
      res.status(404);
      throw new Error('Invoice not found');
    }
    
    invoice.status = 'Paid';
    await invoice.save();
    res.json(invoice);
  } catch (error) {
    next(error);
  }
};

export const generatePdfEndpoint = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const pdfPath = await generateInvoicePDF(req.params.id as string);
    res.download(pdfPath); // Sends the file as an attachment
  } catch (error) {
    next(error);
  }
};

export const sendEmailEndpoint = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const invoice = await Invoice.findById(req.params.id).populate('vendor', 'email');
    if (!invoice) {
      res.status(404);
      throw new Error('Invoice not found');
    }

    const { email, cc, subject, message } = req.body;
    
    // First generate the PDF
    const pdfPath = await generateInvoicePDF(req.params.id as string);
    
    // Then send it
    const vendorEmail = email || (invoice.vendor as any).email;
    await sendInvoiceEmail(vendorEmail, invoice.invoiceNumber, pdfPath);
    
    res.json({ message: 'Email sent successfully' });
  } catch (error) {
    next(error);
  }
};

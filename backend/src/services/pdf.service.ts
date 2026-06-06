import PDFDocument from 'pdfkit';
import fs from 'fs';
import path from 'path';
import Invoice from '../models/Invoice';

export const generateInvoicePDF = async (invoiceId: string): Promise<string> => {
  const invoice = await Invoice.findById(invoiceId)
    .populate('vendor', 'companyName address city state country postalCode gstNumber email phone')
    .populate('purchaseOrder', 'poNumber');

  if (!invoice) throw new Error('Invoice not found');

  const filePath = path.join(__dirname, '../../uploads', `Invoice-${invoice.invoiceNumber}.pdf`);

  return new Promise((resolve, reject) => {
    const doc = new PDFDocument({ margin: 50 });
    const stream = fs.createWriteStream(filePath);

    doc.pipe(stream);

    // Header
    doc
      .fillColor('#444444')
      .fontSize(20)
      .text('INVOICE', 50, 57)
      .fontSize(10)
      .text('VendorBridge ERP', 200, 50, { align: 'right' })
      .text('123 Cyber City, Phase 2', 200, 65, { align: 'right' })
      .text('Gurugram, HR 122002', 200, 80, { align: 'right' })
      .moveDown();

    // Invoice Details
    doc
      .fillColor('#000000')
      .text(`Invoice Number: ${invoice.invoiceNumber}`, 50, 200)
      .text(`Invoice Date: ${invoice.invoiceDate.toDateString()}`, 50, 215)
      .text(`Due Date: ${invoice.dueDate.toDateString()}`, 50, 230)
      .text(`Total Amount: INR ${invoice.grandTotal.toLocaleString()}`, 50, 245)
      .moveDown();

    // Line Items Table Header
    doc.text('Item', 50, 300);
    doc.text('Qty', 250, 300);
    doc.text('Price', 300, 300);
    doc.text('Tax', 400, 300);
    doc.text('Total', 450, 300);

    doc.moveTo(50, 315).lineTo(550, 315).stroke();

    // Line Items
    let y = 330;
    invoice.items.forEach(item => {
      doc.text(item.itemName, 50, y);
      doc.text(item.quantity.toString(), 250, y);
      doc.text(item.unitPrice.toString(), 300, y);
      doc.text(item.tax.toString(), 400, y);
      doc.text(item.total.toString(), 450, y);
      y += 20;
    });

    doc.moveTo(50, y + 10).lineTo(550, y + 10).stroke();

    // Summary
    doc.text(`Subtotal: INR ${invoice.subtotal}`, 350, y + 30);
    doc.text(`Discount: INR ${invoice.discount}`, 350, y + 45);
    doc.text(`Tax (GST): INR ${invoice.tax}`, 350, y + 60);
    doc.fontSize(14).text(`Grand Total: INR ${invoice.grandTotal}`, 350, y + 80);

    doc.end();

    stream.on('finish', () => resolve(filePath));
    stream.on('error', reject);
  });
};

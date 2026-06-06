import { Request, Response, NextFunction } from 'express';
import Quotation from '../models/Quotation';
import RFQ from '../models/RFQ';
import { compareQuotations } from '../services/quotationScore.service';

export const createQuotation = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const quotationNumber = `QTN-${new Date().getFullYear()}-${Math.floor(100 + Math.random() * 900)}`;
    const quotation = await Quotation.create({
      ...req.body,
      quotationNumber,
      vendor: req.body.vendor || req.user._id,
    });
    res.status(201).json(quotation);
  } catch (error) {
    next(error);
  }
};

export const getQuotations = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const quotations = await Quotation.find()
      .populate('rfq', 'rfqNumber title')
      .populate('vendor', 'companyName email');
    res.json(quotations);
  } catch (error) {
    next(error);
  }
};

export const getQuotationById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const quotation = await Quotation.findById(req.params.id)
      .populate('rfq', 'rfqNumber title')
      .populate('vendor', 'companyName email');
    if (!quotation) {
      res.status(404);
      throw new Error('Quotation not found');
    }
    res.json(quotation);
  } catch (error) {
    next(error);
  }
};

export const getQuotationsByRFQ = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const quotations = await Quotation.find({ rfq: req.params.rfqId }).populate('vendor', 'companyName email rating');
    res.json(quotations);
  } catch (error) {
    next(error);
  }
};

export const updateQuotation = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const quotation = await Quotation.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!quotation) {
      res.status(404);
      throw new Error('Quotation not found');
    }
    res.json(quotation);
  } catch (error) {
    next(error);
  }
};

export const compareQuotationEndpoint = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await compareQuotations(req.params.rfqId as string);
    res.json(result);
  } catch (error) {
    next(error);
  }
};

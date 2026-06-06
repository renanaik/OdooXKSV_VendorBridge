import { Request, Response, NextFunction } from 'express';
import RFQ from '../models/RFQ';

export const createRFQ = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const rfqNumber = `RFQ-${new Date().getFullYear()}-${Math.floor(100 + Math.random() * 900)}`;
    const rfq = await RFQ.create({
      ...req.body,
      rfqNumber,
      createdBy: req.user._id,
    });
    res.status(201).json(rfq);
  } catch (error) {
    next(error);
  }
};

export const getRFQs = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const rfqs = await RFQ.find().populate('assignedVendors', 'companyName email').populate('createdBy', 'name');
    res.json(rfqs);
  } catch (error) {
    next(error);
  }
};

export const getRFQById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const rfq = await RFQ.findById(req.params.id).populate('assignedVendors', 'companyName email');
    if (!rfq) {
      res.status(404);
      throw new Error('RFQ not found');
    }
    res.json(rfq);
  } catch (error) {
    next(error);
  }
};

export const updateRFQ = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const rfq = await RFQ.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!rfq) {
      res.status(404);
      throw new Error('RFQ not found');
    }
    res.json(rfq);
  } catch (error) {
    next(error);
  }
};

export const deleteRFQ = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const rfq = await RFQ.findByIdAndDelete(req.params.id);
    if (!rfq) {
      res.status(404);
      throw new Error('RFQ not found');
    }
    res.json({ message: 'RFQ removed' });
  } catch (error) {
    next(error);
  }
};

export const publishRFQ = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const rfq = await RFQ.findById(req.params.id);
    if (!rfq) {
      res.status(404);
      throw new Error('RFQ not found');
    }
    
    rfq.status = 'Published';
    await rfq.save();

    // Logic to email assignedVendors could go here using email.service.ts

    res.json(rfq);
  } catch (error) {
    next(error);
  }
};

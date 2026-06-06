import { Request, Response, NextFunction } from 'express';
import PurchaseOrder from '../models/PurchaseOrder';

export const createPO = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const poNumber = `PO-${new Date().getFullYear()}-${Math.floor(100 + Math.random() * 900)}`;
    const po = await PurchaseOrder.create({
      ...req.body,
      poNumber,
      approvedBy: req.user._id,
    });
    res.status(201).json(po);
  } catch (error) {
    next(error);
  }
};

export const getPOs = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const pos = await PurchaseOrder.find()
      .populate('vendor', 'companyName email')
      .populate('approvedBy', 'name');
    res.json(pos);
  } catch (error) {
    next(error);
  }
};

export const getPOById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const po = await PurchaseOrder.findById(req.params.id)
      .populate('vendor', 'companyName email address')
      .populate('quotation', 'quotationNumber');
    if (!po) {
      res.status(404);
      throw new Error('Purchase Order not found');
    }
    res.json(po);
  } catch (error) {
    next(error);
  }
};

export const updatePO = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const po = await PurchaseOrder.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!po) {
      res.status(404);
      throw new Error('Purchase Order not found');
    }
    res.json(po);
  } catch (error) {
    next(error);
  }
};

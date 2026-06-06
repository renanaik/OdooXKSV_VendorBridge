import { Request, Response, NextFunction } from 'express';
import Vendor from '../models/Vendor';

export const createVendor = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const vendorCode = `VND-${Date.now()}`;
    const newVendor = await Vendor.create({
      ...req.body,
      vendorCode,
      createdBy: req.user._id,
    });
    res.status(201).json(newVendor);
  } catch (error) {
    next(error);
  }
};

export const getVendors = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const vendors = await Vendor.find().populate('createdBy', 'name email');
    res.json(vendors);
  } catch (error) {
    next(error);
  }
};

export const getVendorById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const vendor = await Vendor.findById(req.params.id);
    if (!vendor) {
      res.status(404);
      throw new Error('Vendor not found');
    }
    res.json(vendor);
  } catch (error) {
    next(error);
  }
};

export const updateVendor = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const vendor = await Vendor.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!vendor) {
      res.status(404);
      throw new Error('Vendor not found');
    }
    res.json(vendor);
  } catch (error) {
    next(error);
  }
};

export const deleteVendor = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const vendor = await Vendor.findByIdAndDelete(req.params.id);
    if (!vendor) {
      res.status(404);
      throw new Error('Vendor not found');
    }
    res.json({ message: 'Vendor removed' });
  } catch (error) {
    next(error);
  }
};

export const searchVendors = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const keyword = req.query.keyword
      ? {
          companyName: {
            $regex: req.query.keyword as string,
            $options: 'i',
          },
        }
      : {};

    const vendors = await Vendor.find({ ...keyword });
    res.json(vendors);
  } catch (error) {
    next(error);
  }
};

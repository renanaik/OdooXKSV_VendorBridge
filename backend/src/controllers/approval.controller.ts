import { Request, Response, NextFunction } from 'express';
import Approval from '../models/Approval';

export const createApproval = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const approval = await Approval.create({
      ...req.body,
      approver: req.user._id,
    });
    res.status(201).json(approval);
  } catch (error) {
    next(error);
  }
};

export const getApprovals = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const approvals = await Approval.find().populate('approver', 'name email role');
    res.json(approvals);
  } catch (error) {
    next(error);
  }
};

export const updateApproval = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { status, remarks } = req.body;
    const approval = await Approval.findById(req.params.id);
    
    if (!approval) {
      res.status(404);
      throw new Error('Approval not found');
    }
    
    // Ensure the approver is the one modifying it, or Admin
    if (approval.approver.toString() !== req.user._id.toString() && req.user.role !== 'Admin') {
      res.status(403);
      throw new Error('Not authorized to update this approval');
    }

    approval.status = status || approval.status;
    approval.remarks = remarks || approval.remarks;
    approval.actionDate = new Date();
    
    await approval.save();
    res.json(approval);
  } catch (error) {
    next(error);
  }
};

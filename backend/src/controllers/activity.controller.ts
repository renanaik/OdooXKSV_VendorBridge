import { Request, Response, NextFunction } from 'express';
import Activity from '../models/Activity';

export const getActivities = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Only fetch for the current user if they are a vendor, otherwise fetch all (for admins)
    let query = {};
    if (req.user.role === 'Vendor') {
      query = { user: req.user._id };
    }

    const activities = await Activity.find(query)
      .populate('user', 'name role')
      .sort({ createdAt: -1 })
      .limit(50);
      
    res.json(activities);
  } catch (error) {
    next(error);
  }
};

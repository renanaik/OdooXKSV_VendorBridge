import { Request, Response, NextFunction } from 'express';
import Vendor from '../models/Vendor';
import RFQ from '../models/RFQ';
import PurchaseOrder from '../models/PurchaseOrder';

export const getDashboardStats = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const totalVendors = await Vendor.countDocuments();
    const activeRFQs = await RFQ.countDocuments({ status: { $in: ['Published', 'Quotation Received', 'Under Review'] } });
    const pendingApprovals = 5; // Mock data for now
    const pos = await PurchaseOrder.find();
    
    const totalSpend = pos.reduce((acc, po) => acc + po.grandTotal, 0);

    res.json({
      totalVendors,
      activeRFQs,
      pendingApprovals,
      totalSpend,
    });
  } catch (error) {
    next(error);
  }
};

export const getSpendingData = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Return mock data shaped for Recharts
    const data = [
      { name: 'Jan', value: 4000 },
      { name: 'Feb', value: 3000 },
      { name: 'Mar', value: 5000 },
      { name: 'Apr', value: 2780 },
      { name: 'May', value: 1890 },
      { name: 'Jun', value: 2390 },
    ];
    res.json(data);
  } catch (error) {
    next(error);
  }
};

export const getVendorPerformance = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const vendors = await Vendor.find().select('companyName rating').limit(10);
    const data = vendors.map(v => ({
      name: v.companyName,
      rating: v.rating,
    }));
    res.json(data);
  } catch (error) {
    next(error);
  }
};

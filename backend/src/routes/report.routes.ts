import express from 'express';
import { getDashboardStats, getSpendingData, getVendorPerformance } from '../controllers/report.controller';
import { protect, authorize } from '../middleware/authMiddleware';

const router = express.Router();

router.use(protect);
router.use(authorize('Admin', 'Procurement Officer', 'Manager'));

router.get('/dashboard', getDashboardStats);
router.get('/spending', getSpendingData);
router.get('/vendor-performance', getVendorPerformance);

export default router;

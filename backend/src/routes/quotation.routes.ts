import express from 'express';
import { createQuotation, getQuotations, getQuotationById, getQuotationsByRFQ, updateQuotation, compareQuotationEndpoint } from '../controllers/quotation.controller';
import { protect, authorize } from '../middleware/authMiddleware';

const router = express.Router();

router.route('/')
  .post(protect, authorize('Vendor', 'Admin', 'Procurement Officer'), createQuotation)
  .get(protect, getQuotations);

router.get('/compare/:rfqId', protect, authorize('Admin', 'Procurement Officer', 'Manager'), compareQuotationEndpoint);

router.get('/rfq/:rfqId', protect, getQuotationsByRFQ);

router.route('/:id')
  .get(protect, getQuotationById)
  .put(protect, authorize('Admin', 'Procurement Officer', 'Manager'), updateQuotation);

export default router;

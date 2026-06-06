import express from 'express';
import { createInvoice, getInvoices, getInvoiceById, markInvoicePaid, generatePdfEndpoint, sendEmailEndpoint } from '../controllers/invoice.controller';
import { protect, authorize } from '../middleware/authMiddleware';

const router = express.Router();

router.route('/')
  .post(protect, authorize('Vendor'), createInvoice)
  .get(protect, getInvoices);

router.route('/:id')
  .get(protect, getInvoiceById);

router.patch('/:id/pay', protect, authorize('Finance', 'Admin'), markInvoicePaid);

router.get('/:id/pdf', protect, generatePdfEndpoint);
router.post('/:id/email', protect, sendEmailEndpoint);

export default router;

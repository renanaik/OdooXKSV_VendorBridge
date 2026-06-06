import express from 'express';
import { createRFQ, getRFQs, getRFQById, updateRFQ, deleteRFQ, publishRFQ } from '../controllers/rfq.controller';
import { protect, authorize } from '../middleware/authMiddleware';

const router = express.Router();

router.route('/')
  .post(protect, authorize('Admin', 'Procurement Officer'), createRFQ)
  .get(protect, getRFQs);

router.route('/:id')
  .get(protect, getRFQById)
  .put(protect, authorize('Admin', 'Procurement Officer'), updateRFQ)
  .delete(protect, authorize('Admin'), deleteRFQ);

router.post('/:id/publish', protect, authorize('Admin', 'Procurement Officer'), publishRFQ);

export default router;

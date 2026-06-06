import express from 'express';
import { createPO, getPOs, getPOById, updatePO } from '../controllers/purchaseOrder.controller';
import { protect, authorize } from '../middleware/authMiddleware';

const router = express.Router();

router.route('/')
  .post(protect, authorize('Admin', 'Procurement Officer', 'Manager'), createPO)
  .get(protect, getPOs);

router.route('/:id')
  .get(protect, getPOById)
  .put(protect, authorize('Admin', 'Procurement Officer'), updatePO);

export default router;

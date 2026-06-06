import express from 'express';
import { createApproval, getApprovals, updateApproval } from '../controllers/approval.controller';
import { protect, authorize } from '../middleware/authMiddleware';

const router = express.Router();

router.route('/')
  .post(protect, createApproval)
  .get(protect, getApprovals);

router.route('/:id')
  .put(protect, authorize('Admin', 'Procurement Officer', 'Manager'), updateApproval);

export default router;

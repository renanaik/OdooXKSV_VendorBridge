import express from 'express';
import { createVendor, getVendors, getVendorById, updateVendor, deleteVendor, searchVendors } from '../controllers/vendor.controller';
import { protect, authorize } from '../middleware/authMiddleware';

const router = express.Router();

router.route('/')
  .post(protect, createVendor)
  .get(protect, getVendors);

router.route('/search').get(protect, searchVendors);

router.route('/:id')
  .get(protect, getVendorById)
  .put(protect, authorize('Admin', 'Procurement Officer'), updateVendor)
  .delete(protect, authorize('Admin'), deleteVendor);

export default router;

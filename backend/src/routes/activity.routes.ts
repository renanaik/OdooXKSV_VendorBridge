import express from 'express';
import { getActivities } from '../controllers/activity.controller';
import { protect } from '../middleware/authMiddleware';

const router = express.Router();

router.get('/', protect, getActivities);

export default router;

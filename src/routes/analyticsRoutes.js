import express from 'express';
const router = express.Router();
import {analyticsController} from '../controllers/analyticsController.js';
import auth from '../middlewares/auth.js';

// Analytics routes
router.get('/get-analytics', auth(['admin']), analyticsController.getAnalytics);
router.get('/user-growth', auth(['admin']), analyticsController.getUserGrowthAnalytics);
router.get('/daily-uploads', auth(['admin']), analyticsController.getDailyUploadsAnalytics);


export default router;


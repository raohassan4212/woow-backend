import express from 'express';
const router = express.Router();
import {analyticsController} from '../controllers/analyticsController.js';

// Analytics routes
router.get('/get-analytics', analyticsController.getAnalytics);
router.get('/user-growth', analyticsController.getUserGrowthAnalytics);
router.get('/daily-uploads', analyticsController.getDailyUploadsAnalytics);


export default router;


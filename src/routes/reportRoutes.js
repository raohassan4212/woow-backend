import express from 'express';
const router = express.Router();
import { reportController } from '../controllers/reportController.js';

// appSlider routes
router.get('/get-report', reportController.getReport);

export default router;
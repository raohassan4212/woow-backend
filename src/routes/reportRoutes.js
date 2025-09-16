import express from 'express';
const router = express.Router();
import { reportController } from '../controllers/reportController.js';
import auth from '../middlewares/auth.js';

// appSlider routes
router.get('/get-report', auth(['admin']), reportController.getReport);
router.get('/get-report-reason', auth(['admin']), reportController.getReportReason);


export default router;
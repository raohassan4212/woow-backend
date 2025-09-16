import express from 'express';
const router = express.Router();
import { couponController } from '../controllers/couponController.js';
import auth from '../middlewares/auth.js';

// appSlider routes
router.get('/get-coupon', auth(['admin']), couponController.getCoupon);

export default router;
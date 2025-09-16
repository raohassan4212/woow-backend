import express from 'express';
const router = express.Router();
import { giftController } from '../controllers/giftController.js';
import auth from '../middlewares/auth.js';

// appSlider routes
router.get('/get-gift', auth(['admin']), giftController.getGift);

export default router;
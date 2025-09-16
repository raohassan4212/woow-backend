import express from 'express';
const router = express.Router();
import { coinController } from '../controllers/coinController.js';
import auth from '../middlewares/auth.js';

// appSlider routes
router.get('/get-coin-worth', auth(['admin']), coinController.getCoinWorth);

export default router;
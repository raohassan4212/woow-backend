import express from 'express';
const router = express.Router();
import { withdrawController } from '../controllers/withdrawController.js';
import auth from '../middlewares/auth.js';

// appSlider routes
router.get('/get-withdraw-request', auth(['admin']), withdrawController.getWithdrawRequest);

export default router;
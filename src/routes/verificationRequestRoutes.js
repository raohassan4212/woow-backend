import express from 'express';
const router = express.Router();
import { verificationRequestController } from '../controllers/verificationRequestController.js';
import auth from '../middlewares/auth.js';

// Users routes
router.get('/verification-requests', auth(['admin']), verificationRequestController.getVerificationRequests);


export default router;
import express from 'express';
const router = express.Router();
import { verificationRequestController } from '../controllers/verificationRequestController.js';

// Users routes
router.get('/verification-requests', verificationRequestController.getVerificationRequests);


export default router;
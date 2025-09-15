import express from 'express';
const router = express.Router();
import {soundController} from '../controllers/soundController.js';
import auth from '../middlewares/auth.js';

// Users routes
router.get('/sounds', auth(['admin']), soundController.getSounds);
router.get('/sound-sections', auth(['admin']), soundController.getSoundSections);

export default router;
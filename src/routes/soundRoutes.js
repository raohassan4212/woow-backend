import express from 'express';
const router = express.Router();
import {soundController} from '../controllers/soundController.js';

// Users routes
router.get('/sounds', soundController.getSounds);
router.get('/sound-sections', soundController.getSoundSections);

export default router;
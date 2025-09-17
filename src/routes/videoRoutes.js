import express from 'express';
const router = express.Router();
import {videoController} from '../controllers/videoController.js';
import auth from '../middlewares/auth.js';

// Users routes
router.get('/videos', auth(['admin']), videoController.getVideos);
router.get('/get-nude-detected-video', auth(['admin']), videoController.getNudeDetectedVideo);


export default router;  
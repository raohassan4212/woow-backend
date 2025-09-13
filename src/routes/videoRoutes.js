import express from 'express';
const router = express.Router();
import {videoController} from '../controllers/videoController.js';

// Users routes
router.get('/videos', videoController.getVideos);


export default router;
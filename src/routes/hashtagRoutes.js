import express from 'express';
const router = express.Router();
import { hashtagController } from '../controllers/hashtagController.js';

// appSlider routes
router.get('/get-hashtag', hashtagController.getHashtag);

export default router;
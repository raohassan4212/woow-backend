import express from 'express';
const router = express.Router();
import { hashtagController } from '../controllers/hashtagController.js';
import auth from '../middlewares/auth.js';

// appSlider routes
router.get('/get-hashtag', auth(['admin']), hashtagController.getHashtag);

export default router;
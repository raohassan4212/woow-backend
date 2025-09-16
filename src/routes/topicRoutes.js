import express from 'express';
const router = express.Router();
import { topicController } from '../controllers/topicController.js';
import auth from '../middlewares/auth.js';

// appSlider routes
router.get('/get-topic', auth(['admin']), topicController.getTopic);

export default router;
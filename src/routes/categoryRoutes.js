import express from 'express';
const router = express.Router();
import { categoryController } from '../controllers/categoryController.js';
import auth from '../middlewares/auth.js';

// appSlider routes
router.get('/get-category', auth(['admin']), categoryController.getCategory);

export default router;
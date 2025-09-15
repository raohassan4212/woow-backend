import express from 'express';
const router = express.Router();
import {appSliderController} from '../controllers/appSliderController.js';
import auth from '../middlewares/auth.js';

// appSlider routes
router.get('/get-app-slider', auth(['admin']), appSliderController.getAppSlider);

export default router;
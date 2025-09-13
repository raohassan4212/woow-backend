import express from 'express';
const router = express.Router();
import {appSliderController} from '../controllers/appSliderController.js';

// appSlider routes
router.get('/get-app-slider', appSliderController.getAppSlider);

export default router;
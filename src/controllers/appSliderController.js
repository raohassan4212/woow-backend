import { appSliderService } from '../services/appSliderService.js';

const getAppSlider = async (req, res) => {
  try {
    const response = await appSliderService.getAppSliders(req.query);
    return res.status(201).json(response);
  } catch (error) {
    return res.status(400).json(
      {
        code: 400,
        success: false,
        message: error.message,
        data: null
      }
    );
  }
};

export const appSliderController = {
    getAppSlider,
  }

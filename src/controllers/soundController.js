import { soundService } from '../services/soundService.js';

const getSounds = async (req, res) => {
  try {
    const sound = await soundService.getSounds(req.query);
    return res.status(201).json(sound);
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

const getSoundSections = async (req, res) => {
    try {
      const sound = await soundService.getSoundSections(req.query);
      return res.status(201).json(sound);
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

export const soundController = {
    getSounds,
    getSoundSections
  }

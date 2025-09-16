import { giftService } from '../services/giftService.js';

const getGift = async (req, res) => {
  try {
    const response = await giftService.getGifts(req.query);
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

export const giftController = {
    getGift,
  }

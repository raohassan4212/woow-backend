import { coinService } from '../services/coinService.js';

const getCoinWorth = async (req, res) => {
  try {
    const response = await coinService.getCoinWorth(req.query);
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

export const coinController = {
    getCoinWorth,
  }

import { withdrawService } from '../services/withdrawService.js';

const getWithdrawRequest = async (req, res) => {
  try {
    const response = await withdrawService.getWithdrawRequests(req.query);
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

export const withdrawController = {
    getWithdrawRequest,
  }

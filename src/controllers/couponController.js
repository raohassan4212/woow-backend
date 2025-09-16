import { couponService } from '../services/couponService.js';

const getCoupon = async (req, res) => {
  try {
    const response = await couponService.getCoupons(req.query);
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

export const couponController = {
    getCoupon,
  }

import {analyticsService} from '../services/analyticsService.js';

const getAnalytics = async (req, res) => {
  try {
    const analytics = await analyticsService.getAnalytics(req.query);
    return res.status(201).json(analytics);
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

const getUserGrowthAnalytics = async (req, res) => {
  try {
    const analytics = await analyticsService.getUserGrowthAnalytics(req.query);
    return res.status(200).json(analytics);
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

const getDailyUploadsAnalytics = async (req, res) => {
  try {
    const analytics = await analyticsService.getDailyUploadsAnalytics(req.query);
    return res.status(200).json(analytics);
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

export const analyticsController = {
    getAnalytics,
    getUserGrowthAnalytics,
    getDailyUploadsAnalytics
  }

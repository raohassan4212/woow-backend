import { reportService } from '../services/reportService.js';

const getReport = async (req, res) => {
  try {
    const response = await reportService.getReports(req.query);
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

export const reportController = {
    getReport,
  }

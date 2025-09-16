import { topicService } from '../services/topicService.js';

const getTopic = async (req, res) => {
  try {
    const response = await topicService.getTopics(req.query);
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

export const topicController = {
    getTopic,
  }

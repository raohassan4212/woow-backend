import { hashtagService } from '../services/hashtagService.js';

const getHashtag = async (req, res) => {
  try {
    const response = await hashtagService.getHashtags(req.query);
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

export const hashtagController = {
    getHashtag,
  }

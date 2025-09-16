import { categoryService } from '../services/categoryService.js';

const getCategory = async (req, res) => {
  try {
    const response = await categoryService.getCategories(req.query);
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

export const categoryController = {
    getCategory,
  }
    
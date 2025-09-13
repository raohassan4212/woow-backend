import httpStatus from 'http-status';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config/env.js';
import ApiError from '../utils/ApiError.js';
import { User } from '../models';

const auth = (roles = []) => {
  return async (req, res, next) => {
    try {
      // Get token from header
      const authHeader = req.headers.authorization;
      const token = authHeader && authHeader.split(' ')[1];

      if (!token) {
        throw new ApiError(httpStatus.UNAUTHORIZED, 'Authentication required');
      }

      // Verify token
      const decoded = jwt.verify(token, JWT_SECRET);
      
      // Check if user still exists
      const user = await User.findByPk(decoded.sub);
      
      if (!user) {
        throw new ApiError(httpStatus.UNAUTHORIZED, 'User not found');
      }

      // Check if user is authorized for the route
      if (roles.length && !roles.includes(user.role)) {
        throw new ApiError(httpStatus.FORBIDDEN, 'Insufficient permissions');
      }

      // Add user to request object
      req.user = user;
      next();
    } catch (error) {
      if (error.name === 'TokenExpiredError') {
        next(new ApiError(httpStatus.UNAUTHORIZED, 'Token expired'));
      } else if (error.name === 'JsonWebTokenError') {
        next(new ApiError(httpStatus.UNAUTHORIZED, 'Invalid token'));
      } else {
        next(error);
      }
    }
  };
};

export default auth;

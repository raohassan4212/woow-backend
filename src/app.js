import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import httpStatus from 'http-status';
import { rateLimit } from 'express-rate-limit';
import {errorConverter,errorHandler} from './middlewares/error.js';
// import routes from './routes';
// import { errorConverter, errorHandler } from './middlewares/error';
import ApiError from './utils/ApiError.js';
import config from './config/env.js';
import logger from './utils/logger.js';
import dbConnection from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import usersRoutes from './routes/usersRoutes.js';
import videoRoutes from './routes/videoRoutes.js';
import soundRoutes from './routes/soundRoutes.js';
import verificationRequestRoutes from './routes/verificationRequestRoutes.js';
import analyticsRoutes from './routes/analyticsRoutes.js';
import appSliderRoutes from './routes/appSliderRoutes.js';
import hashtagRoutes from './routes/hashtagRoutes.js';
import reportRoutes from './routes/reportRoutes.js';
import giftRoutes from './routes/giftRoutes.js';
import couponRoutes from './routes/couponRoutes.js';
import coinRoutes from './routes/coinRoutes.js';
import topicRoutes from './routes/topicRoutes.js';
import withdrawRoutes from './routes/withdrawRoutes.js';
import categoryRoutes from './routes/categoryRoutes.js'

const app = express();

const allowedOrigins = [
  "https://woowsocial.com",
  "https://admin.woowsocial.com",
  "http://localhost:3000",
  "http://localhost:5000"
];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin) return callback(null, true); // allow non-browser requests (Postman, curl)
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    } else {
      return callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));
app.options("*", cors(corsOptions)); // make sure OPTIONS always handled

// Parse JSON request body
app.use(express.json());

// Parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

// Connect to database
await dbConnection();

// Limit repeated failed requests to auth endpoints
if (config.env === 'production') {
  const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per windowMs
    message: 'Too many requests from this IP, please try again after 15 minutes',
  });

  // Apply to all auth routes
  app.use('/api/auth', limiter);
}

// API routes
// app.use('/api', routes);
app.use('/api/auth', authRoutes);
app.use('/api/user', usersRoutes);
app.use('/api/video', videoRoutes);
app.use('/api/sound', soundRoutes);
app.use('/api/verification', verificationRequestRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use('/api/app-slider', appSliderRoutes);
app.use('/api/hashtag', hashtagRoutes);
app.use('/api/report', reportRoutes);
app.use('/api/gift', giftRoutes);
app.use('/api/coupon', couponRoutes);
app.use('/api/coin', coinRoutes);
app.use('/api/topic', topicRoutes);
app.use('/api/withdraw', withdrawRoutes);
app.use('/api/category', categoryRoutes);

// Send 404 for any unknown API request
app.use((req, res, next) => {
  next(new ApiError(httpStatus.NOT_FOUND, 'Not found'));
});

// Convert error to ApiError, if needed
app.use(errorConverter);

// Handle error
app.use(errorHandler);

export default app;

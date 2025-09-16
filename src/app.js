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

const app = express();


// // CORS configuration - MUST be before helmet
// const corsOptions = {
//   origin: function (origin, callback) {
//     // Allow requests with no origin (like mobile apps or curl requests)
//     if (!origin) return callback(null, true);
    
//     const allowedOrigins = ["https://woowsocial.com", "http://localhost:5000"];
//     if (allowedOrigins.indexOf(origin) !== -1) {
//       callback(null, true);
//     } else {
//       callback(new Error('Not allowed by CORS'));
//     }
//   },
//   methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
//   allowedHeaders: [
//     "Origin",
//     "X-Requested-With", 
//     "Content-Type", 
//     "Accept",
//     "Authorization",
//     "Cache-Control",
//     "X-Access-Token"
//   ],
//   credentials: true,
//   optionsSuccessStatus: 200, // Some legacy browsers choke on 204
//   preflightContinue: false
// };

// // Apply CORS to all requests
// app.use(cors(corsOptions));

// // Debug middleware to log CORS headers
// app.use((req, res, next) => {
//   console.log(`${req.method} ${req.url}`);
//   console.log('Origin:', req.headers.origin);
//   console.log('Access-Control-Request-Method:', req.headers['access-control-request-method']);
//   console.log('Access-Control-Request-Headers:', req.headers['access-control-request-headers']);
  
//   // Log response headers after they're set
//   const originalSend = res.send;
//   res.send = function(data) {
//     console.log('Response headers:', {
//       'Access-Control-Allow-Origin': res.get('Access-Control-Allow-Origin'),
//       'Access-Control-Allow-Methods': res.get('Access-Control-Allow-Methods'),
//       'Access-Control-Allow-Headers': res.get('Access-Control-Allow-Headers'),
//       'Access-Control-Allow-Credentials': res.get('Access-Control-Allow-Credentials')
//     });
//     return originalSend.call(this, data);
//   };
  
//   next();
// });

// // Handle preflight requests with the same configuration
// app.options("*", cors(corsOptions));

// // Configure helmet to not interfere with CORS
// app.use(helmet({
//   crossOriginResourcePolicy: { policy: "cross-origin" }
// }));


// Enable CORS
app.use(cors());
app.options('*', cors());
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

// Send 404 for any unknown API request
app.use((req, res, next) => {
  next(new ApiError(httpStatus.NOT_FOUND, 'Not found'));
});

// Convert error to ApiError, if needed
app.use(errorConverter);

// Handle error
app.use(errorHandler);

export default app;

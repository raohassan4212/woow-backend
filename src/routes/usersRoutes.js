import express from 'express';
import {usersController} from '../controllers/usersController.js';
import auth from '../middlewares/auth.js';

const router = express.Router();

// Only admin can access the users list
router.get('/users', auth(['admin']), usersController.getUsers);

// Both admin and user can access their own details
router.get('/user-details', auth(['admin', 'user']), usersController.getUserDetails);

export default router;
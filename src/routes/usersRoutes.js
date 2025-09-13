import express from 'express';
const router = express.Router();
import {usersController} from '../controllers/usersController.js';

// Users routes
router.get('/users', usersController.getUsers);
router.get('/user-details', usersController.getUserDetails);

export default router;
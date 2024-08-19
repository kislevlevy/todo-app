// Imports:
import express from 'express';

import {
  loginUser,
  newUser,
  logoutUser,
  generateToken,
} from '../controllers/authController.js';
import { getUsers, getUserById } from '../controllers/userController.js';
import taskRouter from './taskRoutes.js';

// Initiation for router:
const router = express.Router();

// Auth routing:
router.route('/login').post(loginUser, generateToken);
router.route('/register').post(newUser, generateToken);
router.route('/logout').post(logoutUser);

// User routing:
router.use('/:id/tasks', taskRouter);
router.route('/').get(getUsers);
router.route('/:id').get(getUserById);

// Exports:
export default router;

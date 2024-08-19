// Imports:
import User from '../models/userModel.js';
import { getDocs, getDocById } from '../utils/methodesFactory.js';

//////////////////////////////////////////////////
// Get all users:
export const getUsers = getDocs(User, 'users');

// Get user by ID:
export const getUserById = getDocById(User, 'user');

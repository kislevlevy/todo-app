// Imports:
import Task from '../models/taskModel.js';
import {
  getDocs,
  createDoc,
  patchDocById,
  deleteDocById,
} from '../utils/methodesFactory.js';

//////////////////////////////////////////////////
// Post new task:
export const setCreateTask = (req, res, next) => {
  req.body.user = req.user._id;
  next();
};
export const createTask = createDoc(Task, 'task');

// Get tasks by user ID:
export const getTasks = getDocs(Task, 'tasks');

// Edit task by ID:
export const editTaskById = patchDocById(Task, 'task');

// Delete task by ID:
export const deleteTaskById = deleteDocById(Task);

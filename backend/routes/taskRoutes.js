// Imports:
import express from 'express';

import {
  getTasks,
  createTask,
  setCreateTask,
  editTaskById,
  deleteTaskById,
} from '../controllers/taskController.js';
import { checkToken } from '../controllers/authController.js';

// Initiation for router:
const router = express.Router({ mergeParams: true });

// Routing:
router
  .route('/')
  .get(checkToken, getTasks)
  .post(checkToken, setCreateTask, createTask);

router
  .route('/:id')
  .patch(checkToken, editTaskById)
  .delete(checkToken, deleteTaskById);

// Export module:
export default router;

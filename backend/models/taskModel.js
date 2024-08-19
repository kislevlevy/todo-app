// Imports:
import mongoose from 'mongoose';

// Schema
const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    maxLength: [20, 'Task title cannot exceed 300 characters.'],
  },
  desc: {
    type: String,
    maxLength: [300, 'Task description cannot exceed 300 characters.'],
  },
  isCompleted: {
    type: Boolean,
    default: false,
  },
  due: {
    type: Date,
    min: [Date.now(), 'Due date must be today or later'],

    default: new Date(Date.now() + 86_400_000 * 7),
  },
  urgency: {
    type: String,
    enum: {
      values: ['first', 'next', 'later'],
      message: 'Task urgency can only be first, next, or later',
    },
    default: 'next',
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true, 'User is required.'],
  },
});

// Export
const Task = mongoose.model('Task', taskSchema);
export default Task;

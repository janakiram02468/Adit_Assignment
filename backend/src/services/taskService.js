const Task = require('../models/Task');
const AppError = require('../utils/AppError');

const getTasks = async (userId, { status = 'all', page = 1, limit = 10, search = '' }) => {
  const filter = { user: userId };

  if (status !== 'all') {
    filter.status = status;
  }

  if (search) {
    filter.$or = [
      { title: { $regex: search, $options: 'i' } },
      { description: { $regex: search, $options: 'i' } },
    ];
  }

  const skip = (page - 1) * limit;

  const [tasks, total] = await Promise.all([
    Task.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit),
    Task.countDocuments(filter),
  ]);

  return {
    tasks,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit) || 1,
    },
  };
};

const getTaskById = async (taskId, userId) => {
  const task = await Task.findOne({ _id: taskId, user: userId });
  if (!task) {
    throw new AppError('Task not found.', 404);
  }
  return task;
};

const createTask = async (userId, data) => {
  return Task.create({ ...data, user: userId });
};

const updateTask = async (taskId, userId, data) => {
  const task = await Task.findOneAndUpdate(
    { _id: taskId, user: userId },
    data,
    { new: true, runValidators: true }
  );

  if (!task) {
    throw new AppError('Task not found.', 404);
  }

  return task;
};

const deleteTask = async (taskId, userId) => {
  const task = await Task.findOneAndDelete({ _id: taskId, user: userId });
  if (!task) {
    throw new AppError('Task not found.', 404);
  }
  return task;
};

const toggleTaskStatus = async (taskId, userId) => {
  const task = await getTaskById(taskId, userId);
  task.status = task.status === 'completed' ? 'pending' : 'completed';
  await task.save();
  return task;
};

module.exports = {
  getTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
  toggleTaskStatus,
};

const taskService = require('../services/taskService');
const asyncHandler = require('../utils/asyncHandler');

const getTasks = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 10;
  const status = req.query.status || 'all';
  const search = req.query.search || '';

  const result = await taskService.getTasks(req.user._id, {
    status,
    page,
    limit,
    search,
  });

  res.status(200).json({ success: true, data: result });
});

const getTask = asyncHandler(async (req, res) => {
  const task = await taskService.getTaskById(req.params.id, req.user._id);
  res.status(200).json({ success: true, data: { task } });
});

const createTask = asyncHandler(async (req, res) => {
  const task = await taskService.createTask(req.user._id, req.body);
  res.status(201).json({ success: true, data: { task } });
});

const updateTask = asyncHandler(async (req, res) => {
  const task = await taskService.updateTask(req.params.id, req.user._id, req.body);
  res.status(200).json({ success: true, data: { task } });
});

const deleteTask = asyncHandler(async (req, res) => {
  await taskService.deleteTask(req.params.id, req.user._id);
  res.status(200).json({ success: true, message: 'Task deleted successfully' });
});

const toggleTask = asyncHandler(async (req, res) => {
  const task = await taskService.toggleTaskStatus(req.params.id, req.user._id);
  res.status(200).json({ success: true, data: { task } });
});

module.exports = {
  getTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask,
  toggleTask,
};

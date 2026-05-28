const express = require('express');
const taskController = require('../controllers/taskController');
const { protect } = require('../middleware/auth');
const validate = require('../middleware/validate');
const {
  taskCreateRules,
  taskUpdateRules,
  taskIdRules,
  taskQueryRules,
} = require('../middleware/validators');

const router = express.Router();

router.use(protect);

router.get('/', taskQueryRules, validate, taskController.getTasks);
router.get('/:id', taskIdRules, validate, taskController.getTask);
router.post('/', taskCreateRules, validate, taskController.createTask);
router.put('/:id', taskUpdateRules, validate, taskController.updateTask);
router.patch('/:id/toggle', taskIdRules, validate, taskController.toggleTask);
router.delete('/:id', taskIdRules, validate, taskController.deleteTask);

module.exports = router;

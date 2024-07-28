const Task = require('../models/task');

// Create a new task
exports.createTask = async (req, res) => {
    try {
      const { name, description, dueDate } = req.body;
  
      if (!name) {
        return res.status(400).json({ error: 'Name is required' });
      }
  
      const existingTask = await Task.findOne({ where: { name } });
      if (existingTask) {
        return res.status(400).json({ error: 'Name already exists' });
      }
  
      if (description && description.length > 255) {
        return res.status(400).json({ error: 'Description must be 255 characters or less' });
      }
  
      const dueDateObj = new Date(dueDate);
      if (dueDateObj <= new Date()) {
        return res.status(400).json({ error: 'Due date must be a future date' });
      }
  
      const task = await Task.create({ name, description, dueDate, status: 'CREATED' });
  
      res.status(201).json({ id: task.id });
    } catch (error) {
      res.status(500).json({ error: 'An error occurred while creating the task' });
    }
  };
  

// Get list of tasks
exports.getTaskList = async (req, res) => {
    try {
        const tasks = await Task.findAll();
        res.status(200).json({ message: 'Task list successful', tasks });
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while retrieving tasks' });
    }
};

// Update a task
exports.updateTask = async (req, res) => {
    try {
      const { id } = req.params;
      const { name, description, status, dueDate } = req.body;
  
      const task = await Task.findByPk(id);
      if (!task) {
        return res.status(404).json({ error: 'Task not found' });
      }
  
      if (name) task.name = name;
      if (description) task.description = description;
      if (status) task.status = status;
      if (dueDate) {
        const dueDateObj = new Date(dueDate);
        if (dueDateObj <= new Date()) {
          return res.status(400).json({ error: 'Due date must be a future date' });
        }
        task.dueDate = dueDate;
      }
  
      await task.save();
  
      res.status(200).json({ message: 'Task update successful', task });
    } catch (error) {
      res.status(500).json({ error: 'An error occurred while updating the task' });
    }
  };
  

// Delete a task
exports.deleteTask = async (req, res) => {
    try {
        const { id } = req.params;

        const task = await Task.findByPk(id);
        if (!task) {
            return res.status(404).json({ error: 'Task not found' });
        }

        await task.destroy();

        res.status(200).json({ message: 'Delete task successful' });
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while deleting the task' });
    }
};

// Get task by ID
exports.getTaskById = async (req, res) => {
    try {
        const { id } = req.params;
        const task = await Task.findByPk(id);

        if (!task) {
            return res.status(404).json({ error: 'Task not found' });
        }

        res.status(200).json({ message: 'Task retrieved successfully', task });
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while retrieving the task' });
    }
};
// routes/taskRoutes.js

const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const taskController = require("../controllers/taskController"); // This line was missing

// Apply the auth middleware to all task routes
router.use(auth);

// @route   GET api/tasks
// @desc    Get all user tasks
router.get("/", taskController.getTasks);

// @route   POST api/tasks
// @desc    Create a new task
router.post("/", taskController.createTask);

// @route   PUT api/tasks/:id
// @desc    Update a task
router.put("/:id", taskController.updateTask);

// @route   DELETE api/tasks/:id
// @desc    Delete a task
router.delete("/:id", taskController.deleteTask);

module.exports = router;

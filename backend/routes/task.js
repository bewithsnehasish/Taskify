const router = require("express").Router();
const Task = require("../models/task");
const User = require("../models/user");
const authenticationToken = require("./auth");

// Create-Task
router.post("/create-task", authenticationToken, async (req, res) => {
  try {
    const { title, desc } = req.body;
    const userId = req.headers["id"]; // Access user ID from the header

    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    const existingTask = await Task.findOne({ title });
    if (existingTask) {
      return res.status(400).json({ message: "Task title already exists" });
    }

    // Create and save the new task
    const newTask = new Task({ title, desc });
    const savedTask = await newTask.save();
    const taskId = savedTask._id;

    // Update the user with the new task ID
    await User.findByIdAndUpdate(userId, { $push: { tasks: taskId } });

    res.status(200).json({ message: "Task Created" });
  } catch (error) {
    console.error(error); // Use console.error to log the error
    res.status(500).json({ message: "Internal Server Error" });
  }
});

//Get All Task
router.get("/get-all-task", authenticationToken, async (req, res) => {
  try {
    const userId = req.headers["id"];
    const user = await User.findById(userId).populate({
      path: "tasks",
      options: { sort: { createdAt: -1 } },
    });
    res.status(200).json({
      username: user.username,
      email: user.email,
      tasks: user.tasks,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json("Internal Server Error");
  }
});

//delete task
// Delete-Task from the database in order to find and remove it for the user
router.delete("/delete-task/:id", authenticationToken, async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.headers["id"];
    await Task.findByIdAndDelete(id);
    await User.findByIdAndUpdate(userId, { $pull: { tasks: id } });
    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

//Update task
router.put("/update-task/:id", authenticationToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { title, desc } = req.body;
    await Task.findByIdAndUpdate(id, { title, desc });
    res.status(200).json({ message: "Task updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

//Update important task
router.put(
  "/update-important-task/:id",
  authenticationToken,
  async (req, res) => {
    try {
      const { id } = req.params;
      const TaskData = await Task.findById(id);
      const impTask = TaskData.important;
      await Task.findByIdAndUpdate(id, { important: !impTask });
      res.status(200).json({ message: "Task updated important successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },
);

//Update Completed task
router.put(
  "/update-completed-task/:id",
  authenticationToken,
  async (req, res) => {
    try {
      const { id } = req.params;
      const TaskData = await Task.findById(id);
      const completedTask = TaskData.completed;
      await Task.findByIdAndUpdate(id, { completed: !completedTask });
      res.status(200).json({ message: "Task updated successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },
);

//Get All Important Task
router.get("/get-imp-task", authenticationToken, async (req, res) => {
  try {
    const userId = req.headers["id"];
    const Data = await User.findById(userId).populate({
      path: "tasks",
      match: { important: true },
      options: { sort: { createdAt: -1 } },
    });
    const ImportantTask = Data.tasks;
    res.status(200).json({
      data: ImportantTask,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json("Internal Server Error");
  }
});

//Get All Completed Task
router.get("/get-complete-task", authenticationToken, async (req, res) => {
  try {
    const userId = req.headers["id"];
    const Data = await User.findById(userId).populate({
      path: "tasks",
      match: { complete: true },
      options: { sort: { createdAt: -1 } },
    });
    const CompletedTask = Data.tasks;
    res.status(200).json({
      data: CompletedTask,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json("Internal Server Error");
  }
});

module.exports = router;

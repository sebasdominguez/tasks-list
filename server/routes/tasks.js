const Task = require("../models/task");
const express = require("express");
const router = express.Router();

function success(res, payload) {
  return res.status(200).json(payload);
}

router.get("/", async (req, res) => {
  try {
    const tasks = await Task.find({});
    return success(res, tasks);
  } catch (error) {
    next({ status: 400, message: "failed to get tasks" });
  }
});

router.post("/", async (req, res) => {
  try {
    const task = await Task.create(req.body);
    return success(res, task);
  } catch (error) {
    next({ status: 400, message: "failed to create task" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const task = await Task.findOneAndUpdate(req.params.id, req.body, {
      new: true,
    });
    return success(res, task);
  } catch (error) {
    next({ status: 400, message: "failed to update taks" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await Task.findByIdAndRemove(req.params.id);
    return success(res, "task deleted");
  } catch (error) {
    next({ status: 400, message: "failed to delete task" });
  }
});

router.use((err, req, res, next) => {
  return res.status(err.status || 400).json({
    status: err.status || 400,
    message: err.message || "there was an error processing request",
  });
});

module.exports = router;

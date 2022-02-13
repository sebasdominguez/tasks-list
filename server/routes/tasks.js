const Task = require("../models/task");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const tasks = await Task.find({});
    res.status(200).json(tasks);
  } catch (error) {
    res.send(error);
  }
});

router.post("/", async (req, res) => {
  try {
    const task = await new Task(req.body).save();
    res.status(200).json(task);
  } catch (error) {
    res.send({
      status: 400,
      message: "Failed to create todo. Check if the task is already listed.",
    });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await Task.findByIdAndRemove(req.params.id);
    const tasks = await Task.find();
    res.status(200).json(tasks);
  } catch (error) {
    res.send(error);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const task = await Task.findOneAndUpdate({ _id: req.params.id }, req.body);
    res.status(200).json(task);
  } catch (error) {
    res.send(error);
  }
});

module.exports = router;

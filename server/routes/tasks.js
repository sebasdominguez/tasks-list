const fetch = require("node-fetch");
// const generateUUID = require("../utils/uuid");
const Task = require("../models/task");
const express = require("express");
const router = express.Router();

const createTasks = (response) =>
  response.map((task) =>
    new Task({
      // Let mongoose create the id dynamically
      // _id: generateUUID(),
      task,
      completed: false,
    }).save()
  );

router.get("/:param", async (req, res) => {
  try {
    const param = req.query.param;
    const originalTasks = await Task.find({});
    if (
      param === "custom" ||
      (req.query.firstFetch === "true" && originalTasks.length)
    ) {
      return res.status(200).json(originalTasks);
    } else {
      const quantity = param;
      let checkedQuantity =
        originalTasks.length > 0 ? quantity - originalTasks.length : quantity;

      const fetchedTaks = async (qty) => {
        const randomTasks = await fetch(
          `https://lorem-faker.vercel.app/api?quantity=${qty.toString()}`
        );
        const response = await randomTasks.json();
        Promise.all(createTasks(response)).then((responses) =>
          res.status(200).json([...originalTasks, ...responses])
        );
      };
      if (checkedQuantity > 0) {
        fetchedTaks(checkedQuantity);
      } else {
        res.status(201).json({
          message: `You already have ${quantity} cards`,
          tasks: originalTasks,
        });
      }
    }
  } catch (error) {
    res.send(error);
  }
});

router.post("/api", async (req, res) => {
  try {
    const task = await new Task(req.body).save();
    res.status(200).json(task);
  } catch (error) {
    res.send({
      status: 400,
      message: "Failed to create task. Check if the task is already listed.",
    });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await Task.findByIdAndRemove(req.query.id);
    const tasks = await Task.find();
    res.status(200).json(tasks);
  } catch (error) {
    res.send(error);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const task = await Task.findOneAndUpdate({ _id: req.query.id }, req.body);
    res.status(200).json(task);
  } catch (error) {
    res.send(error);
  }
});

module.exports = router;

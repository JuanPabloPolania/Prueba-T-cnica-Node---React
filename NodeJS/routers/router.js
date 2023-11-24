import express from "express";
import roasterService from "../services/roasterService.js";

export const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const tasks = await roasterService.getTasks();
    res.json({ tasks });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const task = req.body;
    const result = await roasterService.createTask(task);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const task = await roasterService.getTaskById(id);
    if (task) {
      res.json(task);
    } else {
      res.status(404).json({ error: "Task not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const task = req.body;
    const { id } = req.body;
    if (task.id !== id) {
      res.status(400).json({ error: "Id param must be equal to taskId" });
    } else {
      const updatedRows = await roasterService.updateTask({
        taskId: id,
        ...task,
      });
      if (updatedRows > 0) {
        res.status(200).json({ message: "tweet updated successfully" });
      } else {
        res.status(404).json({ error: "Task not found" });
      }
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const deletedRows = await roasterService.deleteTask(id);
    if (deletedRows > 0) {
      res.status(200).json({ message: "Task deleted" });
    } else {
      res.status(404).json({ message: "Task not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

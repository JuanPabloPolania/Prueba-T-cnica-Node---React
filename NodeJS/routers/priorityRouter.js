import express from "express";
import priorityService from "../services/priorityService.js";

export const priorityRouter = express.Router();

priorityRouter.get("/", async (req, res) => {
  try {
    const priorities = await priorityService.getPriorities();
    res.json({ priorities });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

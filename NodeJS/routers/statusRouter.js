import express from "express";
import statusService from "../services/statusService.js";

export const statusRouter = express.Router();

statusRouter.get("/", async (req, res) => {
  try {
    const status = await statusService.getStatus();
    res.json({ status });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

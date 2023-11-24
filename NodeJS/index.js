import express from "express";
import cors from "cors";
import { taskRouter } from "./routers/taskRouter.js";
import { priorityRouter } from "./routers/priorityRouter.js";
import { statusRouter } from "./routers/statusRouter.js";

import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use("/roaster/tasks", taskRouter);
app.use("/roaster/priorities", priorityRouter);
app.use("/roaster/status", statusRouter);

app.listen(process.env.PORT || 3000, () => {
  console.log(`server listening on http://localhost:${process.env.PORT}`);
});

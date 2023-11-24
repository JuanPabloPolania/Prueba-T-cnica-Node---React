import express from "express";
import cors from "cors";
import { router } from "./routers/router.js";
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use("/roaster", router);

app.listen(process.env.PORT || 3000, () => {
  console.log(`server listening on http://localhost:${process.env.PORT}`);
});

import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import { api } from "./routes/api";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8001;

app.use(cors({ origin: "*" }));
app.use(express.json());

app.use("/api", api);

mongoose
  .connect(process.env.MONGO_URI as string)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Connected to DB ${process.env.MONGO_URI}`);
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("DB connection error:", err);
  });

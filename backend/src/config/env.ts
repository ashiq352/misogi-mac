import dotenv from "dotenv";

dotenv.config();

export const envConfig = {
  PORT: process.env.PORT || "8001",
  MONGO_URI: process.env.MONGO_URI,
  JWT_SECRET: process.env.JWT_SECRET || "iamateapot",
};

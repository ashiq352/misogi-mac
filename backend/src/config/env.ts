import dotenv from "dotenv";

dotenv.config();

export const envConfig = {
  PORT: process.env.PORT || "8001",
  MONGO_URI: process.env.MONGO_URI,
  JWT_SECRET: process.env.JWT_SECRET || "iamateapot",

  // Amazon S3 Keys
  S3_USER_KEY: process.env.S3_USER_KEY,
  S3_USER_SECRET: process.env.S3_USER_SECRET,
  S3_BUCKET_NAME: process.env.S3_BUCKET_NAME ?? "artWork",
  S3_BUCKET_REGION: process.env.S3_BUCKET_REGION ?? "us-east-2",
};

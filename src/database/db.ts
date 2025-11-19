import mongoose from "mongoose";
import { MONGO_URI } from "@/config/env";
import logger from "@/utils/logger";

if (!MONGO_URI) {
  throw new Error("Please specify MONGO_URI in the environment variable");
}

export const connectToDB = async () => {
  try {
    await mongoose.connect(MONGO_URI as string);
    logger.info('Mongo DB connected successfully')
  } catch (error) {
    logger.error(`Error connecting to database:- ${error}`);
    process.exit(1);
  }
};

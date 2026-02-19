import mongoose from "mongoose";
import { database_name } from "../constants.js";

const connectDb = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.DATABASE_URI}/${database_name}`
    );
    console.log(`DB HOST:${connectionInstance.connection.host}`);
  } catch (error) {
    console.log("error:", error);
  }
};

export default connectDb;

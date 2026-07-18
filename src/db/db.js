import mongoose from "mongoose";
import { dbName } from "../constants.js";

export const dbConnect = async () => {
  try {
    const q = await mongoose.connect(`${process.env.MONGODB_URI}/${dbName}`);
    console.log("mongoDb connection established:", q.connection.host);
  } catch (error) {
    console.log("db connection error:", error);
    process.exit(1);
  }
};

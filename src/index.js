import dotenv from "dotenv";
import connectDb from "./db/db.js";

dotenv.config({
  path: "./env",
});

connectDb();

// const express = require("express");

// const app = express();

//1st approach to connect db in the index file itself
// (async () => {
//   try {
//     await mongoose.connect(`${process.env.DATABASE_URI}/${database_name}`);
//     app.on("Error", (error) => {
//       console.log("error:", error);
//     });

//     app.listen(process.env.PORT, () => {
//       console.log(`the server is listening at ${process.env.PORT}`);
//     });
//   } catch (error) {
//     console.log("Error :", error);
//     throw error;
//   }
// })();

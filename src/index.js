import dotenv from "dotenv";
import app from "./app.js";
import connectDb from "./db/db.js";

dotenv.config({
  path: "./env",
});

connectDb()
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`serve is running at ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log("mongo db connection has failed", err);
  });

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

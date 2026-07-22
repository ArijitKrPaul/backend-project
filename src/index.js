import dotenv from "dotenv";
dotenv.config({
  path: "./.env",
});

import app from "./app.js";
import { dbConnect } from "./db/db.js";

dbConnect()
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`server is listening at ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.log("MongoDB connection failed", error);
  });

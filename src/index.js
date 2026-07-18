import dotenv from "dotenv";
import { app } from "./app.js";
import { dbConnect } from "./db/db.js";

dotenv.config({
  path: "./.env",
});

dbConnect()
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`server is listening at ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.log("MongoDB connection failed", error);
  });

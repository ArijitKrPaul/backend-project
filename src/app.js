import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";

const app = express();

app.use(express.json());
app.use(cors());
app.use(express.static("public"));

app.use(express.urlencoded({ extended: true, limit: "16kb" }));

app.use(cookieParser());

export default app;

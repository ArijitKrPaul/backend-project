import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      requried: true,
    },
  },
  { timestamps: true },
);

const Category = new model("Category");

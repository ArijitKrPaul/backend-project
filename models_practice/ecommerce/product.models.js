import mongoose, { model } from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      lowercase: true,
    },
    descrition: {
      type: String,
      required: true,
    },
    productImage: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      default: [0, "set the price of the product"],
    },
    stock: {
      type: Number,
      required: true,
      default: [0, "replenish the stock"],
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true },
);

const Product = new model("Product", productSchema);

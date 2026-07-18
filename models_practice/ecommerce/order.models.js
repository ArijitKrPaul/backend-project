import mongoose, { model } from "mongoose";

const orderItemSchema = new mongoose.Schema(
  {
    products: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },
    quantity: {
      type: Number,
      required: true,
      default: 1,
    },
  },
  { timestamps: true },
);

const orderSchema = new mongoose.Schema(
  {
    price: {
      type: Number,
      required: true,
    },
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    orderItems: {
      type: [orderItemSchema],
    },
  },
  { timestamps: true },
);

const Order = new model("Order", orderSchema);

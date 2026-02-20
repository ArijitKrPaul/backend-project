import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unqiue: true,
      lowercase: true,
      index: true,
    },
    watchHistory: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Video",
      },
    ],
    email: {
      type: String,
      required: true,
      unqiue: true,
      lowercase: true,
    },
    fullName: {
      type: String,
      required: true,
      trim: true,
    },
    avatar: {
      type: String, //cloudinary URL where images are stored and it returns a url
      required: true,
    },
    coverImage: {
      type: String, //cloudinary URL where images are stored and it returns a url
    },
    password: {
      type: String,
      required: [true, "pasword is required"],
    },
    refreshToken: {
      type: String,
    },
  },
  { timestamps: true }
);

export const User = mongoose.model("User", userSchema);

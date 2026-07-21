import User from "../models/user.models.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
import uploadOnCloudinary from "../utils/cloudinary.js";

const userRegister = asyncHandler(async (req, res) => {
  //req body info
  //validation - not empty
  //password hashing
  //check if user already exists or not
  //storing the img in the local server
  //uploading the image to cloudinary
  //refresh token
  //create user object
  //saving it to database mongoDB

  const { userName, email, fullName, password } = req.body;
  console.log(userName, email, password, fullName);

  if (
    [userName, email, fullName, password].some((e) => {
      return e.trim() === "";
    })
  ) {
    throw new ApiError(400, "please fill out the empty field");
  }

  const existingUser = User.findOne({ $or: [{ email }, { userName }] });

  if (existingUser) {
    throw new ApiError(409, "User already exists");
  }

  const avatarLocalPath = req.files?.avatar[0]?.path;
  const coverLocalPath = req.files?.coverImage[0]?.path;

  if (!avatarLocalPath) {
    throw new ApiError(400, "avatar image is needed");
  }

  const avatarURL = await uploadOnCloudinary(avatarLocalPath);
  const coverURL = await uploadOnCloudinary(coverLocalPath);

  if (!avatar) {
    throw new ApiError(500, "avatar image couldnt be uploaded");
  }

  const user = await User.create({
    fullName: fullName,
    avatar: avatarURL.url,
    username: userName.toLowerCase(),
    coverImage: coverImage?.url || "",
    password: password,
    email: email,
  });

  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  if (!createdUser) {
    throw new ApiError(500, "User not registered");
  }

  return res
    .status(201)
    .json(new ApiResponse(200, createdUser, "Registered successfully"));
});

export { userRegister };

import User from "../models/user.models.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
import uploadOnCloudinary from "../utils/cloudinary.js";

const generateAndRefreshToken = async (userId) => {
  try {
    const user = User.findById(userId);
    const refreshToken = user.generateRefreshToken();
    const accessToken = user.generateAccessToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return { refreshToken, accessToken };
  } catch (error) {
    throw new ApiError(
      500,
      "Something went wrong while generating access and refresh token"
    );
  }
};

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

  const existingUser = await User.findOne({ $or: [{ email }, { userName }] });

  console.log(existingUser);

  if (existingUser) {
    throw new ApiError(409, "User already exists");
  }

  const avatarLocalPath = req.files?.avatar[0]?.path;
  const coverLocalPath = req.files?.coverImage[0]?.path;

  if (!avatarLocalPath) {
    throw new ApiError(400, "avatar image is needed");
  }

  const avatarURL = await uploadOnCloudinary(avatarLocalPath);
  const coverImage = await uploadOnCloudinary(coverLocalPath);

  if (!avatarURL) {
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

const loginUser = asyncHandler(async (req, res) => {
  //accept req
  //find record
  //match password
  //generate access token and refresh token
  //if refresh token available generate access token
  //send token in secure cookies
  //response login is done

  const { username, email, password } = req.body;

  const existingUser = await User.findOne({ $or: [{ email }, { username }] });

  if (!existingUser) {
    throw new ApiError(409, "User does not exist, please register first");
  }

  const isPasswordValid = await existingUser.isPasswordCorrect(password);

  if (!isPasswordValid) {
    throw new ApiError(409, "Invalid Password");
  }

  const { refreshToken, accessToken } = await generateAndRefreshToken(user._id);

  const loggedInUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(
        200,
        {
          user: loggedInUser,
          refreshToken,
          accessToken,
        },
        "user logged in successfully"
      )
    );
});

const logoutUser = asyncHandler(async (req, res) => {
  await User.findByIdAndUpdate(
    req.user._id,
    {
      $set: {
        refreshToken: undefined,
      },
    },
    {
      new: true,
    }
  );
  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "user logged out successfully"));
});

export { loginUser, logoutUser, userRegister };

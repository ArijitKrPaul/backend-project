import { Router } from "express";
import {
  loginUser,
  logoutUser,
  refreshAccessToken,
  userRegister,
} from "../controllers/user.contoller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();

router.route("/register").post(
  upload.fields([
    {
      name: "avatar",
      maxCount: 1,
    },
    {
      name: "coverImage",
      maxCount: 1,
    },
  ]),
  userRegister
);

router.route("/login").post(loginUser);

//secured routes

router.route("/logout").post(verifyJWT, logoutUser);

router.route("/refreshToken").post(refreshAccessToken);

export default router;

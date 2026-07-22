import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
import fs from "node:fs";
dotenv.config();

cloudinary.config({
  secure: true,
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) {
      return null;
    } else {
      //upload the file to cloudinary
      const result = await cloudinary.uploader.upload(localFilePath, {
        resource_type: "auto",
      });

      console.log(result.url);
      return result;
    }
  } catch (error) {
    fs.unlinkSync(localFilePath); //remove the locally saved temporary file
    console.log(error, 1);
    return null;
  }
};

export default uploadOnCloudinary;

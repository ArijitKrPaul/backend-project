import { v2 as cloudinary } from "cloudinary";
import fs from "node:fs";

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
      return response;
    }
  } catch (error) {
    fs.unlinkSync(localFilePath); //remove the locally saved temporary file

    return null;
  }
};

export default uploadOnCloudinary;

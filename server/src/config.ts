import { v2 as cloudinary } from "cloudinary";
import mongoose from "mongoose";
import File from "./model/File";

cloudinary.config({
  cloud_name: "rajpatel",
  api_key: "188151581258493",
  api_secret: "ztSFwB4Im6hIEkF4B-U9Zlzj8I0",
});

const deleteTask = async () => {
  try {
    const twoHoursAgo = new Date(Date.now() - 2 * 60 * 60 * 1000);
    const filesToDelete = await File.find({ createdAt: { $lte: twoHoursAgo } });

    for (const file of filesToDelete) {
      // Delete from Cloudinary
      await cloudinary.uploader.destroy(file.publicId);

      // Delete from MongoDB
      await File.findByIdAndDelete(file._id);
    }
    console.log("Deletion task completed.");
  } catch (err) {
    console.log(err);
  }
};

// Schedule deletion task to run every hour (adjust as needed)
setInterval(deleteTask, 60 * 60 * 1000);

const connectDataBase = () => {
  mongoose
    .connect("mongodb://127.0.0.1:27017/file-sharing")
    .then(() => {
      console.log(`Connected to MONGO DB`);
      deleteTask();
    })
    .catch((error) => console.error("Error connecting to MongoDB:", error));
};
export { cloudinary, connectDataBase };

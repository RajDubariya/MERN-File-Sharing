import bytes from "bytes";
import { UploadApiResponse } from "cloudinary";
import { Request, Response } from "express";
import fs from "fs";
import { cloudinary } from "../config";
import File from "../model/File";

function formatSize(size: number) {
  return bytes(size, { unitSeparator: " " });
}
const uploadFile = async (req: Request, res: Response) => {
  try {
    const { file } = req;

    if (!file) {
      return res.status(400).json({ message: "No file uploaded !!" });
    }

    const response: UploadApiResponse = await cloudinary.uploader.upload(
      file?.path,
      {
        folder: "file-sharing",
        public_id: file.originalname,
      }
    );

    const { bytes, secure_url, format, public_id } = response;

    const newFile = await File.create({
      filename: file.originalname,
      secure_url: secure_url,
      size: formatSize(bytes),
      format: format,
      publicId: public_id,
    });
    // Delete temporary file after upload
    fs.unlinkSync(file.path);

    return res.status(200).json({
      message: "File uploaded sucessfully !!",
      file: newFile,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

export { uploadFile };

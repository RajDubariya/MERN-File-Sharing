import mongoose, { Document } from "mongoose";

const fileSchema = new mongoose.Schema(
  {
    filename: {
      type: String,
      required: true,
    },
    secure_url: {
      type: String,
      required: true,
    },
    format: {
      type: String,
      required: true,
    },
    size: {
      type: String,
      required: true,
    },
    publicId: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

interface IFile extends Document {
  filename: string;
  secure_url: string;
  formar: string;
  size: string;
  publicId: string;
}
const File = mongoose.model<IFile>("File", fileSchema);
export default File;

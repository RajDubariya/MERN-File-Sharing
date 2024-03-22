import express, { Router } from "express";
import { uploadFile } from "../controllers/fileController";
import multer from "multer";

const fileRouter: Router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

fileRouter.post("/upload", upload.single("file"), uploadFile);
export default fileRouter;

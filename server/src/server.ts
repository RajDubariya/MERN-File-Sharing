import express, { Application } from "express";
import fileRouter from "./routes/fileRoute";
import cors from "cors";
import { connectDataBase } from "./config";

const app: Application = express();
const PORT: number = 8000;

connectDataBase();
app.use(express.json());
app.use(cors());

app.use("/api/file", fileRouter);

app.listen(PORT, () => {
  console.log(`server started at ${PORT}`);
});

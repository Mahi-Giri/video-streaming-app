import express from "express";
import dotenv from "dotenv";
import authRoute from "./router/auth.route.js"
import videoRoute from "./router/video.route.js";
import cookieParser from "cookie-parser";
import connectDB from "./db/index.js";
import cors from "cors";

dotenv.config();

const app = express();

app.use(express.json());

app.use(cookieParser());

app.use(cors());

connectDB()
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`Server is running on port ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log(`Unable to connect mongoDB server.... ${err}`);
  });

app.use("/api/v1/auth", authRoute);
app.use("/api/v1/video", videoRoute);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});

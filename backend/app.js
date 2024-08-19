// Imports:
import express from "express";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";

import AppError from "./utils/appError.js";
import userRouter from "./routes/userRoutes.js";
import taskRouter from "./routes/taskRoutes.js";
import errorController from "./controllers/errorController.js";

// App initiation:
const app = express();

// Cors config:
const corsWhiteList = [
  "https://todo-app.kislev.me/",
  "https://todo-app.kislev.me",
  process.env.FRONT_END,
  process.env.FRONT_END + "/",
];
const corsConfig = {
  origin: (origin, callback) => {
    if (!origin || corsWhiteList.includes(origin)) callback(null, true);
    else callback(new Error("Not allowed by CORS"));
  },
  credentials: true,
  optionsSuccessStatus: 200,
};

// Middleware:
app.use("/public", express.static("public"));
app.use(cors(corsConfig));
app.use(cookieParser());
app.use(express.json());
app.use(morgan(process.env.NODE_ENV === "dev" ? "dev" : "combined"));

// Routes middleware:
app.use("/api/v1/user", userRouter);
app.use("/api/v1/task", taskRouter);

// All routes:
app.all("*", (req, res, next) =>
  next(
    new AppError(
      404,
      `Cannot find desired request on this server. - (${req.originalUrl})`
    )
  )
);
app.use(errorController);

// Error handler:
app.use((err, req, res, next) => {
  console.log(err);

  res.status(err.status).json({
    status: "fail",
    message: err.message,
  });
});

// Export:
export default app;

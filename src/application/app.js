import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import bodyParser from "body-parser";
import router from "../routes/index.js";
import { errorMiddleware } from "../middleware/error.middleware.js";

const app = express();

app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/api", router);
app.get("/health", (req, res) => {
  res.send("OK");
});

app.use(errorMiddleware);

export default app;

import express from "express";
import authRoutes from "./auth.routes.js";
import eventRoutes from "./event.routes.js";
import homeRoutes from "./home.routes.js";

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/events", eventRoutes);
router.use("/home", homeRoutes);

export default router;

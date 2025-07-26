import express from "express";
import { authenticate } from "../middleware/auth.middleware.js";
import {
  registerController,
  loginController,
  getProfileController,
  updateProfileController,
} from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/register", registerController);
router.post("/login", loginController);
router.get("/profile", authenticate, getProfileController);
router.put("/update-profile", authenticate, updateProfileController);

export default router;

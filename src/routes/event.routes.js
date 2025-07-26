import express from "express";
import { authenticate } from "../middleware/auth.middleware.js";
import { checkRole } from "../middleware/role.middleware.js";
import {
  createEventController,
  getAllEventsController,
  getEventByIdController,
} from "../controllers/event.controller.js";

const router = express.Router();

router.post("/", authenticate, checkRole(["admin"]), createEventController);
router.get("/", getAllEventsController);
router.get("/:id", getEventByIdController);

export default router;

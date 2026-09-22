import express from "express";

import { saveProfile, showProfile } from "../handlers/profile.js";
import { requireAuth } from "../middleware/auth.js";

export const profileRoutes = express.Router();

profileRoutes.get("/profile", requireAuth, showProfile);
profileRoutes.post("/profile", requireAuth, saveProfile);

import express from "express";

import { showDirectory } from "../handlers/directory.js";
import { requireAuth } from "../middleware/auth.js";

export const directoryRoutes = express.Router();

directoryRoutes.get("/directory", requireAuth, showDirectory);

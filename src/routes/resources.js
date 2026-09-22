import express from "express";

import { listResources, showResource } from "../handlers/resources.js";
import { requireAuth } from "../middleware/auth.js";

export const resourceRoutes = express.Router();

resourceRoutes.get("/resources", requireAuth, listResources);
resourceRoutes.get("/resources/:id", requireAuth, showResource);

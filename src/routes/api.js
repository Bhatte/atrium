import express from "express";

import { profileJson, staffAccountsJson } from "../handlers/api.js";
import { requireAuth } from "../middleware/auth.js";

export const apiRoutes = express.Router();

apiRoutes.get("/api/profile/:id", requireAuth, profileJson);
apiRoutes.get("/api/admin/users", requireAuth, staffAccountsJson);

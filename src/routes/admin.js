import express from "express";

import { showAdminUsers } from "../handlers/admin.js";
import { requireAdmin } from "../middleware/auth.js";

export const adminRoutes = express.Router();

adminRoutes.get("/admin/users", requireAdmin, showAdminUsers);

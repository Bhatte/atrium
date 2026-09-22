import express from "express";

import { showDashboard, home } from "../handlers/home.js";
import { showLogin, signIn, signOut } from "../handlers/auth.js";
import { requireAuth } from "../middleware/auth.js";

export const indexRoutes = express.Router();

indexRoutes.get("/", home);
indexRoutes.get("/login", showLogin);
indexRoutes.post("/login", signIn);
indexRoutes.post("/logout", requireAuth, signOut);
indexRoutes.get("/dashboard", requireAuth, showDashboard);

import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

import express from "express";
import session from "express-session";

import { sessionOptions } from "./config/session.js";
import { openDatabase } from "./db/connection.js";
import { errorHandler, notFound } from "./middleware/errors.js";
import { adminRoutes } from "./routes/admin.js";
import { apiRoutes } from "./routes/api.js";
import { directoryRoutes } from "./routes/directory.js";
import { indexRoutes } from "./routes/index.js";
import { profileRoutes } from "./routes/profile.js";
import { resourceRoutes } from "./routes/resources.js";

const HERE = dirname(fileURLToPath(import.meta.url));
const VIEWS_DIR = join(HERE, "..", "views");
const PUBLIC_DIR = join(HERE, "..", "public");

/**
 * Build the Atrium application around one database file. The caller decides
 * where it listens, so tests can run several apps side by side.
 */
export function createApp({ dbPath }) {
  const db = openDatabase(dbPath);
  const app = express();

  app.set("view engine", "ejs");
  app.set("views", VIEWS_DIR);

  app.locals.db = db;

  app.use(express.urlencoded({ extended: false }));
  app.use(session(sessionOptions));
  app.use(express.static(PUBLIC_DIR));

  app.use(indexRoutes);
  app.use(directoryRoutes);
  app.use(resourceRoutes);
  app.use(profileRoutes);
  app.use(adminRoutes);
  app.use(apiRoutes);

  app.use(notFound);
  app.use(errorHandler);

  return app;
}

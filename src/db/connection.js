import { mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

import Database from "better-sqlite3";

const HERE = dirname(fileURLToPath(import.meta.url));

/** Where the lab database lives when nothing else is given. */
export const DEFAULT_DB_PATH = join(HERE, "..", "..", "data", "atrium.db");

/**
 * Open the SQLite database. The folder is created the first time, so a fresh
 * checkout works without any setup.
 */
export function openDatabase(dbPath) {
  mkdirSync(dirname(dbPath), { recursive: true });

  const db = new Database(dbPath);
  db.pragma("foreign_keys = ON");
  return db;
}

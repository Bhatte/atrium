import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

import { hashPassword } from "../auth/passwords.js";
import { openDatabase } from "./connection.js";
import { RESOURCES, USERS } from "./seed-data.js";

const HERE = dirname(fileURLToPath(import.meta.url));
const SCHEMA_PATH = join(HERE, "schema.sql");

const INSERT_USER = "INSERT INTO users (id, username, display_name, email, department, role, bio, password_hash) " +
                    "VALUES (?, ?, ?, ?, ?, ?, ?, ?)";

const INSERT_RESOURCE = "INSERT INTO resources (id, title, description, category, owner_id) VALUES (?, ?, ?, ?, ?)";

/**
 * Rebuild the lab database: empty tables, then the seed data, in one
 * transaction. Running it as often as you like leaves the same data behind.
 */
export function resetDatabase(dbPath) {
  const db = openDatabase(dbPath);

  try {
    const schema = readFileSync(SCHEMA_PATH, "utf8");

    const rebuild = db.transaction(() => {
      db.exec(schema);

      const addUser = db.prepare(INSERT_USER);
      for (const person of USERS) {
        addUser.run(
          person.id,
          person.username,
          person.display_name,
          person.email,
          person.department,
          person.role,
          person.bio,
          hashPassword(person.password)
        );
      }

      const addResource = db.prepare(INSERT_RESOURCE);
      for (const item of RESOURCES) {
        addResource.run(item.id, item.title, item.description, item.category, item.owner_id);
      }
    });

    rebuild();
  } finally {
    db.close();
  }
}

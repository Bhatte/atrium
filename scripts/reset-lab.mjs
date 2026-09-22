#!/usr/bin/env node
import { DEFAULT_DB_PATH } from "../src/db/connection.js";
import { resetDatabase } from "../src/db/reset.js";
import { USERS } from "../src/db/seed-data.js";

const dbPath = process.argv[2] || DEFAULT_DB_PATH;

resetDatabase(dbPath);

console.log(`Atrium lab data rebuilt in ${dbPath}`);
console.log("");
console.log("  id   username          password          role");
for (const person of USERS) {
  console.log(
    `  ${String(person.id).padEnd(4)} ${person.username.padEnd(17)} ${person.password.padEnd(17)} ${person.role}`
  );
}
console.log("");

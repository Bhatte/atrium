#!/usr/bin/env node
import { DEFAULT_DB_PATH, openDatabase } from "../src/db/connection.js";

const REQUIRED_NODE_MAJOR = 24;

const dbPath = process.argv[2] || DEFAULT_DB_PATH;
const problems = [];

const nodeMajor = Number(process.versions.node.split(".")[0]);
console.log(`Node            v${process.versions.node}`);
if (nodeMajor < REQUIRED_NODE_MAJOR) {
  problems.push(`Atrium needs Node ${REQUIRED_NODE_MAJOR} or newer (found v${process.versions.node}).`);
}

console.log(`Database        ${dbPath}`);

try {
  const db = openDatabase(dbPath);
  try {
    const users = db.prepare("SELECT count(*) AS total FROM users").get().total;
    const resources = db.prepare("SELECT count(*) AS total FROM resources").get().total;
    console.log(`Reachable       yes. ${users} colleagues, ${resources} shared documents`);
  } finally {
    db.close();
  }
} catch (err) {
  if (/no such table/i.test(err.message)) {
    console.log("Reachable       not yet. The lab data has not been loaded.");
    console.log("");
    console.log("This is normal the first time. Run `npm run reset` to load it.");
    process.exit(0);
  }
  problems.push(`The database could not be read: ${err.message}`);
}

console.log("");

if (problems.length) {
  for (const problem of problems) console.log(`Problem: ${problem}`);
  console.log("Run `npm run reset` and try again.");
  process.exit(1);
}

console.log("Everything looks good.");

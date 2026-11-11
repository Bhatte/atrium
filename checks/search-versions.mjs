// Five versions of the directory search. Run them with:  npm run check:versions
//
// Each version is a different attempt at the Week 8 repair. This file runs the
// same three searches against all five, on a fresh copy of the starting data,
// and prints what each one returned. It does not change your own Atrium.

import { mkdtempSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

import { openDatabase } from "../src/db/connection.js";
import { resetDatabase } from "../src/db/reset.js";

const COLUMNS = "SELECT id, display_name, email, department, role FROM users ";

const VERSIONS = [
  {
    name: "A  As shipped",
    search(db, q) {
      const sql = COLUMNS +
        "WHERE display_name LIKE '%" + q + "%' " +
        "OR department LIKE '%" + q + "%'";
      return db.prepare(sql).all();
    }
  },
  {
    name: "B  Hide the error",
    search(db, q) {
      const sql = COLUMNS +
        "WHERE display_name LIKE '%" + q + "%' " +
        "OR department LIKE '%" + q + "%'";
      try {
        return db.prepare(sql).all();
      } catch {
        return [];
      }
    }
  },
  {
    name: "C  Remove the quotes",
    search(db, q) {
      const text = q.replaceAll("'", "");
      const sql = COLUMNS +
        "WHERE display_name LIKE '%" + text + "%' " +
        "OR department LIKE '%" + text + "%'";
      return db.prepare(sql).all();
    }
  },
  {
    name: "D  ? for the name only",
    search(db, q) {
      const sql = COLUMNS +
        "WHERE display_name LIKE ? " +
        "OR department LIKE '%" + q + "%'";
      return db.prepare(sql).all("%" + q + "%");
    }
  },
  {
    name: "E  ? for both",
    search(db, q) {
      const sql = COLUMNS + "WHERE display_name LIKE ? OR department LIKE ?";
      const term = "%" + q + "%";
      return db.prepare(sql).all(term, term);
    }
  }
];

const SEARCHES = [
  { text: "Keane", expected: "Bob Keane" },
  { text: "Morgan Doyle'", expected: "nobody" },
  { text: "' OR '1'='1", expected: "nobody" }
];

const dbPath = join(mkdtempSync(join(tmpdir(), "atrium-versions-")), "atrium.db");
resetDatabase(dbPath);
const db = openDatabase(dbPath);

function run(version, text) {
  try {
    const rows = version.search(db, text);
    if (rows.length === 0) return "nobody";
    if (rows.length === 3) return "everyone";
    return rows.map((row) => row.display_name).join(", ");
  } catch {
    return "page breaks";
  }
}

const colour = process.stdout.isTTY ? (code, text) => `\x1b[${code}m${text}\x1b[0m` : (code, text) => text;
const pad = (text, width) => String(text).padEnd(width);

console.log("\nFive versions of the directory search\n");
console.log("  " + pad("Version", 26) + SEARCHES.map((s) => pad(s.text, 16)).join("") + "Result");
console.log("  " + pad("Expected", 26) + SEARCHES.map((s) => pad(s.expected, 16)).join(""));
console.log("");
for (const version of VERSIONS) {
  const got = SEARCHES.map((s) => run(version, s.text));
  const green = got.every((value, i) => value === SEARCHES[i].expected);
  console.log("  " + pad(version.name, 26) + got.map((g) => pad(g, 16)).join("") +
    (green ? colour(32, "GREEN") : colour(31, "RED")));
}
console.log("");
db.close();

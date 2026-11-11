// The directory check. Run it with:  npm run check
//
// It checks the directory search in your own copy of Atrium. It does not need
// the server running, and it never touches your data: it builds a fresh copy
// of the starting data, signs in as Alice, and tries four searches.
//
// Each line states the result a working directory should give, before the
// search is tried. GREEN means the result matched. RED means it did not.

import { freshApp, signIn, resultsTable, ALICE } from "../tests/helpers/app.js";

const COLLEAGUES = ["Alice Nolan", "Bob Keane", "Morgan Doyle"];

const { app } = freshApp();
const alice = await signIn(app, ALICE.username, ALICE.password);

// Alice searches the directory, the same as typing into the search box.
async function search(text) {
  return alice.get("/directory").query({ q: text });
}

// Which colleagues appear in the results table. Alice's own name is always in
// the page header, so only the table is read.
function whoWasFound(page) {
  if (page.status !== 200) return `page breaks (${page.status})`;
  const found = COLLEAGUES.filter((name) => resultsTable(page.text).includes(name));
  if (found.length === 0) return "nobody";
  if (found.length === COLLEAGUES.length) return "everyone";
  return found.join(", ");
}

const results = [];

function record(check, expected, got, meaning) {
  results.push({ check, expected, got, green: got === expected, meaning });
}

// 1. The search still does its job.
record("Search for Keane", "Bob Keane", whoWasFound(await search("Keane")),
  "The ordinary search no longer finds Bob Keane.");

// 2. Typed text cannot change the database query. Nobody's name contains
//    these characters, so a safe search finds nobody.
for (const text of ["Morgan Doyle'", "' OR '1'='1"]) {
  record(`Search for ${text}`, "nobody", whoWasFound(await search(text)),
    "The typed text changed the database query.");
}

// 3. The page shows typed text as text. An escaped summary contains &lt;u&gt;,
//    which the browser displays as <u>. A raw summary contains a real <u> tag.
const page = await search("<u>W9</u>");
const summary = (page.text.match(/<p class="result-summary">([\s\S]*?)<\/p>/) || ["", ""])[1];
record("Page summary for <u>W9</u>", "shown as text",
  summary.includes("&lt;u&gt;W9&lt;/u&gt;") ? "shown as text" : "acted on by the browser",
  "The page summary prints the search text without escaping it.");

const colour = process.stdout.isTTY ? (code, text) => `\x1b[${code}m${text}\x1b[0m` : (code, text) => text;
const pad = (text, width) => String(text).padEnd(width);

console.log("\nAtrium directory check\n");
console.log("  " + pad("Check", 28) + pad("Expected", 16) + pad("Got", 26) + "Result");
for (const r of results) {
  const verdict = r.green ? colour(32, "GREEN") : colour(31, "RED");
  console.log("  " + pad(r.check, 28) + pad(r.expected, 16) + pad(r.got, 26) + verdict);
}

const red = results.filter((r) => !r.green);
console.log(`\n${results.length - red.length} green, ${red.length} red.`);
for (const r of red) console.log(`  RED: ${r.check}. ${r.meaning}`);
console.log("");

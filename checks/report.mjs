// Shared by the checks in this folder.

import { randomBytes } from "node:crypto";

// From Week 11, Atrium may refuse to start without a session key. The checks
// run their own temporary copy of the application, so they supply a key of
// their own when none is set. Your terminal and your data are not changed.
export function supplySessionKey() {
  if (!process.env.ATRIUM_SESSION_SECRET) {
    process.env.ATRIUM_SESSION_SECRET = randomBytes(32).toString("hex");
  }
}

const colour = process.stdout.isTTY
  ? (code, text) => `\x1b[${code}m${text}\x1b[0m`
  : (code, text) => text;

const pad = (text, width) => String(text).padEnd(width);

// Each result is { check, expected, got, meaning }. A line is GREEN when what
// came back is what was expected, and RED when it is not.
export function printReport(title, results, widths = [34, 18, 26]) {
  const [a, b, c] = widths;
  console.log(`\n${title}\n`);
  console.log("  " + pad("Check", a) + pad("Expected", b) + pad("Got", c) + "Result");
  for (const r of results) {
    const green = r.got === r.expected;
    console.log("  " + pad(r.check, a) + pad(r.expected, b) + pad(r.got, c) +
      (green ? colour(32, "GREEN") : colour(31, "RED")));
  }
  const red = results.filter((r) => r.got !== r.expected);
  console.log(`\n${results.length - red.length} green, ${red.length} red.`);
  for (const r of red) console.log(`  RED: ${r.check}. ${r.meaning}`);
  console.log("");
}

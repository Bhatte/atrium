#!/usr/bin/env node
/**
 * Run the course's static analysis rules over Atrium.
 *
 *   npm run scan
 *
 * The rules live in scan-rules/ and are plain text. Open them and read them.
 * A rule is something a person wrote, and knowing that changes how much weight
 * you give to what it reports.
 */

import { spawnSync } from "node:child_process";
import { existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = join(HERE, "..");

const probe = spawnSync("semgrep", ["--version"], { encoding: "utf8", shell: process.platform === "win32" });

if (probe.error || probe.status !== 0) {
  console.log("Semgrep is not installed, or it is not on your PATH.\n");
  console.log("To install it you need Python, then:\n");
  console.log("    pip install semgrep\n");
  console.log("Check it worked with:\n");
  console.log("    semgrep --version\n");
  console.log("If you cannot get it running, use the saved scan output in the lab");
  console.log("folder instead. You can complete every step of the exercise with it.");
  process.exit(1);
}

const result = spawnSync(
  "semgrep",
  ["scan", "--config", join(ROOT, "scan-rules"), "--metrics=off", "--quiet", join(ROOT, "src")],
  { stdio: "inherit", shell: process.platform === "win32" }
);

process.exit(result.status ?? 1);

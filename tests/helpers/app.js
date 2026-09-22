import { mkdtempSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import request from "supertest";

import { resetDatabase } from "../../src/db/reset.js";
import { createApp } from "../../src/app.js";

/** An app on its own throwaway database, seeded with the lab data. */
export function freshApp() {
  const dir = mkdtempSync(join(tmpdir(), "atrium-test-"));
  const dbPath = join(dir, "atrium.db");
  resetDatabase(dbPath);
  return { app: createApp({ dbPath }), dbPath };
}

/** A supertest agent that has signed in and is holding the session cookie. */
export async function signIn(app, username, password) {
  const agent = request.agent(app);
  const res = await agent
    .post("/login")
    .type("form")
    .send({ username, password });

  if (res.status !== 302) {
    throw new Error(`sign in for ${username} returned ${res.status}, expected a redirect`);
  }
  return agent;
}

/**
 * Just the rows of the results table.
 * The signed-in colleague's own name appears in the header bar on every page,
 * so a bare search of the whole document cannot tell you what a search returned.
 */
export function resultsTable(html) {
  const m = html.match(/<tbody[^>]*>([\s\S]*?)<\/tbody>/i);
  return m ? m[1] : "";
}

export const ALICE = { username: "alice.nolan", password: "SpringRiver44" };
export const BOB = { username: "bob.keane", password: "CopperLane19" };
export const MORGAN = { username: "morgan.doyle", password: "QuietHarbour08" };

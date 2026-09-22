import test from "node:test";
import assert from "node:assert/strict";

import { freshApp, signIn, resultsTable, ALICE } from "../helpers/app.js";
import { resetDatabase } from "../../src/db/reset.js";

// Every lab starts from the same data. If reset drifts, the teaching material
// that refers to specific people and IDs stops matching what students see.

test("reset always produces the same three colleagues with the same IDs", async () => {
  const { app } = freshApp();
  const agent = await signIn(app, ALICE.username, ALICE.password);

  for (const [id, name] of [[17, "Alice Nolan"], [18, "Bob Keane"], [99, "Morgan Doyle"]]) {
    const res = await agent.get(`/api/profile/${id}`);
    assert.equal(res.status, 200, `profile ${id} should exist after a reset`);
    assert.equal(res.body.displayName, name);
  }
});

test("running reset twice leaves the same data, not a second copy", async () => {
  const { app, dbPath } = freshApp();

  resetDatabase(dbPath);
  resetDatabase(dbPath);

  const agent = await signIn(app, ALICE.username, ALICE.password);
  const res = await agent.get("/directory");

  const aliceCount = (resultsTable(res.text).match(/Alice Nolan/g) || []).length;
  assert.equal(aliceCount, 1, "Alice should appear once, not once per reset");
});

test("reset restores the shared documents", async () => {
  const { app } = freshApp();
  const agent = await signIn(app, ALICE.username, ALICE.password);

  const res = await agent.get("/resources");
  assert.equal(res.status, 200);
  assert.match(res.text, /Supplier register/);
  assert.match(res.text, /Expense claim form/);
});

import test from "node:test";
import assert from "node:assert/strict";
import request from "supertest";

import { freshApp, signIn, resultsTable, ALICE } from "../helpers/app.js";

test("the directory lists every colleague", async () => {
  const { app } = freshApp();
  const agent = await signIn(app, ALICE.username, ALICE.password);

  const res = await agent.get("/directory");
  assert.equal(res.status, 200);

  const rows = resultsTable(res.text);
  assert.match(rows, /Alice Nolan/);
  assert.match(rows, /Bob Keane/);
  assert.match(rows, /Morgan Doyle/);
});

test("searching the directory narrows it to who you asked for", async () => {
  const { app } = freshApp();
  const agent = await signIn(app, ALICE.username, ALICE.password);

  const res = await agent.get("/directory").query({ q: "Keane" });
  assert.equal(res.status, 200);

  const rows = resultsTable(res.text);
  assert.match(rows, /Bob Keane/);
  assert.doesNotMatch(rows, /Alice Nolan/, "Alice does not match this search");
});

test("a search that matches nobody says so, rather than failing", async () => {
  const { app } = freshApp();
  const agent = await signIn(app, ALICE.username, ALICE.password);

  const res = await agent.get("/directory").query({ q: "Zawadzki" });
  assert.equal(res.status, 200);
  assert.match(res.text, /no (one|results|colleagues)|nobody|nothing/i);
});

test("the directory is not readable until you sign in", async () => {
  const { app } = freshApp();

  const res = await request(app).get("/directory");
  assert.equal(res.status, 302);
  assert.equal(res.headers.location, "/login");
});

test("the directory never shows stored passwords", async () => {
  const { app } = freshApp();
  const agent = await signIn(app, ALICE.username, ALICE.password);

  const res = await agent.get("/directory");
  assert.doesNotMatch(res.text, /scrypt:/, "a password hash has leaked into the page");
});

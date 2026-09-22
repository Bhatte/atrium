import test from "node:test";
import assert from "node:assert/strict";
import request from "supertest";

import { freshApp, signIn, ALICE } from "../helpers/app.js";

// The profile page fetches the signed-in colleague's details from this endpoint.
// It is ordinary application plumbing and is part of Atrium from the start.

test("the profile page shows your own details", async () => {
  const { app } = freshApp();
  const agent = await signIn(app, ALICE.username, ALICE.password);

  const res = await agent.get("/profile");
  assert.equal(res.status, 200);
  assert.match(res.text, /Alice Nolan/);
});

test("the profile endpoint returns your details as JSON", async () => {
  const { app } = freshApp();
  const agent = await signIn(app, ALICE.username, ALICE.password);

  const res = await agent.get("/api/profile/17");
  assert.equal(res.status, 200);
  assert.match(res.headers["content-type"], /application\/json/);

  const body = res.body;
  assert.equal(body.id, 17);
  assert.equal(body.displayName, "Alice Nolan");
  assert.equal(body.department, "Operations");
  assert.equal(body.role, "member");
  assert.equal(typeof body.email, "string");
  assert.equal(typeof body.bio, "string");
});

test("the profile endpoint never returns a stored password", async () => {
  const { app } = freshApp();
  const agent = await signIn(app, ALICE.username, ALICE.password);

  const res = await agent.get("/api/profile/17");
  const keys = Object.keys(res.body);

  assert.ok(!keys.includes("password_hash"), "password_hash must not be returned");
  assert.ok(!keys.includes("passwordHash"), "passwordHash must not be returned");
  assert.doesNotMatch(JSON.stringify(res.body), /scrypt:/);
});

test("the profile endpoint refuses anyone who is not signed in", async () => {
  const { app } = freshApp();

  const res = await request(app).get("/api/profile/17");
  assert.equal(res.status, 401);
  assert.match(res.headers["content-type"], /application\/json/);
});

test("the profile endpoint reports a missing colleague as missing", async () => {
  const { app } = freshApp();
  const agent = await signIn(app, ALICE.username, ALICE.password);

  const res = await agent.get("/api/profile/4242");
  assert.equal(res.status, 404);
  assert.match(res.headers["content-type"], /application\/json/);
});

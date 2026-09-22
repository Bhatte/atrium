import test from "node:test";
import assert from "node:assert/strict";
import request from "supertest";

import { freshApp, signIn, ALICE } from "../helpers/app.js";

test("signing in with the right password lands on the dashboard", async () => {
  const { app } = freshApp();
  const agent = await signIn(app, ALICE.username, ALICE.password);

  const res = await agent.get("/dashboard");
  assert.equal(res.status, 200);
  assert.match(res.text, /Alice Nolan/);
});

test("signing in with the wrong password does not sign you in", async () => {
  const { app } = freshApp();

  const res = await request(app)
    .post("/login")
    .type("form")
    .send({ username: ALICE.username, password: "not-the-password" });

  assert.equal(res.status, 200, "should stay on the sign-in page, not redirect");
  assert.match(res.text, /sign in|password|incorrect/i);
});

test("signing in as someone who does not exist does not sign you in", async () => {
  const { app } = freshApp();

  const res = await request(app)
    .post("/login")
    .type("form")
    .send({ username: "nobody.here", password: "anything" });

  assert.equal(res.status, 200);
});

test("the dashboard is not readable until you sign in", async () => {
  const { app } = freshApp();

  const res = await request(app).get("/dashboard");
  assert.equal(res.status, 302);
  assert.equal(res.headers.location, "/login");
});

test("signing out ends the session", async () => {
  const { app } = freshApp();
  const agent = await signIn(app, ALICE.username, ALICE.password);

  const out = await agent.post("/logout");
  assert.equal(out.status, 302);

  const after = await agent.get("/dashboard");
  assert.equal(after.status, 302, "the dashboard should be closed again after signing out");
  assert.equal(after.headers.location, "/login");
});

test("the sign-in page is reachable without a session", async () => {
  const { app } = freshApp();

  const res = await request(app).get("/login");
  assert.equal(res.status, 200);
  assert.match(res.text, /Atrium/);
});

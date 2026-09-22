import test from "node:test";
import assert from "node:assert/strict";
import request from "supertest";

import { freshApp, signIn, ALICE, MORGAN } from "../helpers/app.js";

function assertEditorialShell(html) {
  assert.match(html, /data-ui="editorial-operations"/);
  assert.match(html, /class="skip-link" href="#main-content"/);
  assert.match(html, /id="main-content"/);
  assert.doesNotMatch(html, /<(?:link|script|img)[^>]+(?:href|src)="https?:\/\//i);
}

test("the sign-in page uses the self-contained editorial Atrium shell", async () => {
  const { app } = freshApp();
  const res = await request(app).get("/login");

  assert.equal(res.status, 200);
  assertEditorialShell(res.text);
  assert.match(res.text, /A clear place for everyday work/i);
});

test("signed-in pages share the accessible editorial application shell", async () => {
  const { app } = freshApp();
  const agent = await signIn(app, ALICE.username, ALICE.password);

  for (const path of ["/dashboard", "/directory", "/resources", "/resources/1", "/profile"]) {
    const res = await agent.get(path);
    assert.equal(res.status, 200, `${path} should render`);
    assertEditorialShell(res.text);
    assert.match(res.text, /aria-label="Primary navigation"/);
    assert.match(res.text, /class="active" aria-current="page"/);
  }
});

test("the admin page uses the same editorial shell", async () => {
  const { app } = freshApp();
  const agent = await signIn(app, MORGAN.username, MORGAN.password);
  const res = await agent.get("/admin/users");

  assert.equal(res.status, 200);
  assertEditorialShell(res.text);
});

// The session check. Run it with:  npm run check:session
//
// It asks four questions about how Atrium keeps a signed-in session, and one
// about what a failed request shows. It does not need the server running, it
// never touches your data, and it never prints a key or a cookie value.

import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";

import { printReport, supplySessionKey } from "./report.mjs";

const ATRIUM = fileURLToPath(new URL("..", import.meta.url));

// 1. Does Atrium refuse to start without a key? This starts a separate Node
//    process with no key set, loads the session settings, and sees what happens.
function startsWithoutKey() {
  const env = { ...process.env };
  delete env.ATRIUM_SESSION_SECRET;
  try {
    execFileSync(process.execPath, ["--input-type=module", "-e", 'await import("./src/config/session.js")'],
      { cwd: ATRIUM, env, stdio: "ignore" });
    return "starts anyway";
  } catch {
    return "refuses to start";
  }
}
const withoutKey = startsWithoutKey();

// Everything below runs with a key, as Atrium would in use.
supplySessionKey();
const { sessionOptions } = await import("../src/config/session.js");
const { freshApp, signIn, ALICE } = await import("../tests/helpers/app.js");
const request = (await import("supertest")).default;

const results = [];

function record(check, expected, got, meaning) {
  results.push({ check, expected, got, meaning });
}

// 2. Is the key the one supplied from outside, not one written in the code?
record("Where the session key comes from", "the environment",
  sessionOptions.secret === process.env.ATRIUM_SESSION_SECRET ? "the environment" : "written in the code",
  "The key is written into src/config/session.js.");

record("Atrium started with no key", "refuses to start", withoutKey,
  "Without a key, Atrium should stop and say so, not carry on.");

// 3. What the browser is told about the session cookie, on a fresh sign-in.
const { app } = freshApp();
const signedIn = await request(app).post("/login").type("form")
  .send({ username: ALICE.username, password: ALICE.password });
const cookie = (signedIn.headers["set-cookie"] || [""])[0];
const sameSite = (cookie.match(/SameSite=(\w+)/i) || [])[1];

record("Cookie: HttpOnly", "on", /HttpOnly/i.test(cookie) ? "on" : "off",
  "Scripts running on the page can read the session cookie.");
record("Cookie: SameSite", "Lax or Strict",
  sameSite && /^(lax|strict)$/i.test(sameSite) ? "Lax or Strict" : (sameSite || "not set"),
  "The browser may send the cookie with requests started by other sites.");

// 4. Sign-in still works.
const alice = await signIn(app, ALICE.username, ALICE.password);
const dashboard = await alice.get("/dashboard");
record("Alice signs in and opens /dashboard", "works", dashboard.status === 200 ? "works" : `status ${dashboard.status}`,
  "Ordinary sign-in no longer works.");

// 5. What a failed request shows the visitor.
const quiet = console.error;
console.error = () => {};   // a repaired error handler logs the detail; keep it off this report
const failed = await request(app).get("/api/profile/%E0%A4%A");
console.error = quiet;
record("A failed request shows", "a short message",
  /Error:|\n\s+at /.test(failed.text) ? "the error and its stack" : "a short message",
  "The error page sends internal detail to the visitor. This one is optional.");

printReport("Atrium session check", results, [38, 18, 26]);
console.log("Secure is left off: Atrium runs on local HTTP, where a Secure cookie stops sign-in.\n");

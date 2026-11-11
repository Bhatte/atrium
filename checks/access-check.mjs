// The access check. Run it with:  npm run check:access
//
// It asks, for the profile and account routes: does the server let each
// person do what the rule allows, and refuse what it does not? It does not
// need the server running, and it never touches your data: it builds a fresh
// copy of the starting data and signs in as Alice, Bob and Morgan.
//
// Alice is profile 17, Bob is profile 18. Alice and Bob are members; Morgan is
// the administrator.

import { printReport, supplySessionKey } from "./report.mjs";

supplySessionKey();
const { freshApp, signIn, ALICE, BOB, MORGAN } = await import("../tests/helpers/app.js");
const request = (await import("supertest")).default;

const { app } = freshApp();
const alice = await signIn(app, ALICE.username, ALICE.password);
const bob = await signIn(app, BOB.username, BOB.password);
const morgan = await signIn(app, MORGAN.username, MORGAN.password);
const nobody = request(app);

// What a person gets back from an address: allowed, or refused, and how.
async function answer(person, address) {
  const res = await person.get(address);
  if (res.status === 200) return "allowed";
  if (res.status === 401) return "refused (401)";
  if (res.status === 403 || res.status === 404) return "refused";
  return `status ${res.status}`;
}

// Bob's biography, read as Bob.
async function bobsBio() {
  return (await bob.get("/api/profile/18")).body.bio;
}

const results = [];

function record(check, expected, got, meaning) {
  results.push({ check, expected, got, meaning });
}

// 1. People can still read their own profile.
record("Alice reads her own profile", "allowed", await answer(alice, "/api/profile/17"),
  "A colleague can no longer read their own profile.");
record("Bob reads his own profile", "allowed", await answer(bob, "/api/profile/18"),
  "A colleague can no longer read their own profile.");

// 2. Nobody reads somebody else's profile. The Week 10 repair.
record("Alice reads Bob's profile", "refused", await answer(alice, "/api/profile/18"),
  "The profile API returns another colleague's record.");
record("Not signed in, reads a profile", "refused (401)", await answer(nobody, "/api/profile/17"),
  "The profile API answers somebody who has not signed in.");

// 3. Nobody saves over somebody else's profile. Alice sends her own form with
//    Bob's number in the hidden userId field, as in the Week 10 activity.
const before = await bobsBio();
await alice.post("/profile").type("form").send({
  userId: "18", email: "bob.keane@atrium.local", department: "Finance", bio: "Changed by Alice."
});
const after = await bobsBio();
record("Alice saves a form aimed at Bob", "Bob unchanged",
  after === before ? "Bob unchanged" : "Bob's profile changed",
  "The profile form saves to whichever number the browser sends.");

// 4. Only the administrator lists every account.
record("Alice lists every account", "refused", await answer(alice, "/api/admin/users"),
  "The account list API answers a member.");
record("Morgan lists every account", "allowed", await answer(morgan, "/api/admin/users"),
  "The administrator can no longer list the accounts.");

printReport("Atrium access check", results, [34, 16, 24]);

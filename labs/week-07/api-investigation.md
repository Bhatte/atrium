# Week 7 API investigation

Your name:
Date:
Atrium address and port:
Atrium version or date of local copy:

Fill this in as you work. Give statuses and short response excerpts. Record
whether a request carried a session cookie, but never paste its full value
or a password.

## 1. Original profile request

- Signed-in account:
- Page that made the request:
- Method and full API path:
- Was a session cookie present? (yes/no, value hidden):
- First response status and content type:
- Returned ID, username and field names:
- In plain English, what did the request ask for?

## 2. Replayed and changed profile requests

| Request | Account whose session I used | First status | Returned ID and name, or error | Evidence reference |
|---|---|---|---|---|
| Repeat of the original path | | | | |
| Path with one ID changed | | | | |

- What I changed:
- What stayed the same:
- Whose record the changed ID names, and how I checked:
- What the comparison shows:

## 3. Without sign-in

- How I made sure the window had no Atrium session:
- `GET /api/profile/17`: first status and response body:
- `GET /profile`: first status, redirect if any, and final page:
- What this establishes about authentication:
- What it does not establish about authorisation:

## 4. Administration page and API

| Account | Request path | First status | Relevant response text or JSON fields | Evidence reference |
|---|---|---|---|---|
| Alice | `/admin/users` | | | |
| Alice | `/api/admin/users` | | | |
| Morgan | `/admin/users` | | | |
| Morgan | `/api/admin/users` | | | |

- Which request did Morgan's page make after loading?
- What role decision should the server make for each route?
- Where did the observed decisions agree or differ?

## 5. Security conclusions

**Profile request.** State the account, exact request, response and rule the
server should apply. Keep any effect you did not observe conditional.

**Administration request.** State the account, exact request, response and
role rule the server should apply.

**Directory comparison.** Which returned fields are already visible at
`/directory` to a signed-in colleague? Which fields does an API add? How does
that limit your impact claim?

**Evidence still missing or uncertain.** Name a check that would settle it,
if there is one.

**Assistant or self-review.** State one claim you checked, how you checked it,
and whether the evidence supports it.

---

## Optional, if you had time

- `GET /api/profile/4242` as Alice: status and body:
- Which guard does each API route call in `src/routes/api.js`?
- Which guard does the administration page call in `src/routes/admin.js`?
- How does that source comparison explain, but not replace, your recorded
  responses?

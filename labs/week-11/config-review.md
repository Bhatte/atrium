# Week 11 configuration review

Your name:
Date:

Fill this in as you work. Keep the new session value, passwords and the whole
cookie header out of this file. Record the cookie name and attributes only. If a
check could not be run, say what prevented it.

## 1. Baseline session response

- Signed-in account:
- Request method and path:
- Response status and next page:
- Cookie name, with value hidden:
- HttpOnly present?
- SameSite present? If so, what value?
- Secure present?
- Source file and line for the session value:
- Source file and lines for cookie settings:
- Source file and line where the settings reach Express:
- Do source and response agree? Explain any difference:

## 2. Failed request and risks

- Account and exact directory search text:
- Request path and status:
- Short description of response body, with no full stack:
- Error-handler file and line:

For each item, state a possible consequence. Say what you actually observed.

| Item | Possible consequence | What I observed locally |
|---|---|---|
| Session value | | |
| Cookie settings | | |
| Error response | | |

- Assistant used, if any:
- One claim I checked against source or response:
- Was the claim right?

## 3. Session value repair

- File and lines changed:
- Environment variable name, without its value:
- How the application behaves if it is absent or too short:
- Evidence for that behaviour, with no secret shown:
- Result of npm test when a local value is supplied:
- Result of a fresh Alice sign-in and GET /dashboard:
- What a source reader can see after the edit:
- What a real exposure would still require beyond this edit:

## 4. Cookie setting repair

- File and lines changed:
- Which attributes I changed and why:
- Which risk remains after the change:

| Fresh POST /login response | Status | HttpOnly | SameSite | Secure | Did /dashboard load? |
|---|---|---|---|---|---|
| Before edit | | | | | |
| After edit | | | | | |

- Why my local HTTP setting differs from a public HTTPS deployment:

## 5. Cryptographic choices

| Situation | Hashing, encryption or signing? | Purpose | Value to protect |
|---|---|---|---|
| Store data to check a login password later | | | |
| Send a confidential report across a network | | | |
| Check a token's issuer and whether it changed | | | |
| Let users check a software package's origin | | | |

- What part of a session protection design can be public?
- What value must remain secret?
- Why would hiding the algorithm not repair an exposed key?

## 6. Verification and limits

| Claim I want to make | Source or runtime evidence | What this evidence does not show |
|---|---|---|
| The signing value is outside source | | |
| Startup needs a supplied value | | |
| Ordinary sign-in still works | | |
| The browser received the changed cookie attributes | | |

- Result of npm test:
- What I would still need to check in a public deployment:

## Optional: error response

- Change made, if any:
- Result of malformed GET /directory?q=... after the change:
- Result of ordinary GET /directory after the change:
- Where diagnostic detail is kept and who may read it:

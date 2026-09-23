# Week 10 access control review

Your name:
Date:

Keep the account, method, path, status and identifying response details together.
Do not copy passwords or a whole profile response into this record. If a result
surprises you, record what you actually saw before trying to explain it.

## 1. The rule for one profile

- Principal:
- Action:
- Resource:
- Context that matters:
- My rule, in one testable sentence:

## 2. Profile requests before the change

| Signed-in account | Method and path | Status | Identifying response details |
|---|---|---|---|
| Alice, own record | | | |
| Alice, other record | | | |
| Bob, own record | | | |

What do these three results show about my rule?

## 3. Route and decision point

- Route declaration, file and line:
- Where the server gets the signed-in identity:
- Where the requested record ID comes from:
- Where the record is looked up:
- Where the rule is enforced, or where the check is missing:
- One sentence joining my code reading to my request evidence:

## 4. The administrator operation

My rule for listing staff accounts:

| Signed-in account | Method and path | Status | Was account data returned? |
|---|---|---|---|
| Alice | GET /admin/users | | |
| Alice | GET /api/admin/users | | |
| Morgan | GET /admin/users | | |
| Morgan | GET /api/admin/users | | |

- Route lines that explain the difference:
- Why the navigation link does or does not settle this:

## 5. Profile repair

- File and lines changed:
- How the server now makes the decision:
- Why this check is on the route I tested:

| Signed-in account | Method and path | Status after change | Relevant response |
|---|---|---|---|
| Alice, own record | | | |
| Alice, other record | | | |
| Bob, own record | | | |
| No account | GET /api/profile/17 | | |

- Does Alice's /profile page still show her details?
- Result of npm test:
- Does the existing test suite cover the denied case? How do you know?
- What can I now claim, and how far does that claim reach?

## Optional: the profile form

- Which value chooses the row that POST /profile changes?
- A test using Alice and Bob, with a reversible biography change:
- What I observed, if I ran it:
- Whether I reset the local data afterwards:

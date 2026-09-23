# Week 5 cross-tool triage

Your name:
Date:
Atrium address and port:
Atrium version or date of local copy:

Fill this in as you work. If a check could not be completed, record what stopped you and what evidence you used instead. Do not paste a full session cookie value.

## 1. Scan coverage and sources

- Static evidence: my `npm run scan` output or `labs/week-03/saved-scan-output.txt`:
- Runtime evidence: my ZAP run, Week 4 record, or direct browser checks:
- Signed-in account used for protected routes:
- Evidence that a protected route returned its page rather than `/login`:
- Active scan target and how login and logout stayed outside it, if I used ZAP:
- An entry my scan did not reproduce, and how I checked it instead:

## 2. The queue

For each entry, use **supported**, **ruled out**, or **needs review**. Keep overlap separate from status. Name a file and line, or a request and response, in the evidence column. If evidence is missing, say what check would settle it.

| ID | Status | Evidence or missing check | Overlap with another ID? | Investigate now, later, or close? |
|---|---|---|---|---|
| S1 | | | | |
| S2 | | | | |
| S3 | | | | |
| Z1 | | | | |
| Z2 | | | | |
| Z3 | | | | |
| Z4 | | | | |
| Z5 | | | | |

## 3. First three matters to investigate

Rank *matters*, combining entries only when they concern one underlying path. For each, record the relevant account, route or file, possible consequence, uncertainty and next check.

1. **First:**
   - Queue ID or IDs:
   - Account and place:
   - Why first:
   - Next check:
2. **Second:**
   - Queue ID or IDs:
   - Account and place:
   - Why second:
   - Next check:
3. **Third:**
   - Queue ID or IDs:
   - Account and place:
   - Why third:
   - Next check:

## 4. One exclusion or combination

- Entry ID:
- Close, exclude from active work, or combine with another entry?
- Evidence for this decision:
- What change would make me reopen it:

## 5. One static and runtime comparison

- Semgrep entry and ZAP entry:
- What the code observation shows:
- What the request and response show:
- Do they concern the same underlying matter? Why?
- One claim they do not yet prove:

## 6. One finding for a colleague

Write a short paragraph. Include what and where, the account and condition, possible impact, evidence references and a repair direction. Keep untested impact conditional.

**Finding:**

**Evidence references:**

---

## Optional, if you had time

What does `src/config/session.js` show about the session that the Z5 response cannot? What does the response confirm that source inspection alone cannot?

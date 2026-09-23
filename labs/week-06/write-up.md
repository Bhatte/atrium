# Week 6 evidence record

Your name:
Date:
Atrium version or date of local copy:

Keep this file in `my-work/week-06-write-up.md`. Record what you observed,
including an unexpected result. Do not paste a password or full session cookie.

## 1. Evidence audit

| Item | Scanner claim, observed evidence, background or missing evidence? | Where I can find it |
|---|---|---|
| Static alert and rule | | |
| Static code excerpt | | |
| Dynamic alert and risk label | | |
| Dynamic request and response | | |
| Signed-in coverage check | | |
| Ordinary comparison | | |

What is the most important missing artefact for each alert?

- Static:
- Dynamic:

## 2. Static finding

**Title:**

**Affected route, file and lines:**

**Account and conditions tested:**

**Tool output used:**

**Code trace:** Where does `q` enter, where is it used, and what control is on
that path? Give file and line references.

**Ordinary request and result:** Give the URL or exact search value, status and
short response excerpt.

**Test request and result:** Give the exact value, status and short response
excerpt. Say how it differs from the ordinary result.

**My conclusion:** What did I establish, and what remains untested?

**Impact within this scope:**

**Repair and how I would check it:**

**One other static match:** Why does the same rule not settle its status?

## 3. Dynamic finding

**Title:**

**Affected URL and output location:**

**Account and conditions tested:**

**ZAP alert, risk and confidence:** State whether the report is yours or the
class report.

**Ordinary request and result:** Give the URL, status, response excerpt and
what the browser displayed.

**Alert request repeated and result:** Give the URL or exact decoded input,
status, response excerpt and what the browser did. If it did not repeat, say so.

**Code that explains the result:** Give file and line references.

**My conclusion:** What did I establish, and what remains untested?

**Impact within this scope:**

**Repair and how I would check it:**

## 4. Cross-check and review

What did runtime evidence add to the static finding?

What did code evidence add to the dynamic finding?

Who or what reviewed my drafts?

One specific criticism:

What I changed, or why I did not change it:

## 5. My report draft

Finding reviewed:

| Check | Present and where, or missing and next action |
|---|---|
| Plain title and exact location | |
| Account, route and conditions | |
| Normal and tested result | |
| Code or HTTP artefact supporting each claim | |
| Impact limited to the evidence | |
| Repair that addresses the cause | |

The next action I will take:

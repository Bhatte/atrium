# Week 9 verification record

Your name:
Date:
Atrium copy used for the before result:
Atrium copy used for the after result:

Fill this in while you work. Keep passwords and session cookies out of the record. If a check cannot be run, name the missing evidence instead of writing that it passed.

## 1. The claim I am checking

What must always be true about the directory search text and the database instruction?

## 2. Original evidence and change

- Account and starting data:
- Page or request:
- Exact original search text:
- Expected result for an ordinary search:
- Original status and result-table rows:
- Source file and lines changed in Week 8:
- How the change is meant to enforce the claim:

## 3. Original check repeated

- Same search text and account used?
- Address or request:
- Expected result after repair:
- Actual status and result-table rows:
- What changed from the original observation:

## 4. Targeted verification

Automated test file or repeatable manual procedure:

| Search text or empty search | Expected result-table rows or empty state | Actual result | Pass or fail |
|---|---|---|---|
| Original comparison input | | | |
| Name search | | | |
| Department search | | | |
| No-match search | | | |

Could this check fail on the original handler? How do you know?

## 5. Rescan

- Tool and command or scan settings:
- Was the directory reached as a signed-in user, if using ZAP?
- Rule or alert, file or page, and result:
- Before and after difference:
- What this tool result can and cannot establish:

## 6. Ordinary behaviour and related path

- Empty search result:
- Name search result:
- Department search result:
- No-match result:
- `npm test` result, including failing test names if any:
- Related input or route chosen and why:
- Expected and actual result for that variation:
- Code path it reached:

## 7. Final judgement

Choose one: **Repaired for the checked property / Not repaired / Not yet settled**.

Explain your answer using the original comparison, targeted check, rescan and ordinary search results. State how far the answer reaches.

## 8. Residual risk and limits

- One issue outside this repair:
- One check not run or uncertainty remaining:
- What another engineer should check next:

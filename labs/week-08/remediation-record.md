# Week 8 remediation record

Your name:
Date:
Atrium version or copy used:

Fill this in as you work. Keep exact inputs and observed results. If you have not checked something, say so.

## 1. Original finding and before evidence

- Page and route:
- Account used:
- Earlier finding or source I started from:
- Ordinary search text, URL, status and results-table rows:
- No-match search text, URL, status and results-table rows:
- Comparison search text, URL, status and results-table rows:
- What the comparison shows, and what it does not show:

## 2. Root cause

- Source of the search text, with file and line:
- Path through the handler:
- Database operation, with file and line:
- Control missing on that path:
- Difference between the visible result and the root cause:

## 3. Security property and useful behaviour

- One sentence stating the property the repair must enforce:
- Ordinary behaviour that must remain, including name and department search:

## 4. Candidate fixes

| Candidate | Where the control acts | Effect on the property and ordinary search | Decision |
|---|---|---|---|
|  |  |  |  |
|  |  |  |  |

- Assistant used, if any:
- One suggestion I changed or rejected, and why:
- Reason for my choice:

## 5. Change made

- File and function changed:
- Changed lines or a short before and after code extract:
- How the change keeps search text separate from the database instruction:
- What I left outside this repair:

## 6. First checks after the change

- Same ordinary search: input, status and results-table rows:
- Same no-match search: input, status and results-table rows:
- Same comparison search: input, status and results-table rows:
- Empty search result:
- `npm test` result and any failing test:
- `npm run scan` result, if available:

## 7. Handoff to Week 9

- What this evidence supports:
- Cases or related paths still to check:
- A focused automated test I would add:
- Any known regression or remaining risk:

## 8. Document description output

- Resource changed for the temporary check:
- List and detail page before the repair:
- Rule for printing a description as page content:
- Two view files and lines changed:
- List and detail page after the repair:
- Ordinary description checked after restoring the seed data:
- What this check does not establish:

# Week 12 remediation record

Your name:
Date:
Atrium copy and earlier edits that affect this route:

Fill this in as you work. Keep passwords, session cookie values and full personal
records out of the file. Record what you actually observed. If a check could not
be run, say which result is missing.

## 1. Chosen route and rule

- Choice A, B or C:
- Signed-in accounts used:
- Request method and path, or page and form:
- My security property, in one testable sentence:
- What should still be allowed:

## 2. Before evidence

| Case | Account | Method and path or form action | Input or changed field | Status | Meaningful result |
|---|---|---|---|---|---|
| Ordinary or allowed | | | | | |
| Case under investigation | | | | | |

- Where I saw the result, such as page, Network response or API JSON:
- If B, what Bob's biography showed before and after the controlled post:
- If B, how I restored the seeded data before editing source:
- Does this result match the rule? Explain:

## 3. Cause and repair plan

- Route file and line:
- Where the relevant value or signed-in identity comes from:
- Check that already exists:
- Decision or output step that needs to change, with file and line:
- Why this step causes the observed result:
- Small change I plan to make:
- Assistant used, if any, and one claim I checked myself:

## 4. Source change

- File and line changed:
- What I changed, in my own words:
- Why this enforces my security property:
- Did I restart Atrium after editing?

## 5. After evidence

Repeat the same inputs and accounts from section 2.

| Case | Account | Method and path or form action | Input or changed field | Status | Meaningful result |
|---|---|---|---|---|---|
| Ordinary or allowed | | | | | |
| Original case repeated | | | | | |

- Additional ordinary feature check for my choice:
- Result of `npm test`, including failing test names if any:
- If I ran ZAP: Context User, scan scope, one signed-in directory response and relevant alert result:
- If I did not run a rescan: why direct checks are the relevant evidence here:
- If B, how I restored the seeded data after checking:

## 6. Judgement and limits

Choose one: **Repaired for the stated property / Not repaired / Not yet settled**.

- What the before and after results establish:
- How far this claim reaches, including route and accounts:
- One related issue outside my change:
- One check I could not make or uncertainty that remains:
- What another engineer should check next:

## Optional focused test

- Test file and assertion:
- Would it fail on the original route? Why?
- Result after the repair:

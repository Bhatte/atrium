# Week 4 runtime evidence

Your name:
Date:
Atrium address and port:
ZAP run or class scan evidence:

Fill this in while you work. If a step failed, say what you tried and what
evidence you used instead. Do not paste a full session cookie value.

## 1. Coverage before sign-in

- Account state:
- Routes reached by the spider:
- My direct `GET /directory` request: status, redirect and final page:
- What this run could not test:

## 2. Coverage after sign-in

- Seeded account used:
- Evidence that ZAP received the dashboard as this account:
- Evidence that ZAP received `/directory?q=Alice` as this account:
- Routes reached as this user:
- Routes or states newly reached compared with section 1:
- Active scan target and how I kept login and logout out of it:

## 3. Scanner alert

- Alert name:
- Risk and confidence as ZAP reported them:
- Method and affected URL:
- The input ZAP sent:
- Response status and relevant evidence:
- Where I saw the request and response:

## 4. Manual comparison

**Ordinary search**

- Account, method and full URL:
- Status and any redirect:
- Relevant response text or visible result:

**Alert request repeated by me**

- Account, method and full URL:
- Status and any redirect:
- Relevant response text or visible result:
- Did the alert's observation repeat? If not, what happened?

## 5. Conclusion

**What this evidence proves.** Limit the answer to this route, account and
response.

**What this evidence does not prove.** Name an impact or wider claim that would
need another test.

## 6. Short finding

Write a short paragraph that gives the observation, location, possible impact,
evidence and a high-level repair. Keep untested impact conditional.

---

## Optional, if you had time

Which signed-in page did you open that was absent from your spider's route
list? What does that tell you about this scan's coverage?

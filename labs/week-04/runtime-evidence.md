# Week 4 runtime evidence

Your name: Vandana ramanjinappa
Date: 12th october 2026
Atrium address and port:http://localhost:9090
ZAP run:I used OWASP ZAP to run the Spider and Active Scan. I also tested the application manually using the ZAP browser.

Fill this in as you work. If a step failed, say what you tried. Do not paste
a full session cookie value.

## 1. Coverage before sign-in

- Account state:I was signed out and tested the directory page without logging in.
- Routes reached by the spider:The Spider found /, /login, /dashboard, /directory, /directory?q=Alice, /css, /css/app.css, /robots.txt, /sitemap.xml, /.well-known, /.well-known/appspecific, and /.well-known/appspecific/com.chrome.devtools.jso
- My direct `GET /directory` request: status, redirect and final page:When I opened /directory without signing in, I received 302 Found. It redirected me to /login, and the login page returned 200 OK.
- What this run could not test:I could not view the directory content while signed out. This test did not tell me whether every other page was protected.

## 2. Coverage after sign-in

- Seeded account used:alice.nolan
- Evidence that ZAP received the dashboard as this account:After I logged in, ZAP History showed POST /login returning 302 Found, followed by GET /dashboard returning 200 OK. I could see the dashboard in the browser.
- Evidence that ZAP received `/directory?q=Alice` as this account:ZAP History showed the request returning 200 OK, and the directory page displayed alice.nolan.
- Routes reached as this user:/login, /dashboard, /directory, /directory?q=Alice, and /css/app.css.
- Routes or states newly reached compared with section 1:After signing in, I could access the dashboard and view the directory results. However, these routes were already listed in my Spider results.
- Active scan target and how I kept login and logout out of it:I ran the Active Scan against http://localhost:9090. I did not check whether /login and /logout were excluded, so I cannot confirm that they were excluded.

## 3. Scanner alert

- Alert name:SQL Injection.
- Risk and confidence as ZAP reported them:High risk and Low confidence.
- Method and affected URL:GET — http://localhost:9090/directory?q=Alice%27.
- The input ZAP sent:Alice' in the q parameter.
- Response status and relevant evidence:The application returned 500 Internal Server Error. The response showed an SQLite syntax error near the single quote and included a stack trace referencing src/handlers/directory.js:13.
- Where I saw the request and response:I checked the alert in ZAP and viewed the related request and response in the History tab.

## 4. Manual comparison

**Ordinary search**

- Account, method and full URL:I was signed in as alice.nolan. I used GET http://localhost:9090/directory?q=Alice.
- Status and any redirect:The response was 200 OK, and I did not observe a redirect.
- Relevant response text or visible result:The directory page opened successfully and displayed alice.nolan.

**Alert request repeated by me**

- Account, method and full URL:I was signed in as alice.nolan. I used GET http://localhost:9090/directory?q=Alice%27.
- Status and any redirect:The response was 500 Internal Server Error, with no redirect observed in the recorded request.
- Relevant response text or visible result:The page showed an SQLite syntax error and a database-related stack trace.
- Did the alert's observation repeat? If not, what happened?Yes. I got a similar database error when I added a single quote to the search. This supports ZAP's finding, but it does not prove that someone can access or change the database records.

## 5. Conclusion

**What this evidence proves.** Limit the answer to this route, account and
response.
My tests showed that the normal directory search worked and returned 200 OK. When I added a single quote to the search parameter, the application returned 500 Internal Server Error and displayed an SQLite error. I also confirmed that accessing /directory without signing in redirected me to the login page.

**What this evidence does not prove.** Name an impact or wider claim that would
need another test.
These tests do not prove that an attacker can read, change or delete database records, or access another user's information. More testing would be needed to confirm the actual impact.

## 6. Short finding

Write a short paragraph that gives the observation, location, possible impact,
evidence and a high-level repair. Keep untested impact conditional.

During my OWASP ZAP testing, I found a possible SQL injection issue in the directory search parameter q. The normal search worked, but adding a single quote caused an internal server error and displayed an SQLite error message and stack trace. ZAP rated the finding High risk with Low confidence. This suggests that the application may not be handling search input safely. I recommend using parameterised SQL queries or prepared statements and showing users a general error message instead of detailed database errors.

---

## Optional, if you had time

Which signed-in page did you open that was absent from your spider's route
list? What does that tell you about this scan's coverage?

The Spider results I recorded already included /dashboard and /directory, so I could not identify a signed-in page that was missing from the list. This shows that I should not claim that a page was missed without checking the results. The pages and content found by a Spider can also depend on whether it has access to an authenticated session.

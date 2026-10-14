# Week 2 security requirements

Your name: Vandana Ramanjinappa
Date: 11 October 2026



---

## 1. What this application is

-Atrium is a small internal staff workspace. After signing in, you can use a staff directory, a colleague profile page and a shared documents page. It stores names, email addresses, departments and roles for each colleague. It recognises two kinds of user, staff and administrator.



## 2. What is worth protecting

Four assets. For each one, say what it is and what it would cost if it were seen,
changed or unavailable. Write the cost so that somebody outside the team could
understand it.

| Asset | What it costs if this goes wrong |
|---|---|
|Staff contact details (Directory page) |Someone who left the company can still see every staff member's email and send them fake emails.|
| Passwords (Login page) | If someone can see the passwords, they can log in as anyone, even the admin. |
|Staff contact details (Directory page) |Someone who left the company can still see every staff member's email and send them fake emails.|
| Passwords (Login page) | If someone can see the passwords, they can log in as anyone, even the admin. |
|Shared documents (Documents page)| The wrong person could read supplier details or change the budget form.|


## 3. The requirements

Four sentences, in your own words. Each one should say what is not allowed and to
whom.

1.Users must be able to change their password on the My profile page.
2.The password box on the Login page must hide what is typed.
3.The Login page must not have password hints or secret questions.(Draft from assistant)
4.Only an admin can open the Admin page or make someone an admin.(Draft from assistant)


**Which of these did you write yourself, and which started as a draft from your
assistant?** Say plainly. Both are fine.
requirement 1 and 2 are by myself and requirement 3 and 4 are from assistant.

## 4. One I rejected or rewrote

- The original sentence:Passwords must be stored so that nobody, not even an admin, can read them.
- My version:The password box on the Login page must hide what is typed.
- Which test it failed, and why: It failed "somebody could check it" we cannot see how passwords are saved when we use the website, so nobody can check it.



## 5. How somebody would check one of these

Pick one requirement. Write the steps for a person who has never seen Atrium and
cannot ask you anything.

- The requirement:
1. Install Node.js 24
2. Run the below commands, npm ci npm run reset npm run doctor npm start
3. Open http://localhost:9090 in the browser

- Sign in as: Username is alice.nolan Password is SpringRiver
- Steps: Start Atrium with npm start and try to open the staff profile page or directory page without logging in.
- What result would mean the requirement is met:The browser sends you to the Login page.
- What result would mean it is not met:If the page loads and shows the shared informations from the directory or the staff profiles.

---

## Optional, if you had time

Your four requirements in order, most important first, with one sentence each on
why it is in that position.
## Optional, if you had time

1. Only an admin can open the Admin page (/admin/users) or make someone an admin. If a normal user got admin power, they could change things for everyone.
2. Users must be able to change their own password on the My profile page (/profile). If a password is stolen, the user needs a way to change it.
3. The password box on the Login page (/login) must hide what is typed. If the letters show, someone standing nearby could see the password.
4. The Login page (/login) must not have password hints or secret questions. Hints can help a stranger guess the password, but this is the smallest risk of the four.
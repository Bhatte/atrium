# Week 2 security requirements

Your name: Khawaja Abdul Moiz
Date: 3 Octuber 2026

Fill this in as you work, rather than at the end. Where you are unsure, write
that you are unsure and say why. A sentence you can support is worth more than a
confident one you cannot.

---

## 1. What this application is

Atrium is a small internal staff workspace used by employees in the organisation. It includes a staff directory, employee profile pages, shared resources, and a limited admin area. Staff use it to find colleagues, view work-related information, and access shared files, while administrators manage user access and system settings.

**Where the assistant's explanation did not match the application.** 

nothing found

## 2. What is worth protecting

Four assets. For each one, say what it is and what it would cost if it were seen,
changed or unavailable. Write the cost so that somebody outside the team could
understand it.

| Asset | What it costs if this goes wrong |
|---|---|
| Staff directory information | 

This includes names, roles, and contact details for employees. If it is seen by the wrong people, it is a privacy breach; if it is changed, people could be misidentified or contact information could be wrong, which would disrupt work and damage trust.

| Employee profiles | 

Profiles contain work-related personal information and account details. If they are exposed, staff privacy is harmed; if they are altered, someone could impersonate another employee or cause confusion about responsibilities and access.

| Shared resources and documents | 

These are the files and materials staff use to do their jobs. If they are unavailable, people cannot complete core work; if they are changed without permission, the organisation may act on incorrect information.

| Admin controls and user roles | 

The admin area decides who can manage accounts and change permissions. If this is exposed or altered, an attacker could gain control over staff access, lock people out, or change who is allowed to do what.

## 3. The requirements

Four sentences, in your own words. Each one should say what is not allowed and to
whom.

1. No staff member may view, edit, or delete another employee’s profile or directory record unless they are an administrator with a valid reason to do so.
2. No user may access the admin pages or admin tools without an administrator account, and no staff account may be used to change another user’s role or permissions.
3. No one may read, alter, or remove shared resources in a way that exposes another person’s work or changes the official record without permission.
4. No user may sign in using another person’s account, reuse someone else’s session, or impersonate another employee.

**Which of these did you write yourself, and which started as a draft from your
assistant?

I wrote all four requirements myself after reading the application and thinking about the risks in the directory, profile pages, and admin controls.

## 4. One I rejected or rewrote

- The original sentence: "Users should not access other people’s data."
- My version: "No staff member may view, edit, or delete another employee’s profile or directory record unless they are an administrator with a valid reason to do so."
- Which test it failed, and why: It failed the specific test because “other people’s data” is too vague. A person could not tell which data, which users, or whether administrators are allowed to see it, so it was not clear enough to test against the real Atrium application.

## 5. How somebody would check one of these

Pick one requirement. Write the steps for a person who has never seen Atrium and
cannot ask you anything.

- The requirement: No staff member may view, edit, or delete another employee’s profile or directory record unless they are an administrator.
- Sign in as: bob.keane
- Steps:
  1. Open the Atrium app in a browser at http://localhost:9090.
  2. Sign in with the username bob.keane and the password CopperLane19.
  3. Open the staff directory and select a different user, such as alice.nolan.
  4. Try to open that person’s profile and look for any personal details or edit actions.
  5. Attempt to change any field or submit a profile update.
- What result would mean the requirement is met: Bob is blocked from viewing or editing Alice’s profile, and the system either shows an access error or redirects him away from the page.
- What result would mean it is not met: Bob can view Alice’s profile details, edit the record, or reach an action that changes her information.

---

## Optional, if you had time

Your four requirements in order, most important first, with one sentence each on
why it is in that position.

1. No user may access the admin pages or admin tools without an administrator account, and no staff account may be used to change another user’s role or permissions. This is most important because access control is the foundation of the whole system and a breach here could expose or alter everything else.
2. No staff member may view, edit, or delete another employee’s profile or directory record unless they are an administrator with a valid reason to do so. This is critical because staff information is private and misuse of it would be a direct trust and privacy problem.
3. No user may sign in using another person’s account, reuse someone else’s session, or impersonate another employee while using Atrium. This matters because identity misuse makes other security controls harder to trust and lets someone hide their real activity.
4. No one may read, alter, or remove shared resources in a way that exposes another person’s work or changes the official record without permission. This is important because shared documents support daily work, but it is a narrower risk than access control or identity protection.

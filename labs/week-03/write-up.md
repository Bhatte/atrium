# Week 3 record

Your name: Vandana Ramanjinappa
Date: 11 October 2026

Fill this in as you work, rather than at the end. Where you are unsure, write
that you are unsure and say why. That is worth more than a confident sentence you
cannot support.

---

## 1. The finding I chose

State which of the three the tool reported.

- File: src/handlers/directory.js
- Line: Lines 8–11
- What the tool said about it: Semgrep reported that SQL is built by joining text. The directory search adds user input to the SQL query, which may allow SQL injection.

## 2. What an assistant told me

Say which assistant you asked, and what it said in a sentence or two.

- Assistant used: ChatGPT
- Its explanation, in your own words: ChatGPT explained that the search value is added directly to the SQL query instead of being safely passed as a parameter. This could allow someone to change the meaning of the query by entering specially written text.
- One thing it asserted that I had not verified at that point: I had not tested yet whether entering special text in the search could show more colleagues than expected.

## 3. What the code shows

Answer all four. If you cannot answer one, say so.

**Where does the data come from?** It comes from the q part of the directory URL. For example, /directory?q=Nolan.

**What happens to it on the way?** The code checks whether q is a string and then passes it to the searchDirectory function.

**Where does it become dangerous?** The searchDirectory function adds q directly into the SQL query. This means specially written input can change how the query works.

**What stands in the way?** The user needs to be signed in to access the directory. However, the search input is not passed as a separate SQL parameter, so this does not prevent SQL injection.

## 4. What the running application shows

Record both. A single result on its own proves nothing.

**Ordinary case**

- What I entered: I searched for Nolan.
- What came back: One person was returned. (alice nolan) returned

**The case I was testing for**

- What I entered:' OR '1'='1
- What came back:Three colleagues appeared: Alice, Bob and Morgan.
- How this differs from the ordinary case: Searching for Nolan returned one person, but the specially written input returned all three colleagues. This suggests that the input changed how the SQL query worked.

## 5. My answer

Delete the two that do not apply.

**Real**

**Why, in two or three sentences.** Write for somebody who has not seen any of this.
The directory search adds the user's input directly into the SQL query. When I entered the test input, all three colleagues appeared instead of just one person. This shows that the search is vulnerable to SQL injection.

**What would change my mind.** If new information would alter this answer, say what.
If further testing showed that the result happened for another reason, I would reconsider my conclusion. However, the code and my test results currently support this finding.

**How far this answer reaches.** What you established applies to a particular page,
a particular set of data and this version of the application. Say what you have
shown, and be careful not to claim more.
I tested the /directory search in this version of Atrium and found that the input could change the search results. I have not tested every page or proved that other database tables can be accessed.



## 6. Back to the assistant

The thing you noted in section 2, that you had not verified at the time.

- Did I check it? Yes, I tested the search in the running application.
- Was it right?Partly assistant said that the search input could change the SQL query, and when I tested it, all three colleagues appeared. This supports the explanation, but I would need to do more tests to confirm how it behaves with other inputs.

---

## Optional, if you had time

The other two findings matched the same rule. Why are they not the same situation?
Two sentences.
The other two findings use the same Semgrep rule, but their SQL queries use ? placeholders for values. The directory search adds the search text directly into the query, so it needs a different assessment.

## Semgrep rule experiment

I removed insert from the regular expression in scan-rules/sql.yaml and ran the scan again. The original scan reported 3 findings, but after removing insert, it reported 2 findings. The finding in src/db/reset.js disappeared, while the directory and resources findings remained. This showed me that changing a scanner rule can change the results it reports. It did not fix the application code.
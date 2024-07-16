# Lesson 0C - Testing Node

---

### What This Lesson Covers

- Automated tests.
- How tests are used for Noble Desktop students.
- How to test your code.
- How to read tests.

---

### Automated Tests

Developers often write automated tests to check the correctness of their code. They then run their tests automatically at regular intervals (or when the save or use version control), and the automated tests can report whether the code works or not.

This provides 2 main advantages:

- Developers **think through and define** exactly what their code needs to do _before_ they set about writing it, giving them a clear picture of what code to write and encouraging themselves to write concise code that solves the problem and only the problem.
- Developers **can change code with confidence**, knowing that the automated tests will let them know if they've broken anything.

---

### How Tests Are Used For Noble Desktop Students

Some of our assignments, particularly early on, use tests to help you know when your code is correct. In production environments, developers would usually write the test and then write the code that passes it. But as students, you aren't expected to write tests—just code that _passes_ those tests.

We've written the tests for you, and now you can simply have an easier, automated way to know what's going right or wrong with your assignment solutions.

---

### How To Run Our Tests

---

Running the tests is as easy as typing `node [filename]` into the terminal, with `[filename]`replaced by whatever file you are instructed to execute to run the tests.

---

### Your Task

Follow the directions in `prog.js` to complete the assignment. When you think you're done—or, better yet, as you go—run the tests by typing `node prog.js` into the terminal.

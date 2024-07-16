# 1A. Assignment

---

## Goals

- Create modules
- Export modules
- Import modules
- Run files

---

## Setup

- You can view the test cases on the test file. They should match the description in this README.
- After filling out each function in it's own file, import it in `tests.js` using `require`.
- You will also need to _export_ each function from its own module using `module.exports`.
- To check how far you are in the assignment, run the tests file using command `node tests.js` and you should see some check marks in green for each sub test passed, and a red `X` for failed subtests. If the colorized things do not show up, it will just tell you which major tests failed, and list the latest subtest that was failed. For example, if you complete the Age Checker subtest for ages less than 17 (returns `"Child"`, then the most recent failed subtest will be the one that returns `"Military Age"`

---

## Age Checker

In the **ageChecker.js** file, write and export a function called `ageChecker()`. This function will take a number that represents someone's age.

- If the age is less than 18, return `"Child"`.
- If the age is between 18 and 20 years old (inclusive), return `"Military-Age"`.
- If the age is 21 or older, return `"Alcohol-Age"`.
- If the age is not a number, return `"ageChecker error: unexpected input"`.

example:

```js
ageChecker(16); // => "Child"
ageChecker(19); // => "Military-Age"
ageChecker(26); // => "Alcohol-Age"
```

---

## Fizz Buzz

In the **fizzBuzz.js** file, write and export a function called `fizzBuzz()`. This function will take a number that represents how many numbers to count. In this function, write a `for` loop that loops as many times as the count that is passed into the function. When the loop is complete, return an array of numbers and strings based on the following conditions:

- If the count is divisible by 3, add `"fizz"` to the array instead of the number.
- If the count is divisible by 5, add `"buzz"` to the array instead of the number.
- If the count is divisible by 3 AND 5, add `"fizzbuzz"` to the array instead of the number.
- For any other number, add it to the array.

example:

```js
fizzBuzz(15); // => [1, 2, "fizz", 4, "buzz", "fizz", 7, 8, "fizz", "buzz", 11, "fizz", 13, 14, "fizzbuzz"]
```

---

## Fibonacci

In the **fibonacci.js** file, write and export a function called `fibonacci()`.

The Fibonacci Sequence is the series of numbers:

    0, 1, 1, 2, 3, 5, 8, 13, 21, 34, ...

The next number is found by adding up the two numbers before it:

- the first two numbers are always 0 and 1,
- the next number is found by adding 0 and 1, giving you 1,
- the 2 is found by adding the two numbers before it (1+1),
- the 3 is found by adding the two numbers before it (1+2),
- the 5 is 2+3,
- and so on!

This function will take a number that represents how many numbers in the fibonacci sequence to return. Return an array of this sequence of numbers.

example:

```js
fibonacci(7); // => [0, 1, 1, 2, 3, 5, 8]
```

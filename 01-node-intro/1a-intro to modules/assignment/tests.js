/*
    IMPORTS
*/
const assert = require("assert");
const { describe, it } = require("node:test");

// import your files below:

// ageChecker.js

// fizzBuzz.js

// fibonacci.js

/*
    TEST SPACE
*/
/////////////////////
///// ageChecker ////
/////////////////////
describe("ageChecker", function () {
  it("ageChecker tests", function () {
    // 1.
    assert.strictEqual(
      ageChecker(16),
      "Child",
      "Calling ageChecker with 16 should return 'Child'"
    );
    // 2.
    assert.strictEqual(
      ageChecker(19),
      "Military-Age",
      "Calling ageChecker with 19 should return 'Military-Age'"
    );
    // 3.
    assert.strictEqual(
      ageChecker(25),
      "Alcohol-Age",
      "Calling ageChecker with 25 should return 'Alcohol-Age'"
    );
    // 4.
    assert.strictEqual(
      ageChecker("thirty five"),
      "ageChecker error: unexpected input",
      "Calling ageChecker with a non-number should return 'ageChecker error: unexpected input'"
    );

    console.log("Age Checker Complete!");
  });
});

/////////////////////
///// fizzBuzz //////
/////////////////////
describe("fizzBuzz", function () {
  it("fizzBuzz tests", function () {
    // 1.
    assert.deepStrictEqual(
      fizzBuzz(7),
      [1, 2, "fizz", 4, "buzz", "fizz", 7],
      "Calling fizzBuzz with 7 failed."
    );
    // 2.
    assert.deepStrictEqual(
      fizzBuzz(16),
      [
        1,
        2,
        "fizz",
        4,
        "buzz",
        "fizz",
        7,
        8,
        "fizz",
        "buzz",
        11,
        "fizz",
        13,
        14,
        "fizzbuzz",
        16,
      ],
      "Calling fizzBuzz with 16 failed"
    );
    // 3.
    assert.deepStrictEqual(
      fizzBuzz(25),
      [
        1,
        2,
        "fizz",
        4,
        "buzz",
        "fizz",
        7,
        8,
        "fizz",
        "buzz",
        11,
        "fizz",
        13,
        14,
        "fizzbuzz",
        16,
        17,
        "fizz",
        19,
        "buzz",
        "fizz",
        22,
        23,
        "fizz",
        "buzz",
      ],
      "Calling fizzBuzz with 25 failed"
    );
    // 4.
    assert.deepStrictEqual(fizzBuzz("fifty"), [], "Test fifty failed");

    console.log("fizzBuzz Complete!");
  });
});

/////////////////////
///// fibonacci /////
/////////////////////
describe("fibonacci", function () {
  it("fibonacci tests", function () {
    // 1.
    assert.deepStrictEqual(fibonacci(0), [], "Test 0 failed");
    // 2.
    assert.deepStrictEqual(fibonacci(1), [0], "Test 1 failed");
    // 3.
    assert.deepStrictEqual(fibonacci(5), [0, 1, 1, 2, 3], "Test 5 failed");
    // 4.
    assert.deepStrictEqual(
      fibonacci(10),
      [0, 1, 1, 2, 3, 5, 8, 13, 21, 34],
      "Test 10 failed"
    );

    console.log("fibonacci Complete!");
  });
});

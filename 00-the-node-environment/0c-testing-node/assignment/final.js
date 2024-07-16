// Your code here.

// - Write a function called `getFirstElement` that takes an array as an
//   argument and returns the first element of the array.

function getFirstElement(arr) {
  return arr[0];
}

// - Write a function called `getLastElement` that takes an array as an argument
//   and returns the last element of the array.
function getLastElement(arr) {
  return arr[arr.length - 1];
}

// - Write a function called `reverseWithoutMutation` that takes an array as an
//   argument and returns a new array with the elements in reverse order. It
//   should _not_ mutate the original array.

function reverseWithoutMutation(arr) {
  return arr.slice().reverse();
}

// - Write a function called `sortByLength` that takes an array of strings as an
//   argument and returns a new array with the strings sorted by length, from
//   shortest to longest. It should also not mutate the original array.

function sortByLength(strs) {
  return strs.slice().sort((str1, str2) => str1.length - str2.length);
}

// - Write a function called `getFirstMatch` that takes an array of strings and
//   a string as arguments and returns the first element in the array that
//   includes the string. If there is no match, it should return `null`.

function getFirstMatch(strs, substring) {
  // alternately, use a for of loop
  for (let i = 0; i < strs.length; i++) {
    if (strs[i].includes(substring)) {
      return strs[i];
    }
  }

  return null;
  // or instead of the loop solution above you can use .find to return the first element that returns true from the callback function
  // return strs.find((str) => str.includes(substring)) || null;
}

// - Write a function called `getAllMatches` that takes an array of strings and
//   a string as arguments and returns a new array with all elements in the
//   array that include the string. If there are no matches, it should return an
//   empty array.
function getAllMatches(strs, substring) {
  const matchingStrs = [];
  // alternately, use a for of loop
  for (let i = 0; i < strs.length; i++) {
    if (strs[i].includes(substring)) {
      matchingStrs.push(strs[i]);
    }
  }

  return matchingStrs;
  // or instead of the loop solution above you can use .filter to return a new array of all elements where true is returned from the callback function
  // return strs.filter((str) => str.includes(substring))
}

// Test code here. Do not modify the below code.
const assert = require("assert");
const { describe, it } = require("node:test");

describe("getFirstElement", () => {
  it(`returns the first element of the array`, () => {
    assert.deepStrictEqual(
      getFirstElement([1, 2, 3]),
      1,
      "getFirstElement([1, 2, 3]) should return 1."
    );

    assert.deepStrictEqual(
      getFirstElement(["a", "b", "c"]),
      "a",
      "getFirstElement(['a', 'b', 'c']) should return 'a'."
    );
  });
});

describe("getLastElement", () => {
  it(`returns the last element of the array`, () => {
    assert.deepStrictEqual(
      getLastElement([1, 2, 3]),
      3,
      "getLastElement([1, 2, 3]) should return 3."
    );

    assert.deepStrictEqual(
      getLastElement(["a", "b", "c"]),
      "c",
      "getLastElement(['a', 'b', 'c']) should return 'c'."
    );
  });
});

describe("reverseWithoutMutation", () => {
  it(`returns a new array with the elements in reverse order`, () => {
    const originalArray1 = [1, 2, 3];
    const reversedArray1 = reverseWithoutMutation(originalArray1);
    const originalArray2 = ["a", "b", "c"];
    const reversedArray2 = reverseWithoutMutation(originalArray2);

    assert.deepStrictEqual(
      reversedArray1,
      [3, 2, 1],
      "reverseWithoutMutation([1, 2, 3]) should return [3, 2, 1]."
    );

    assert.deepStrictEqual(
      originalArray1,
      [1, 2, 3],
      "reverseWithoutMutation should not mutate the original array."
    );

    assert.deepStrictEqual(
      reversedArray2,
      ["c", "b", "a"],
      "reverseWithoutMutation(['a', 'b', 'c']) should return ['c', 'b', 'a']."
    );

    assert.deepStrictEqual(
      originalArray2,
      ["a", "b", "c"],
      "reverseWithoutMutation should not mutate the original array."
    );
  });
});

describe("sortByLength", () => {
  it(`returns a new array with the strings sorted by length, from shortest to longest`, () => {
    const originalArray1 = ["aaa", "aa", "a"];
    const sortedArray1 = sortByLength(originalArray1);
    const originalArray2 = ["t-rex", "brachiosaurus", "stegosaurus"];
    const sortedArray2 = sortByLength(originalArray2);

    assert.deepStrictEqual(
      sortedArray1,
      ["a", "aa", "aaa"],
      "sortByLength(['aaa', 'aa', 'a']) should return ['a', 'aa', 'aaa']."
    );

    assert.deepStrictEqual(
      originalArray1,
      ["aaa", "aa", "a"],
      "sortByLength should not mutate the original array."
    );

    assert.deepStrictEqual(
      sortedArray2,
      ["t-rex", "stegosaurus", "brachiosaurus"],
      "sortByLength(['t-rex', 'brachiosaurus', 'stegosaurus']) should return ['t-rex', 'stegosaurus', 'brachiosaurus']."
    );

    assert.deepStrictEqual(
      originalArray2,
      ["t-rex", "brachiosaurus", "stegosaurus"],
      "sortByLength should not mutate the original array."
    );
  });
});

describe("getFirstMatch", () => {
  it(`returns the first element in the array that includes the string`, () => {
    assert.deepStrictEqual(
      getFirstMatch(["apple", "banana", "cherry"], "a"),
      "apple",
      "getFirstMatch(['apple', 'banana', 'cherry'], 'a') should return 'apple'."
    );

    assert.deepStrictEqual(
      getFirstMatch(["apple", "banana", "cherry"], "b"),
      "banana",
      "getFirstMatch(['apple', 'banana', 'cherry'], 'b') should return 'banana'."
    );

    assert.deepStrictEqual(
      getFirstMatch(["apple", "banana", "cherry"], "z"),
      null,
      "getFirstMatch(['apple', 'banana', 'cherry'], 'z') should return null."
    );
  });
});

describe("getAllMatches", () => {
  it(`returns a new array with all elements in the array that include the string`, () => {
    assert.deepStrictEqual(
      getAllMatches(["apple", "banana", "cherry"], "a"),
      ["apple", "banana"],
      "getAllMatches(['apple', 'banana', 'cherry'], 'a') should return ['apple', 'banana']."
    );

    assert.deepStrictEqual(
      getAllMatches(["apple", "banana", "cherry"], "b"),
      ["banana"],
      "getAllMatches(['apple', 'banana', 'cherry'], 'b') should return ['banana']."
    );

    assert.deepStrictEqual(
      getAllMatches(["apple", "banana", "cherry"], "z"),
      [],
      "getAllMatches(['apple', 'banana', 'cherry'], 'z') should return []."
    );
  });
});

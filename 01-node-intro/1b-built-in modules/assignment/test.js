/*
    IMPORT decode() & message HERE
*/
const assert = require("assert");
const { describe, it } = require("node:test");

/*
    TEST ZONE
*/
describe("decode", function () {
  it("test", function () {
    assert.deepStrictEqual(
      decode(message),
      "down dont nine lot work silver east duck done tone bit stop sun deal huge moment poem hold make like possible clock of bought",
      "incorrect, try again."
    );
  });
});

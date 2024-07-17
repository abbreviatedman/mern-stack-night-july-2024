// Your code goes here. See readme.md for more details.

// Write a variable named `fullName` that holds a string with your full name. (Defined here as having 2 names.)
const fullName = "John Doe";

// Write a variable named `person` that holds an object with the following properties:
// - email: a string with a fake email address
// - age: a number with your age
// - hobbies: an array with 3 strings of things you like to do
// - address: an object with the following properties:
//   - street: a string with your street address
//   - city: a string with your city
//   - state: a string with your state
//   - zip: a string with your zip code

const person = {
  email: "fakeemail@notarealemail.com",
  age: 51,
  hobbies: ["fishing", "hiking", "camping"],
  address: {
    street: "1234 Elm St",
    city: "Springfield",
    state: "IL",
    zip: "62701",
  },
};

// Write a function named `giveBirthday` that takes in a person object and increments the person's age by 1.
function giveBirthday(person) {
  person.age++;
}

// Write a function named `addHobby` that takes in a person object and a hobby string as arguments. The function should add the hobby to the end of the person's hobbies array.
function addHobby(person, hobby) {
  person.hobbies.push(hobby);
}

// Write a function named `removeHobby` that takes in a person object and a hobby string as arguments. The function should remove the hobby from the person's hobbies array.
function removeHobby(person, hobby) {
  const index = person.hobbies.indexOf(hobby);
  if (index > -1) {
    person.hobbies.splice(index, 1);
  }
}

// Write a function named `changeAddress` that takes in a person object and four string arguments: street, city, state, and zip. The function should update the person's address object with the new values.
function changeAddress(person, street, city, state, zip) {
  person.address = {
    street: street,
    city: city,
    state: state,
    zip: zip,
  };
}

// The code below is NOT TO BE CHANGED.
// This code tests your code above for correctness.

const assert = require("assert");
const { describe, it } = require("node:test");

if (typeof fullName === undefined) {
  fullName = undefined;
}

describe("fullName", function () {
  it("holds a string", function () {
    assert.deepStrictEqual(
      typeof fullName,
      "string",
      "The variable username either doesn't exist or is not a string."
    );
  });

  it("has two words", function () {
    assert.deepStrictEqual(
      fullName.split(" ").length,
      2,
      "fullName should be a string with two words separated by a space"
    );
  });
});

describe("person", function () {
  it("is an object", function () {
    assert.deepStrictEqual(
      typeof person,
      "object",
      "person should be an object"
    );
  });

  it("has an email property", function () {
    assert.deepStrictEqual(
      typeof person.email,
      "string",
      "person should have an email property that is a string"
    );
  });

  it("has an age property", function () {
    assert.deepStrictEqual(
      typeof person.age,
      "number",
      "person should have an age property that is a number"
    );
  });

  it("has a hobbies property that is an array", function () {
    assert.deepStrictEqual(
      Array.isArray(person.hobbies),
      true,
      "person should have an hobbies property that is an array"
    );
  });

  it("has an address property", function () {
    assert.deepStrictEqual(
      typeof person.address,
      "object",
      "person should have an address property that is an object"
    );
  });

  it("has a city property", function () {
    assert.deepStrictEqual(
      typeof person.address.city,
      "string",
      "person should have an address property that has a city property that is a string"
    );
  });

  it("has a state property", function () {
    assert.deepStrictEqual(
      typeof person.address.state,
      "string",
      "person should have an address property that has a state property that is a string"
    );
  });

  it("has a zip property", function () {
    assert.deepStrictEqual(
      typeof person.address.zip,
      "string",
      "person should have an address property that has a zip property that is a string"
    );
  });

  it("has a street property", function () {
    assert.deepStrictEqual(
      typeof person.address.street,
      "string",
      "person should have an address property that has a street property that is a string"
    );
  });
});

describe("giveBirthday", function () {
  it("is a function", function () {
    assert.deepStrictEqual(
      typeof giveBirthday,
      "function",
      "giveBirthday should be a function"
    );
  });

  it("increments the age property of the person object", function () {
    const examplePerson1 = {
      age: 51,
    };

    const examplePerson2 = {
      age: 25,
    };

    giveBirthday(examplePerson1);
    assert.deepStrictEqual(
      examplePerson1.age,
      52,
      "giveBirthday should increment the age property of the person object by 1"
    );

    giveBirthday(examplePerson2);
    assert.deepStrictEqual(
      examplePerson2.age,
      26,
      "giveBirthday should increment the age property of the person object by 1"
    );
  });
});

describe("addHobby", function () {
  it("is a function", function () {
    assert.deepStrictEqual(
      typeof addHobby,
      "function",
      "addHobby should be a function"
    );
  });

  it("adds a hobby to the hobbies array", function () {
    const examplePerson1 = {
      hobbies: ["fishing", "hiking"],
    };

    const examplePerson2 = {
      hobbies: ["diving", "hiking", "camping"],
    };

    addHobby(examplePerson1, "camping");
    assert.deepStrictEqual(
      examplePerson1.hobbies,
      ["fishing", "hiking", "camping"],
      "addHobby should add a hobby to the hobbies array"
    );

    addHobby(examplePerson2, "fishing");
    assert.deepStrictEqual(
      examplePerson2.hobbies,
      ["diving", "hiking", "camping", "fishing"],
      "addHobby should add a hobby to the hobbies array"
    );
  });
});

describe("removeHobby", function () {
  it("is a function", function () {
    assert.deepStrictEqual(
      typeof removeHobby,
      "function",
      "removeHobby should be a function"
    );
  });

  it("removes a hobby from the hobbies array", function () {
    const examplePerson1 = {
      hobbies: ["fishing", "hiking", "camping"],
    };

    const examplePerson2 = {
      hobbies: ["diving", "hiking", "camping", "fishing"],
    };

    removeHobby(examplePerson1, "hiking");
    assert.deepStrictEqual(
      examplePerson1.hobbies,
      ["fishing", "camping"],
      "removeHobby should remove a hobby from the hobbies array"
    );

    removeHobby(examplePerson2, "diving");
    assert.deepStrictEqual(
      examplePerson2.hobbies,
      ["hiking", "camping", "fishing"],
      "removeHobby should remove a hobby from the hobbies array"
    );
  });
});

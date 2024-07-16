// Your code goes here. See readme.md for more details.

// 1. Create a console.log that logs the message "Hello World!" Run it with the
// command: `node prog.js`

const fullName = "Colin Jaffe";

function greetUser(name) {
  if (
    typeof name !== "string" ||
    name.length === 0 ||
    name.split(" ").length < 2
  ) {
    return "We need the user's full name.";
  } else {
    return `Hello, ${name}!`;
  }
}

console.log(greetUser(fullName));

// 2. Working in the space _above_, where you solved #1, create a variable
// called fullName. Give it a value: a string that's two words long (separated
// by a space). Change the above console log statement to print a greeting to
// someone with that full name, using the variable you created. Run `node
// prog.js` to see it log.

// 3. Add some branching logic to the above code.

// If the string has two words, print out a greeting using only the _first_ word
// (that is, greeting the user by their first name). If the string has one word,
// log out a message that we need the user's full name.

// Test it with `node prog.js`. It should log the full name. Then change the
// `fullName` variable to have a single name and run the file again with `node
// prog.js`. It should now log our error message about needing a full name.

// 4. Add one more piece of branching logic to the above code.

// If there are no characters in the `fullName` string, or its data type isn't a string at all, then print the same error message as above about needing the user's full name.

// Try out each of the following cases, saving and running the file with `node prog.js` each time.

// - Change the `fullName` variable to have a full name. It should now log out a
//   greeting.
// - Change the `fullName` variable to have a single name. It should now log our
//   error message about needing a full name.
// - Change the `fullName` variable to be an empty string. It should log the
//   same error message.
// - Change the `fullName` variable to be a number (or an object or a boolean or
//   anything that's not a string). It should log the same error message.


// 5. Changing the code above, let's declare a function called `greetUser` that
// has all the logic above inside it. The only code outside the function should
// be when we call our function, passing in either our `fullName` variable
// (which should also be outside the function if you keep it) or a literal
// value.

// The big difference is that now that we're using a function, we should
// `return` the string we want to print, not print it out within the function.

// _Outside_ of the function, we can log out the return value of the function,
// either directly or by saving it to a variable first.

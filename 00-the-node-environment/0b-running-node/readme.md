# Lesson 0B - Running Node

---

## What This Lesson Covers:

- What is Node.js?
- What will Node.js be used for?
- Running your first JavaScript statement with Node.
- Writing functions in Node.

---

### What Is Node.js?

- Node.js is an environment that allows you to run Javascript locally on your computer, as opposed to running it in the browser
- In 2008, Google created a free and open-source JavaScript engine called V8 for the web browser Chrome.
- In 2009, the same V8 engine was used by Ryan Dahl to create Node.js.
- In the browser, JavaScript has access to `document`, `window`, and other objects that the browser provides because it's designed for interacting with the DOM
- Node has access to things such as `OS` because your computer can provide information about your operating system

---

### What Will Node.js Be Used For?

Node.js can be used to execute (run) javascript files. Within the context of this course, Node.js will be used to run a server, and to connect to a database (servers and databases are referred to as the back end). The back end can send data to the front end, which is responsible for serving web pages to a client.

For _this_ assignment, we will practice **writing and running JavaScript locally using Node**, leaving servers and databases for later lectures.

### Running Your First Node Statement

Before getting started, make sure you are working in **prog.js**. The **start.js** file will always be a copy of what the file should look like at the beginning of this `readme.md`, and the **final.JS** file is a reference for what it looks like at the end of this `readme.md`.

As a start, we will put in a simple console log:

1. Place a console log to test.

```js
console.log("Hello World!");
```

For all instructions on running terminal commands, we will assume that the file **prog.js** is being worked on. In VS Code, you can open your terminal using ctrl + `

The backtick is the key to the left of the 1 on your keyboard.

In your terminal, make sure you've navigated to the folder where your `prog.js` lives and run the following command:

```
node prog.js
```

You should see "Hello World!" in the console!

This use of the `node` command is how JavaScript files are executed locally. In order to activate a server, this command will be used on the server's main file.

2. Log out a variable.

Let's change our console log to get a bit more practice with writing and running files in Node.

Create a variable called `fullName`. Give it a value: a string that's two words long (separated by a space). Change the above console log statement to print a greeting to someone with that full name, using the variable you created. Run `node prog.js` to see it log.

Here's an example:

``` js
const fullName = "Dolly Parton";
```

Now log out a greeting to that person:

```js
console.log(`Hello, ${fullName}!`);
```

Run the file again and note that what's logged out to the terminal console is different:

```
node prog.js
```

You should now see your second message logged to the terminal console, confirming that `node` is running whatever code you write.

3. Add some branching logic to the above code.

If the string has two words, print out a greeting using only the _first_ word (that is, greeting the user by their first name). If the string has one word, log out a message that we need the user's full name.

Test it with `node prog.js`. It should log the full name. Then change the `fullName` variable to have a single name and run the file again with `node prog.js`. It should now log our error message about needing a full name.

Here's one way you could solve this:

``` js
const fullName = "Dolly Parton";

if (fullName.split().length < 2) {
  console.log("We need the user's full name.")
} else {
  console.log(`Hello, ${fullName}!`);
}
```

4. Add one more piece of branching logic to the above code.

If there are no characters in the `fullName` string, or its data type isn't a string at all, then print the same error message as above about needing the user's full name.

Try out each of the following cases, saving and running the file with `node prog.js` each time.

- Change the `fullName` variable to have a full name. It should now log out a greeting
- Change the `fullName` variable to have a single name. It should now log our error message about needing a full name.
- Change the `fullName` variable to be an empty string. It should log the same error message.
- Change the `fullName` variable to be a number (or an object or a boolean or anything that's not a string). It should log the same error message.

Here's one way you could this:

``` js
const fullName = "Colin Jaffe";

if (
  typeof fullName !== "string" ||
  fullName.length === 0 ||
  fullName.split(" ").length < 2
) {
  console.log("We need the user's full name.");
} else {
  console.log(`Hello, ${fullName}!`);
}
```

---

### Writing Functions In Node

Writing functions in Node, just like all the other JavaScript we've written, works the same way as in JS in the browser.

Let's declare a function called `greetUser` that has all the logic above inside it. The only code outside the function should be when we call our function, passing in either our `fullName` variable (which should also be outside the function if you keep it) or a literal value.

The big difference is that now that we're using a function, we should `return` the string we want to print, not print it out within the function.

_Outside_ of the function, we can log out the return value of the function, either directly or by saving it to a variable first.

Here's what it could look like:

``` js
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
```


# Lesson 1A: Modules

---

## What This Lesson Covers:

- What is a Module
- Custom modules and `module.exports`
- `require()`
- Importance of modularity

---

### What Is A Module

A Module in Node.js is a collection of functions, organized in a single or multiple JavaScript files which can be reused throughout the Node.js application. Each module has its own context, so it cannot interfere with other modules or pollute global scope.

There are 3 kinds of Node modules:

- Can be built in, such as `OS`, `FS`, `path`, and `HTTP` which are all covered in this Unit
- Can be installed using `npm` commands, such as `express` which will be covered in Unit 02
- Can be custom-made and will exist locally in your application. In this case, they must be assigned to the property `module.exports`

---

### Exporting Custom Modules

Open the file **modules/sayName.js** to see the following:

```js
function sayName(name) {
  console.log(`My name is ${name}`);
}

module.exports = sayName;
```

Here is a function that makes a greeting out of any given name. Under the defined function, Node's built-in object called `module` is called on in order to export the function. In Node.js, the exports object is used to define what parts of a module should be accessible from outside the module. This allows us to use that function from any other file, as long as it's imported using `require()`

---

### Importing Modules

The `require()` function allows a JavaScript file to import from another file.

Let's give it a try:

2. Use the `require()` function to grab sayName from the modules

```js
const sayName = require("./modules/sayName");
```

In this way of importing a module, the module and all of it's functionality is ready to use in **prog.js**.

Let's use this immediately and test the `sayName()` function:

3. Test the module function sayName

```js
sayName("Colin");
```

If we use the command `node prog.js` in terminal, we should see it show up below!

Next, we are going to explore how to import one function at a time from a module. Open the file **modules/greetings.js** to see the following:

```js
function sayHello(name) {
  console.log(`Hello ${name}`);
}

function sayGoodBye(name) {
  console.log(`Good bye ${name}`);
}

module.exports = { sayHello, sayGoodBye };
```

In this way of importing a module, each function will be exported individually. They can also be imported in a similar manner:

4. Use the `require()` function to grab { sayHello, sayGoodBye } from the modules

```js
const { sayHello, sayGoodBye } = require("./modules/greetings");
```

Next we are going to test the `sayHello` and `sayGoodBye()` functions:

5. Test the module functions `sayHello` and `sayGoodBye`

```js
sayHello("New Colin");
sayGoodBye("Old Colin");
```

---

### The Importance Of Modularity

Modularity is one of the most popular programming practices that you’ll never fail to find in almost all of the top software projects across all programming languages and software stacks.

Modularizing your code means decomposing a monolithic piece of logic or functionality into separate, individual, independent components that work together in unison but are much easier to organize, update, maintain, troubleshoot, and debug. This fragmentation has several benefits:

- It makes your project easier to manage and maintain as points of failure are easy to isolate and fix.
- The flexibility allows you to interchange code components and try new features without breaking core functionality.
- It reduces redundancy and increases efficiency by reusing and extending already implemented pieces of code.
- It is easier to unit test and debug.
- It saves you time and resources – in the short run as well as the long run.

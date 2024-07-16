# Lesson 2D: API Requests

---

## What this lesson covers:

- Try-Catch blocks
- Keywords Async & Await
- Axios

---

## Overview

The goal of this lesson is to get used to using Asyncronous functions, and using them to make requests to an external API. When building out a Full-Stack web application, you will be setting up asyncronous requests to your own API (back-end) from the front-end of the application. You will also be performing asyncronous requests to external API's depending on the purpose of your application. This lesson is meant to give you a fundamental understanding on how to properly make these requests, and these skills are to be used in different contexts (in the same way that `if` statements and `for` loops are fundamental).

The final-files and starter-files have been separated into their own folders. Each will contain at least 1 file per topic in this lesson.

## Try-Catch blocks

A Try-Catch block is a block of code that makes an attempt to run a set of functions, and only execute it if it works. If it doesn't work, an alternate set of functions will execute instead. Here's what that might look like:

```js
try {
  console.log("If this doesn't work...");
} catch {
  console.log("....this will!");
}
```

Code that is written inside the `try {}` statement will try to run. If no errors occur, the code inside of these brackets will be executed. If an error occurs, code inside of the `catch {}` statement will run instead.

The Try-Catch block comes with a few keywords:

- `try` statement defines a code block to run (to try).
- `catch` statement defines a code block to handle any errors.
- `throw` statement defines a custom error.

Let's start practicing these! Take a look at **Starter-files/try-catch.js**:

1. Write a Try-Catch block where the `try` statement has no errors

<!-- 1. Write a Try-Catch block where the `try` statement has no errors -->

```js
try {
  console.log("this is the try block");
} catch (error) {
  console.log("This is the catch block");
  console.log(error);
}
```

Use command `node try-catch.js` to see the results in the terminal. As you can see, the `try` statement is what gets executed, but the `catch` statement gets skipped over. Let's comment out the previous task and take a look at another case:

2. Write a Try-Catch block where the `try` statement has an error

<!-- 2. Write a Try-Catch block where the `try` statement has an error -->

```js
try {
  consooooooo000le.log("this is the try block");
} catch (error) {
  console.log("This is the catch block");
  console.log(error);
}
```

Use command `node try-catch.js` to see the results in the terminal. As you can see this time, the `try` statement gets skipped over because there's an error in it. In the `catch` statement, we have control over the error that's displayed in the console. Now make sure to comment out this task before we move on to the next one.

With the `throw` statement, we can define what this error says:

3. Write a Try-Catch block with `throw` statements to define the error

<!-- 3. Write a Try-Catch block with `throw` statements to define the error -->

```js
let loadedDice;
while (loadedDice !== 4) {
  loadedDice = Math.ceil(Math.random() * 6);
  // console.log(dice);

  try {
    if (loadedDice < 4) throw "dice rolled too low";
    if (loadedDice > 4) throw "dice rolled too high";
    console.log(loadedDice);
  } catch (error) {
    console.log(error);
  }
}
```

Use command `node try-catch.js` to see the results in the terminal. You might need to run it a few times to get the full effect.

What's going on here is that we are setting up a "dice roll" where we only log the value of the dice if it comes up 4. If it's any other value, we're using `throw` statements to define the error. The `catch` statement will catch the thrown error, and log it. All of this is wrapped in a `while` loop, so it doesn't stop rolling until the `loadedDice` value is 4. You should see something like this in the console:

```
dice rolled too high
dice rolled too low
dice rolled too high
dice rolled too low
dice rolled too low
dice rolled too low
dice rolled too high
4
```

Comment out this task before moving on to the next task.

Now that we understand how Try-Catch blocks work, let's take a look at a more practical example.

In the terminal, use command `npm install prompt-sync`. This is a module that allows you to prompt a user input via the terminal:

4. Import the `prompt-sync` module

<!-- 4. Import the `prompt-sync` module -->

```js
const prompt = require("prompt-sync")();
```

`prompt` is now a function. This function takes in a string as an argument, which will be displayed in the console before waiting for a user input. When this module is used, the value of the user input must be stored in a variable for it to be used:

5. Store the user input in a variable called `password`

<!-- 5. Store the user input in a variable called `password` -->

```js
let password = prompt("Store a password 4 characters long or longer: ");
```

In a fully developed application, you might have a feature that allows users to log in to their account. When this happens, you must use a Try-Catch block that will check to see if the password is correct. This example will not include password encryption, but it still demonstrates real-world application of a Try-Catch block:

6. Write a Try-Catch block to check the length of the password

<!-- 6. Write a Try-Catch block to check the length of the password -->

```js
try {
  if (password.length < 4) throw "password too short!";
  console.log("This password is acceptable");
} catch (error) {
  console.log(error);
}
```

Use command `node try-catch.js` and try passwords of different lengths to see the results. If it's too short, an appropriate error displays in the console. Otherwise, the password is acceptable. Using a Try-Catch block is an effective way to deal with password checking.

## Keywords Async & Await

The `async` and `await` keywords enable asynchronous, promise-based behavior to be written in a clean style, avoiding the need to explicitly configure promise chains.
​

- `async` keywords when defining a function will allow it to run on it's own time, while the rest of a JavaScript file is executed synchronously.
- `await` keywords allow a promise object to return a value when it is capable

Let's use the scenario of ordering food at McDonalds as an analogy to asynchronous functionality. When you order food at McDonalds (or any fast-food style restaurant), the following events occur:

- You give your order to the person at the register.
- They input the order to the people in the kitchen, they then hand you a receipt with information about your order.
- The kitchen takes some time to prepare your food and package it up properly.
- The counter calls out your order. When you hear it, you hand over the receipt to resolve your order.
- You receive the food you requested.

_Keep in mind that the more people are ordering food at the moment (the busier the restaurant is), the longer it will take for the kitchen to prepare your food._

Now when you make a request to an API, the following events occur:

- You make an HTTP request to the server.
- The server routes the request to the appropriate function, and hand you back a promise with information about your request.
- The server takes some time to prepare your data and package it up properly.
- The server completes your request. It comes back to you, you resolve the promise.
- You receive the data you requested.

_Keep in mind that the more people are making requests at the moment (the busier the server is), the longer it will take for the server to prepare your data._

To have an understanding as to what an asynchronous function is and what a promise is, let's take a look at **Starter-files/async-await.js** to see the following example:

7. Example of an asynchronous function

<!-- 7. Example of an asynchronous function -->

```js
async function orderingMcDonalds() {
  // When you make an order, you get back a receipt. This is a promise that you will get your food when it's done
  let myOrder = new Promise((resolve, reject) => {
    setTimeout(() => resolve("Your order is ready!!!"), 5000);
  });

  let receipt = await myOrder; // wait until the promise resolves (*)

  console.log(receipt); // "done!"
}

console.log("This is before ordering");
orderingMcDonalds();
console.log("This is after ordering");
```

Here we have an asynchronous function, declared by using keyword `async` before the keyword `function` which defines the function. We're declaring a variable `receipt` that will contain the promise until it's resolved. In this case, we're using `new Promise()` but in real practice we will be using `axios()` to make HTTP requests to an API instead. We're also using `resolve()` to "send ourselves" the data that the promise would return. This is wrapped in a `setTimeout()` which is set to wait for 5 seconds so we can simulate the wait time of a promise. Next, we're declaring a variable called `myOrder` that will store the return value of the promise `receipt` by using the keyword `await` before the promise. Finally, we're console logging variable `myOrder` at the end of this asynchronous function.

Note that we're running console logs before and after running this function. This is to demonstrate how asynchronous functions work.

Use command `node async-await.js` in the terminal to see the results.

You'll see that both the console logs run before getting the result of the async function. This is because asynchronous functions will "step away" from the rest of your synchronous code so it can run on it's own time.

Let's try this with `fetch()` which is a JavaScript built-in module that allows you to perform HTTP requests:

8. Use `fetch()` and async-await to write an async function that makes an HTTP request

<!-- 8. Use `fetch()` and async-await to write an async function that makes an HTTP request -->

```js
async function fetchData() {
  let returnData = await fetch("https://whatthecommit.com/index.txt");
  let commitMessage = await returnData.text();

  console.log(commitMessage);
}

console.log("before");
fetchData();
console.log("after");
```

_Note that even though the return seems to happen immediately in the console, the other logs occur beforehand because they are synchronous code._

Keyword `await` is used twice here, because that's how `fetch()` works. `.text()` is used here because the API we're using to test this with will return a string.

Now let's upgrade from `fetch()` to use `axios` and put together everything in this lesson

## Axios

The axios module is a promise-based HTTP Client for Node.js and the browser. It is isomorphic, meaning it can run in the browser and Node.js with the same codebase. On the server-side it uses the native Node.js http module, while on the client (browser) side it uses XMLHttpRequests. It's purpose is to make HTTP requests to API's or websites.

In terminal, use command `npm install axios` to install this module. We will also beusing the module `express` so use command `npm install express` as well.

Let's take a look at **axios.js**. The first thing to do is import the modules:

9. Import `express` and `axios`

<!-- 9. Import `express` and `axios` -->

```js
const express = require("express");
const app = express();
const axios = require("axios");
```

Make sure to set up the server:

10. Set up the server's ability to listen to requests

<!-- 10. Set up the server's ability to listen to requests -->

```js
const PORT = 3000;

app.listen(PORT, () => console.log(`server listening on ${PORT}`));
```

Next we're going to write a response to a GET request to the server. The URL will look like `localhost:3000/:query` where `:query` are the search terms. Take a look at the code first and read the explanation afterwards:

11. Write an asynchronous function to respond to requests at `localhost:3000/:query`

<!-- 11. Write an asynchronous function to respond to requests at `localhost:3000/:query` -->

```js
app.get("/:query", async (req, res) => {
  // Store the dynamic parameter
  let query = req.params.query;

  // Try block in case an error breaks our code
  try {
    // We await the axios promise, it's resolved in the variable findMovies
    let findMovies = await axios.get(
      `https://api.themoviedb.org/3/search/multi?api_key=a4cae43902da506229d8148bcfc7364c&language=en-US&query=${query}`
    );

    console.log("getting your movies");

    // If the search works, we send back the data
    res.status(200).json({
      message: "success",
      payload: findMovies.data.results,
    });
    // If there's an error, we send that back instead
  } catch (err) {
    res.status(500).json({
      message: "error",
      payload: err,
    });
  }
});
```

- The callback function uses keyword `async` in front of it because we will be handling the promise that `axios` produces and need access to keyword `await`.
- We're using the variable `query` to capture the dynamic parameters in the URL and store it temporarily.
- A Try-Catch block is set up just in case there's an error with the request.
- Variable `findMovies` will store the response to the `axios` request. Keyword `await` is used because `axios.get()` is a promise that will eventually return with data.
- The console log will run if the request is successful, because it's in the `try` statement.
- `res` is the response object, and will respond with a parsed version of the axios response (for this API specifically, the response we want to see is within `.data.results`).
- The `catch` statement will respond with an error if there is an error within the `try` statement.

Test this by first turning the server on with command `node axios.js`. Then open up Postman and make a GET request to `localhost:3000/thor`. You should see a response filled with movies whose titles contain "Thor" in it.

Don't forget to turn the server off with `ctrl + c`

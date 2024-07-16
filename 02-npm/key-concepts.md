# Key Concepts

---

​

## What is covered in this review file:

- How to initialize a Node project
- Express
- Responding to URL requests
- Status Code
- Middleware
- CRUD
- Postman
- Dynamic Parameters (URLs)
- Router Files
- Try & Catch blocks
- Async await
- Axios
- EJS
  ​

---

​

## How to initialize a Node project

​
To initialize a new project, you must have a folder open in VSCode, and have navigated to the root folder via the Terminal. When you use the `ls` command, the file _**index.js**_ must be there. To initialize, use the following command in terminal:
​

```
npm init
```

​
This will walk you through generating your _**package.json**_ file. To get the default settings, use the following command:
​

```
npm init -y
```

​
A _**package.json**_ file holds the meta data for your application, including all installed dependencies. Run the following command to install the most common dependency, Express:
​

```
npm install express
```

​
This will also generate a local folder called _**node_modules**_
​

## Express

​
Express is the most popular Node web framework, and is the underlying library for a number of other popular Node web frameworks. It provides mechanisms to:
​

- Write handlers for requests with different HTTP verbs at different URL paths (routes)
- Integrate with "view" rendering engines in order to generate responses by inserting data into templates.
- Set common web application settings like the port to use for connecting, and the location of templates that are used for rendering the response.
- Add additional request processing "middleware" at any point within the request handling pipeline
  ​

## Responding to URL requests

​
Here is an example of responding to the base URL of your application:
​

```js
app.get("/", (req, res) => {
  res.send("Hello World");
});
```

​

## Status Code

​
A status code is a message a website's server sends to the browser to indicate whether or not that request can be fulfilled. Here is a list of status codes, with their meanings:
​

- `200` - successful request
- `304` - not modified - web page or data hasn't been changed
- `404` - requested resource cannot be found
- `401` - authentication error, attempt to access a protected resource
- `500` - generic error, when no other error is suitable
  ​

## Middleware

​
The middleware in node. js is a function that will have all the access for requesting an object, responding to an object, and moving to the next middleware function in the application request-response cycle. What you've learned so far is
​

- `app.use(express.json());` - Telling the browser/Postman what data it's receiving
- `app.use(logger("dev"));` - Morgan will log metadata about requests in the server console
- `app.use(express.urlencoded({ extended: false }));` - Allows us to parse form data - MAY BE DEPRECATED/UNNECESSARY
  ​
  For example, to get Morgan working, you need these 3 things:
  ​

1. Install it using the command `npm i morgan`
2. Import it on your index.js file with `const logger = require("morgan");`
3. Enable it as middleware using `app.use(logger("dev"));`
   ​

## CRUD

​
CRUD is an acronym that refers to the 4 functions that are considered necessary to implement a persistent storage application:
​

- `C`reate - POST method
- `R`ead - GET method
- `U`pdate - PUT method
- `D`estroy - DELETE method
  ​

## Postman

​
Postman is an API platform for building and using APIs. It allows you to seamlessly test your API endpoints and save them for future uses.
​

## Dynamic Parameters (URLs)

​
Dynamic Parameters are name-value pairs that allow you to interact with API's or web pages in a unique way. The values can be used to search for or target specific data in a database, and return data to a user based on these values. For example:
​

```js
app.delete("/delete-by-id/:id", (req, res) => {
  // functionality goes here
});
```

​
Server side code that looks like this will allow you to insert an ID into the URL and delete an item from a database once it is targeted correctly.
​

## Router Files

​
Router files allow you to have a file that is dedicated to various URL routes in your application. Whether it be for API use or for accessing web pages at various URL extensions, a dedicated file for this purpose will allow you to keep your application's code easy to read and navigate.
​
We will discuss further Separation of Concerns as our applications grow in size.
​

## Try & Catch Blocks

​
Try and Catch blocks allow you to test code for errors, and catch them without breaking an entire application.
​

- `Try` statements allow you to define a block of code to be tested for errors while it is being executed.
- `Catch` statements allow you to define a block of code to be executed, if an error occurs in the try block.
- `Throw` statements allow you to define specific errors for the `Catch` statement to manage.
  ​

## Async & Await

​
The `async` and `await` keywords enable asynchronous, promise-based behavior to be writted in a clean style, avoiding the need to explicitly configure promise chains.
​

- `async` keywords when defining a function will allow it to run on it's own time, while the rest of a JavaScript file is executed synchronously.
- `await` keywords allow a promise object to return a value when it is capable
  ​

## Axios

​
The axios module is a promise-based HTTP Client for Node.js and the browser. It is isomorphic, meaning it can run in the browser and Node.js with the same codebase. On the server-side it uses the native Node.js http module, while on the client (browser) side it uses XMLHttpRequests. It's purpose is to make HTTP requests to API's or websites.
​

## EJS

​
EJS (Embedded JavaScript) is one of the most popular template engines for Javascript. As the name suggests, it lets us embed JavaScript code in a template language that is then used to generate HTML.

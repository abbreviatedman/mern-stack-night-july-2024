# Lesson 1C: HTTP

---

## What this lesson covers:

- What is the HTTP module
- How to start up a basic server
- How to access different pages on the same website
- Error handling
- Responding to URL requests differently (text, json, html)

---

### What is the HTTP module?

Node.js has a built-in module called HTTP, which allows Node.js to transfer data over the Hyper Text Transfer Protocol (HTTP). To include the HTTP module, use the require() method:

1. Include the HTTP module

```js
const http = require("http");
```

### How to start up a basic server

In this section, we will be using methods such as:

- `http.createServer()` - handles how a server responds to requests, returns an object
- `server.listen()` - handles how to listen to requests
- `response.write()` - generates a response
- `response.end()` - ends the process of responding
- `response.setHeader()` or `response.writeHead()` - adjusts what type of response is being sent back

The HTTP module can create an HTTP server that listens to server ports and gives a response back to the client.

Use the `createServer()` method to create an HTTP server:

2. Create a server object

```js
http
  .createServer(function (request, response) {
    // 2a. write a response to the client
    response.write("Hello World!");
    // 2b. end the response process
    response.end();
  })
  .listen(3000); //the server object listens on port 3000
```

The function passed into the `http.createServer()` method will be executed when someone tries to access (or make a request to) the computer on port 3000. The response parameter is used to control how the server responds to a request, in this case the server will write "Hello World" as text and send it to the client.

Use the command `node prog.js` in your terminal to begin running the server. Open your browser, and in the URL bar type in `localhost:3000`. You should see the words "Hello World!" on the page.

To stop the server from running, go back to your terminal and press `ctrl + c`

### How to access different pages on the same website

The function passed into the `http.createServer()` method will also allow you to handle various types of requests. Each request can handle a request at a different web page:

3. Handle alternate web page requests

```js
const server = http.createServer((request, response) => {
  // 3a. if you go to localhost:3000/
  if (request.url === "/") {
    response.end("Welcome to our home page");
  }
  // 3b. if you go to localhost:3000/about
  if (request.url === "/about") {
    response.end("Noble Desktop!!!");
  }
}); // end of server
```

Make sure to run the `server.listen()` method at the end of the page:

4. Allow the server to begin listening for requests

```js
const PORT = 3000;

server.listen(PORT, () => {
  console.log(`Server is now listening on port ${PORT}`);
});
```

This block of code MUST remain at the very bottom of the page. When the file is run, the `server.listen()` method is a process that continues until you end it, so it stays at the bottom so that the rest of the file has already been compiled.

Before running the server, make sure to comment out the first server block (task #2). In fact, make sure to always comment out the previous task that includes `const server` when you create a new server block. After you've done this, run the node command on the file you're working on.

Run the server using `node prog.js`

- When you go to `localhost:3000/` in the browser, you should see "Welcome to our home page"
- When you go to `localhost:3000/about` in the browser, you should see "Noble Desktop!!!"

Once it works, turn off the server with `ctrl + c`

### How to handle errors

Clients may try to access a web page on the website that doesn't exist. In this case, it's best to set up the server to let the client know and to redirect them back to the homepage:

5. Handling errors

```js
const server = http.createServer((request, response) => {
  // 5a. if you go to localhost:3000/
  if (request.url === "/") {
    response.end("Welcome to our home page");
    // 5b. if you go to localhost:3000/about
  } else if (request.url === "/about") {
    response.end("Noble Desktop!!!");
    // 5c. if you go to localhost:3000/anything-else
  } else {
    response.end(`
    <h1>404 Error: Page not found</h1>
    <a href="/">back to home</a>
    `);
  } // end of URL if-else statements
}); // end of server
```

Note that the final response is written in HTML. This way, we can insert a link back to the homepage. The element `<a href="/">` doesn't need the full `localhost:3000` because it is a relative path.

Run the server using `node prog.js`

- When you go to `localhost:3000/` in the browser, you should see "Welcome to our home page"
- When you go to `localhost:3000/about` in the browser, you should see "Noble Desktop!!!"
- When you go to `localhost:3000/anything-else` in the browser, you should see a 404 error message and a link back to the home page

Once it works, turn off the server with `ctrl + c`

### Responding to URL requests differently

So far during this lesson, every response to the client has been in the form of text. We can also respond to the client in JSON format:

6. Respond to the client in JSON

```js
const server = http.createServer(function (req, res) {
  // 6a. Adjusts metadata such that whatever receives it understands what kind of data it is receiving
  res.setHeader("Content-Type", "application/json");
  // 6b. ends the response process, and converts data into text for readability in the browser
  res.end(JSON.stringify({ text: "hi", numbers: [1, 2, 3] }));
});
```

The `res.setHeader()` method is used to set the kind of data we are sending back to the client upon request. This will be useful for setting up an API, which will be covered later.

Run the server using `node prog.js`

- When you go to `localhost:3000/` in the browser, you should see an object string.

Once it works, turn off the server with `ctrl + c`

The response to the client can also be in the form of HTML. There should be a public folder that holds an **index.html** file and an **about.html** file. In order to read it properly, make sure to include the file system module at the top:

7. Include the file system module

```js
const fs = require("fs");
```

The server can be set up to send the client these documents upon URL request. We will begin with handling the homepage:

8. Respond to the client in HTML

```js
const server = http.createServer(function (req, res) {
  // 8a. set up response to localhost:3000/
  if (req.url === "/") {
    // 8b. read the index.html file
    fs.readFile("./public/index.html", function (err, data) {
      // 8c. if there is no index.html file
      if (err) {
        res.end("something is wrong");
        return res.end();
      }
      // 8d. set the metadata to reflect html file type
      res.writeHead(200, { "Content-Type": "text/html" });
      // 8e. write up the file being read
      res.write(data);
      // 8f. end the response
      return res.end();
    }); // end of reading the index.html file
  } // end of URL routes
}); // end of server
```

Run the server using `node prog.js`

- When you go to `localhost:3000/` in the browser, you should see the words "Home page"

Once it works, turn off the server with `ctrl + c`

Now it's time to connect the **about.html** by continuing the if statement:

9. Set up for localhost:3000/about

```js
  else if (req.url === "/about") {
    // 9a. read the about.html file
    fs.readFile("./public/about.html", function (err, data) {
      // 9b. if there is no about.html file
      if (err) {
        res.end("something is wrong");
        return res.end();
      }
      // 9c. set the metadata to reflect html file type
      res.writeHead(200, { "Content-Type": "text/html" });
      // 9d. write up the file being read
      res.write(data);
      // 9e. end the response
      return res.end();
    }); // end of reading the about.html file
  } // end of URL routes
```

Run the server using `node prog.js`

- When you go to `localhost:3000/about` in the browser, you should see the words "Noble Desktop!"

Once it works, turn off the server with `ctrl + c`

Finally, it's time to connect the **error.html** in case someone requests a page that doesn't exist:

10. Set up for localhost:3000/anything-else

```js
  // no condition, any other URL extension
  else {
    // 10a. read the error.html file
    fs.readFile("./public/error.html", function (err, data) {
      // 10b. if there is no error.html file
      if (err) {
        res.end("something is wrong");
        return res.end();
      }
      // 10c. set the metadata to reflect html file type
      res.writeHead(200, { "Content-Type": "text/html" });
      // 10d. write up the file being read
      res.write(data);
      // 10e. end the response
      return res.end();
    }); // end of reading the error.html file
  } // end of URL routes
```

Run the server using `node prog.js`

- When you go to `localhost:3000/anything-else` in the browser, you should see an error message, along with a link to go back to the homepage

Once it works, turn off the server with `ctrl + c`

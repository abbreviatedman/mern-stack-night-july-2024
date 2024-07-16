/* 
    1. Include the HTTP module
*/
const http = require("http");

/*
    7. Include the file system module
*/
const fs = require("fs");

/* 
    2. Create a server object
*/
// http.createServer(function (request, response) {
//   // 2a. write a response to the client
//   response.write('Hello World!');
//   // 2b. end the response process
//   response.end();
// }).listen(3000); //the server object listens on port 3000

/* 
    3. Handle alternate web page requests
*/
// const server = http.createServer((request, response) => {
//   // 3a. if you go to localhost:3000/
//   if (request.url === "/") {
//     response.end("Welcome to our home page");
//   }
//   // 3b. if you go to localhost:3000/
//   if (request.url === "/about") {
//     response.end("Noble Desktop!!!");
//   }

// }); // end of server

/*
    5. Handling errors
*/
// const server = http.createServer((request, response) => {
//   // 5a. if you go to localhost:3000/
//   if (request.url === "/") {
//     response.end("Welcome to our home page");
//   // 5b. if you go to localhost:3000/about
//   } else if (request.url === "/about") {
//     response.end("Noble Desktop!!!");
//   // 5c. if you go to localhost:3000/anything-else
//   } else {
//     response.end(`
//     <h1>404 Error: Page not found</h1>
//     <a href="/">back to home</a>
//     `);
//   } // end of URL if-else statements
// }); // end of server

/*
    6. Respond to the client in JSON
*/
// const server = http.createServer(function (req, res) {
//   // 6a. Adjusts metadata such that whatever receives it understands what kind of data it is receiving
//   res.setHeader("Content-Type", "application/json");
//   // 6b. ends the response process, and converts data into text if it needs to
//   res.end(JSON.stringify({ text: "hi", numbers: [1, 2, 3] }));
// });

/*
    8. Respond to the client in HTML
*/
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
    /*
      9. Set up for localhost:3000/about
    */
  } else if (req.url === "/about") {
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
    /*
      10. Set up for localhost:3000/anything-else
    */
    // no condition, any other URL extension
  } else {
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
}); // end of server

/* 
    4. Allow the server to begin listening for requests
*/
const PORT = 3000;

server.listen(PORT, () => {
  console.log(`Server is now listening on port ${PORT}`);
});

# Lesson 2C: Express Router

---

## What this lesson covers:

- How to separate functionality to multiple files
- How to connect your main server to your Router files
- What is `uuid`
- URL extensions `/api/v1/query`
- Sort methods

---

## Routing

As our Node applications are expanding, the codebase can become messy and difficult to navigate. Making your code more modular by giving each file a dedicated task will reduce the chances of a Single Point of Failure. A "Single Point of Failure" refers to a component within a system that, if it fails, can cause the entire system to malfunction or become unavailable. In this case, we will be creating a file dedicated to routing. Routing is when you map a URL request handler to an action. So far we've been mapping various URL extensions to actions that let us manage data on a server, one route for each CRUD operation. We'll be taking those URL routes to their own file in this lesson.

## Getting started

As usual, since we are creating a new project we should initialize with the following command:

<!-- 0a. Initialize the project -->

```
npm init -y
```

Install the necessary modules:

<!-- 0b. Install Express & Morgan -->

```
npm install express morgan
```

And we are going to install a module called `uuid` that will auto generate unique ID's for each item in our data

<!-- 0c. Install the uuid module -->

```
npm install uuid
```

## index.js

On **index.js**, the first thing to do is to import the proper modules:

1. Import express & Morgan, set up app variable
<!-- 1. Import express & Morgan, set up app variable -->

```js
const express = require("express");
const logger = require("morgan");
const app = express();
```

Next, we set up our middleware functionality:

2. Set up middleware
<!-- 2. Set up middleware -->

```js
// Can accept incoming JSON data
app.use(express.urlencoded({ extended: false }));
// Can send outgoing JSON data
app.use(express.json());
// logs requests and metadata
app.use(logger("dev"));
```

Next, we will be importing the router files. Instead of having `app.get()` repeatedly on the main server file, we will be writing large chunks of code in **./routes/filmRouter.js** so that there is a dedicated file to this functionality.

3. Import Router files
<!-- 3. Import Router files -->

```js
const filmRouter = require("./routes/filmRouter");
```

Since we are splitting up the routes, we should also split up the URL up as well:

4. Set up the URL routes to connect to each router
<!-- 4. Set up the URL routes to connect to each router -->

```js
// localhost:3000/api/film
app.use("/api/film", filmRouter);
```

This means that `localhost:3000/api/film` is what the URL will always begin with. any URL extensions that the router listens to will come after `localhost:3000/api/film`

Finally, let's set up the Port and have the server listen on port 3000:

5. Set up the port and begin listening
<!-- 5. Set up the port and begin listening -->

```js
const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}....`);
});
```

It's time to begin writing on **filmRouter.js**.

## filmRouter.js

Begin by importing the `express` and `uuid` modules, and setting up the `router` object:

6. Import express & uuid, set up router
<!-- 6. Import express & uuid, set up router -->

```js
const express = require("express");
const router = express.Router();
// Can generate a unique ID upon server startup
const { v4: uuidv4 } = require("uuid");
```

The router object will be exported at the end of this page, and is already imported on **index.js** from steps 3 & 4.

Next, let's set up our local data. Every time we run the server, the ID's will be auto generated using `uuidv4()`:

7. Create an array of your favorite films using uuidv4() for unique ID's
<!-- 7. Create an array of your favorite films using uuidv4() for unique ID's -->

```js
let filmArray = [
  {
    id: uuidv4(),
    name: "Guardians of the Galaxy",
    price: 300,
  },
  {
    id: uuidv4(),
    name: "Dr. Strange & the Multiverse of Madness",
    price: 75,
  },
  {
    id: uuidv4(),
    name: "Thor",
    price: 55,
  },
  {
    id: uuidv4(),
    name: "When You Finish Saving The World",
    price: 2,
  },
];
```

Next, we will write the first GET request so that we can see our data in Postman. We will also export the router so we can test this:

8. Handle GET requests to /v1/query
<!-- 8. Handle GET requests to /v1/query -->

```js
router.get("/v1/query" function (req, res) {
    // 8a. Respond with filmArray
    res.json({ message: "success", payload: filmArray });
}); // end of GET /v1/query

// 8. B) Export the router
/*
  8b. Export the router
*/
module.exports = router;
```

- Run the server by going to the terminal and using the command `node index.js`
- Use Postman to perform a GET request to `localhost:3000/api/film/v1/query`
- Once it works, cut the server off by pressing `ctrl + c` in the terminal

9. Handle POST requests to /v1/create-film
<!-- 9. Handle POST requests to /v1/create-film -->

```js
router.post("/v1/create-film", function (req, res) {
  // 9a. Store the body of the request
  const { newName, newPrice } = req.body;
  // the above line is the same as doing the following:
  // const newName = req.body.newName
  // const newPrice = req.body.newPrice

  // 9b. Build out a new film object
  let newFilm = {
    id: uuidv4(),
    name: newName,
    price: newPrice,
  };

  // 9c. Push the new object into the local array
  filmArray.push(newFilm);
  // 9d. Show the updated data to the user
  res.json({ message: "success", payload: filmArray });
}); // end of POST /v1/create-film
```

- Run the server by going to the terminal and using the command `node index.js`
- Use Postman to perform a POST request to `localhost:3000/api/film/v1/create-film`.
- - Change the Params tab to Body. In the Body tab.
- - Set the data to raw, and set text to JSON.
- - Make sure to use the property names that match the names being used to generate the new object, and fill the values with unique values. Here is an example of something you can send:

```js
{
    "newName": "Spider-Man",
    "newPrice": 355
}
```

- Once it works, cut the server off by pressing `ctrl + c` in the terminal

10. Handle PUT requests to /v1/update-by-id/:id
<!-- 10. Handle PUT requests to /v1/update-by-id/:id -->

```js
router.put("/v1/update-by-id/:id", function (req, res) {
  // 10a. Store the ID from the parameters of the URL
  const { id } = req.params;

  // 10b. Find the film you want to change
  let foundFilmIndex = filmArray.findIndex((item) => item.id === id);

  // 10c. Send a failure message if the film isn't found
  if (foundFilmIndex === -1) {
    res.status(404).json({ message: "failure", payload: "film not found" });
    // 10d. Target the found film, and change it based on the req.body
  } else {
    let foundFilmObj = filmArray[foundFilmIndex];
    let incomingObj = req.body;

    //merging two objects
    Object.assign(foundFilmObj, incomingObj);

    res.json({
      message: "success",
      payload: filmArray[foundFilmIndex],
    });
  }
}); // end of PUT request to /v1/update-by-id/:id
```

- Run the server by going to the terminal and using the command `node index.js`
- Use Postman to perform a PUT request to `localhost:3000/api/film/v1/update-by-id/:id`. Grab one of the unique ID's that was generated for a film of your choice
- - Change the Params tab to Body. In the Body tab.
- - Set the data to raw, and set text to JSON.
- Here is an example of the req.body:

```js
{
    "name": "Iron Man",
    "price": 3000
}
```

- Also test an ID that doesn't match the data, so you can see what a failure looks like.
- Once it works, cut the server off by pressing `ctrl + c` in the terminal

11. Handle DELETE requests to /v1/delete-film-by-id/:id
<!-- 11. Handle DELETE requests to /v1/delete-film-by-id/:id -->

```js
router.delete("/v1/delete-film-by-id/:id", function (req, res) {
  // 11a. Store the ID from the parameters of the URL
  const { id } = req.params;

  // 11b. Find the film you want to delete
  let foundFilmIndex = filmArray.findIndex((item) => item.id === id);

  // 11c. Send a failure message if the film isn't found
  if (foundFilmIndex === -1) {
    res.status(404).json({
      message: "failure",
      payload: "film not found",
    });
    // 11d. Target the found film, and splice it out of our data
  } else {
    let deletedFilm = filmArray.splice(foundFilmIndex, 1);

    res.json({
      message: "success",
      payload: deletedFilm,
    });
  }
}); // end of DELETE request to /v1/delete-film-by-id/:id
```

- Run the server by going to the terminal and using the command `node index.js`
- Use Postman to perform a DELETE request to `localhost:3000/api/film/v1/delete-film-by-id/:id` and make sure to grab an ID _after_ you have restarted the server. Also test an ID that doesn't match the data, so you can see what a failure looks like.
- Once it works, cut the server off by pressing `ctrl + c` in the terminal

## Sort Methods

We can apply a method of sorting our data using queries in the parameters of the URL (Postman will use a Parameters tab as a helpful redundancy).

12. Create sort method for the films
<!-- 12. Create sort method for the films -->

```js
function sortMethodAsc(data, sortOrder, sortBy) {
  let result;

  if (sortOrder === "asc") {
    result = data.sort((a, b) => {
      return a[sortBy] < b[sortBy] ? -1 : 1;
    });
  } else {
    result = data.sort((a, b) => {
      return b[sortBy] < a[sortBy] ? -1 : 1;
    });
  }

  return result;
}
```

The `sort()` method will be plugged into our GET method, when we decide to make a GET request and get the entire films array it will sort this data for us.

- If our query looks like `query?sortOrder=asc`, it will sort the films from A - Z.
- If our query looks like `query?sortOrder=desc`, it will sort the films from Z - A
- If our query looks like `query?sortOrder=asc&sortBy=price`, it will sort the films from 0 - 300
- If our query looks like `query?sortOrder=desc&sortBy=price`, it will sort the films from 300 - 0

This will make queries much simpler, once we go back into `router.get("/v1/query", ...)` and apply this, it makes it such that the front-end of an application simply needs to change the URL of the request based on some sort of form with check boxes and/or a drop down menu. This is what this looks like:

```js
router.get("/v1/query", function (req, res) {
  // 13a. Gather a sortBy and/or sortOrder query
  const { sortBy, sortOrder } = req.query;

  // 13b. Check for queries
  let queryKeys = Object.keys(req.query);

  // 13c. If there are queries, sort. Otherwise, return payload
  if (queryKeys.length > 0) {
    // 13d. Check which kind of query

    // ?sortBy=name or ?sortBy=price
    let sortByQuery = sortBy === "name" ? "name" : "price";

    // ?sortOrder=asc or ?sortOrder=desc
    let sortOrderQuery = sortOrder === "asc" ? "asc" : "desc";

    let sorted = sortMethodAsc(filmArray, sortOrderQuery, sortByQuery);

    res.json({ message: "success", payload: sorted });
  } else {
    // 8a. Respond with filmArray
    res.json({ message: "success", payload: filmArray });
  } // end of 13c.
}); // end of GET /v1/query
```

- Run the server by going to the terminal and using the command `node index.js`
- Use Postman to perform a GET request to `localhost:3000/api/film/v1/query?sortOrder=asc&sortBy=name`. Take note of the order of the films.
- Use Postman to perform a GET request to `localhost:3000/api/film/v1/query?sortOrder=desc&sortBy=name`. Take note of the order of the films.
- Use Postman to perform a GET request to `localhost:3000/api/film/v1/query?sortOrder=asc&sortBy=price`. Take note of the order of the films.
- Use Postman to perform a GET request to `localhost:3000/api/film/v1/query?sortOrder=desc&sortBy=price`. Take note of the order of the films.
- Once it works, cut the server off by pressing `ctrl + c` in the terminal

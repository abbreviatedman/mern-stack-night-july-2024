# Lesson 2E: Simple Movie App

---

## What this lesson covers:

- Practice using a Router file
- Axios module
- View engine

---

![Full App](https://i.imgur.com/8MbwsJW.png)

## Lesson Objective

By the end of this lesson, we will have a functioning application that searches an API with movie data, and renders a list of HTML elements that are populated with data from the API.

## Getting started

As usual, since we are creating a new project we should initialize with the following command:

<!-- 0a. Initialize the project -->

```
npm init -y
```

Install the necessary modules:

<!-- 0b. Install Modules -->

```
npm install express morgan axios ejs uuid
```

For this lesson, we will only edit the following files:

- index.js
- routes/indexRouter.js
- public/stylesheets/style.css

## index.js

Writing the base server file should become more and more familiar. There are still things to learn, so let's go through this step by step.

1. Import Express, Morgan, and Path. Set up app variable.
<!-- 1. Import Express, Morgan, Path, and set up app variable -->

```js
const express = require("express");
const app = express();
const logger = require("morgan");
const path = require("path");
```

In this project, we will get an opportunity to practice some CSS. In order for HTML to interact with CSS, we will use the Path module to allow the directories to communicate with each other, regardless of what machine the application lives on:

2. Set up middleware
<!-- 2. Set up middleware -->

```js
// view engine setup
app.set("view engine", "ejs");
// set the "views" of the application to use the views folder
app.set("views", path.join(__dirname, "views"));
// allows local CSS to be targeted
app.use(express.static(path.join(__dirname, "public")));

// middleware for JSON testing
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(logger("dev"));
```

3. Set up the port and begin listening
<!-- 3. Set up the port and begin listening -->

```js
const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}....`);
});
```

- Open your terminal. Use command `node index.js`.
- If you get the message `Server is listening on port 3000....` this means that the server can run.
- Shut the server down with _`ctrl + c`_.

Next, we will import the router. The commented out line is so that you can test the working version of the application. Only one of these lines should be un-commented BEFORE starting up the server.

4. Import the Router file
<!-- 4. Import Router files -->

```js
const indexRouter = require("./routes/indexRouter");
// const indexRouter = require("./routes/FINAL-Router");
```

5. Set up the URL routes to connect to the router
<!-- 5. Set up the URL routes to connect to the router -->

```js
app.use("/", indexRouter);
```

Now that the base server is set up, let's begin writing the **`indexRouter.js`** that we just imported.

## ./routes/indexRouter

6. Import Express and axios. Set up Router variable
<!-- 6. Import Express and axios. Set up Router variable -->

```js
const express = require("express");
const axios = require("axios");
const router = express.Router();
```

On the **`index.js`** file, you normally use `const app = express()` in order to use things like the GET method. When it exists on a different file, `const router = express.Router()` is used instead. This will still allow you to do things like `router.get()`, `router.post()` etc.

Before we set up the homepage, let's take a look at **`./views/home.ejs`**

Any line (for example, line 54) that is in between these characters `<% { %>` is a form of Javascript that is injected into the HTML. Don't worry too much about the ejs templating format, just understand that some of these elements are displaying on the condition that data is returned with this file.

- If there is no data, only the title and the form are displayed.
- If there is data, various elements are rendered and populated with data from the API call

When we arrive to the homepage by going to `localhost:3000/`, there should be no data. We will render the homepage without it:

7. Set up homepage, respond with no data yet.
<!-- 7. Set up homepage, respond with no data yet. -->

```js
router.get("/", function (req, res) {
  // "home" refers to "./views/home.ejs"
  res.render("home", { data: [], searchQuery: "" });
});
```

Next, export the router and test that the homepage exists:

8. Export the router
<!-- 8. Export the router -->

```js
module.exports = router;
```

- Use command `node index.js` in the terminal
- Go to `localhost:3000/` in the browser. If you see the title and the search form, it's working. There should be no functionality just yet.
- Shut the server down with _`ctrl + c`_.

Finally, we're going to set up an axios call to search the `themoviedb` API, and populate the homepage with the results. There are the key things that are already set up with **`./views/home.ejs`**, here's what you need to know:

- The form is set up to perform a GET method to `localhost:3000/search-movie` and include a query that comes from the text input field. The request object will receive it on this file as `req.query.search`
- We will be sending an axios call to `https://api.themoviedb.org/3/search/multi?api_key=a4cae43902da506229d8148bcfc7364c&language=en-US&query=${query}`
- If the search provides no results, then we will set `searchQuery` to "No movies were found!" when we render the home page
- Else, we will set `data` to the results of the query and set `searchQuery` to what we searched when we render the home page

Here is what that looks like:

9. Set up a response to using the search form
<!-- 9. Set up a response to using the search form -->

```js
router.get("/search-movie", async (req, res) => {
  let query = req.query.search;

  try {
    let payload = await axios(
      `https://api.themoviedb.org/3/search/movie?api_key=a4cae43902da506229d8148bcfc7364c&language=en-US&query=${query}`
    );

    // console.log(payload.data.results[0]);

    if (payload.data.results.length === 0) {
      res.render("home", { data: [], searchQuery: "No movies were found!" });
    } else {
      res.render("home", { data: payload.data.results, searchQuery: query });
    }
  } catch (e) {
    console.log(e);
  }
});
```

When the await keyword is applied, it suspends the calling method and yields control back to its caller until the awaited task is complete.

- Use command `node index.js` in the terminal
- Go to `localhost:3000/` in the browser. In the search form, input the name of a movie, or part of the name. If a list of movies is populated to the page, it works!
- If you search gibberish and "No movies were found!" comes up, it also works!
- Shut the server down with _`ctrl + c`_.

# 2E. EJS

---

## What this topic covers

- What is EJS
- Partials
- Javascript Injections
- Conditional Rendering
- Looping over elements

## EJS

EJS (Embedded JavaScript) is one of the most popular template engines for Javascript. As the name suggests, it lets us embed JavaScript code in a template language that is then used to generate HTML.

Until we get to creating React applications on the front-end and attaching it to the rest of our back-end, this is what we will use to serve front-end files to a user.

## Getting Started

Let's get started by installing the necessary modules for today's project. You are given some starter files with a _**package.json**_, so use the following command:

0. Install the necessary modules
<!-- 0. Install the necessary modules -->

```
npm install
```

- Use command `node index.js` in terminal to test the server
- The terminal should show "Server is listening on port 3000....
- Shut the server off using `ctrl + c`

Now let's head to **./routes/indexRouter** and begin writing on that file.

Currently this should be the only thing on that file:

```js
const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("homepage");
});

module.exports = router;
```

- Use command `node index.js` in terminal to test the server
- Use the browser to navigate to `localhost:3000/`. The browser should show the text "homepage"
- Shut the server off using `ctrl + c`

Now that we have the response working, let's begin writing in our **./views/home.ejs** file and test our ability to see it in the browser.

1. Create a basic webpage
<!-- 1. Create a basic webpage -->

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <title>Our first EJS!</title>
    <meta name="description" content="" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />

    <link rel="stylesheet" href="/stylesheets/style.css" />
  </head>
  <body>
    <img src="/noble.jpg" />
    <h1>Noble Desktop</h1>
    <ul>
      <li><a href="/">Home</a></li>
      <li><a href="/teachers">Teachers</a></li>
      <li><a href="/students">Students</a></li>
    </ul>
    <h3>
      Best tech education class in the world. Sign up now to further your
      education!
    </h3>
  </body>
</html>
```

Head back into **./routes/indexRouter.js** and render the "home" file:

2. Render the Home file
<!-- 2. Render the Home file -->

```js
router.get("/", (req, res) => {
  // res.send("homepage");

  // 2. Render the Home file
  res.render("home");
});
```

- Use command `node index.js` in terminal to test the server
- Use the browser to navigate to `localhost:3000/`. The browser should show the beginnings of a web page!
- Shut the server off using `ctrl + c`

Now that we have our home page rendering, let's start separating parts of our HTML to make it easier to work with!

## Partials

Partials are views that are designed to be used from within other views. They are useful for reusing the same views, layouts, and even other partials. For example, we can move the Nav bar out of our **./views/home.ejs** file, and create a new file in the partials folder to re-use it on multiple web pages.

3. Move the Nav bar into a Partial

4. A) Create a file called **navbar.ejs** inside of the **./views/partials** folder
5. B) Cut out the following section from **./views/home.ejs**:

```html
<img src="/noble.jpg" />
<h1>Noble Desktop</h1>
<ul>
  <li><a href="/">Home</a></li>
  <li><a href="/teachers">Teachers</a></li>
  <li><a href="/students">Students</a></li>
</ul>
```

3. C) Paste it directly into the **./views/partials/navbar.ejs** file

Now we need to import it back. The syntax for partials looks like this:

```js
<%- include("FILE PATH HERE") %>
```

When using EJS syntax, you will use a different character after the first opening EJS tag

- `-` when importing partials like this: `<%- include("FILE PATH HERE") %>`
- `=` when placing variables like this: `<%= name %>`
- None needed when performing JS operations like this: `<% if(true) {} %>`

With this knowledge, let's go back to our **./views/home.ejs** and import it where it was before:

3. D) Where the nav bar was removed, import the partial
<!-- 3. D) Where the nav bar was removed, import the partial -->

```js
<%- include("./partials/navbar") %>
```

- Use command `node index.js` in terminal to test the server
- Use the browser to navigate to `localhost:3000/`. The browser should show the same webpage
- Shut the server off using `ctrl + c`

We can take this further and move the `<head></head>` tag in another file as well.

4. Move the head tag into a Partial

5. A) Create a file called **head.ejs** inside of the **./views/partials** folder
6. B) Cut out the following section from **./views/home.ejs**:

```html
<head>
  <meta charset="utf-8" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <title>Our first EJS!</title>
  <meta name="description" content="" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <link rel="stylesheet" href="/stylesheets/style.css" />
</head>
```

4. C) Paste it directly into the **./views/partials/navbar.ejs** file

5. D) Where the head tag was removed, import the partial
<!-- 4. D) Where the head tag was removed, import the partial -->

```js
<%- include("./partials/head") %>
```

## Javascript Injections

EJS allows you to render the page with data that comes from the server, and inject it directly into the HTML. Head back into **./routes/indexRouter** and render the homepage with data:

5. A) Render the Home file with data
<!-- 5. A) Render the Home file with data -->

```js
router.get("/", (req, res) => {
  // res.send("homepage");

  // 2. Render the Home file
  // res.render("home");

  // 5. A) Render the Home file with data
  res.render("home", { name: "Colin Jaffe" });
});
```

Head back to **./views/home.ejs** and inject this value onto our home page:

5. B) Inject the data onto the home page

```html
<h2>Welcome <%=name%>!</h2>

<h3>
  Best tech education class in the world. Sign up now to further your education!
</h3>
```

- Use command `node index.js` in terminal to test the server
- Use the browser to navigate to `localhost:3000/`. The browser should show the injected value from the server
- Shut the server off using `ctrl + c`

Now that we understand basic data injections, let's cover what happens when you try an `if(){}` statement with EJS:

## Conditional Rendering

Conditional rendering is when you only render elements onto a page if the injected data meets a certain condition.

- IF certain data exists on the page, the elements will render
- ELSE, the elements will remain hidden

Let's take a look at a small example:

6. A) Try using an if statement using EJS syntax
<!-- 6. A) Try using an if statement using EJS syntax -->

```html
<% if (3 > 4) { %>
<h2>Welcome <%=name%>!</h2>
<% } %>
```

The element will no longer render under these conditions. You can even inspect the page in your web browser, the elements don't even reach the DOM. If you change the condition to evaluate to true, the element will render!

Here's an example of how log in sessions might work. Edit your **indexRouter.js** to render the home page like this:

6. B) Update your **indexRouter.js** file
<!-- 6. B) Update your **indexRouter.js** file -->

```js
res.render("home", { name: "Colin Jaffe", loggedIn: true });
```

Now head to the nav bar and include some conditional rendering:

6. C) Edit your **navbar.ejs** file
<!-- 6. C) Edit your **navbar.ejs** file -->

```html
<% if(loggedIn) { %>
<h2>Welcome to the homepage <%=name%> !</h2>
<% } else { %>
<button>Log in</button>
<% } %>
```

## Looping over elements

This is another form of conditional rendering. We just saw how using `if()` statements can affect our ability to render elements. Now let's take a look at how we can render elements using `for()` loops!

Go to your **home.ejs** file to edit the following:

7. Try using a for loop using EJS syntax
<!-- 7. Try using a for loop using EJS syntax -->

```js
<% for(let i = 0; i < 4; i++) { %>
    <h3>
        Best tech education class in the world. Sign up now to further your education!
    </h3>
<% } %>
```

Now that we have a handle on using JavaScript directly on the HTML page, let's build out other pages on our website for practice.

8. Build out **./views/teachers.ejs**

9. A) on **indexRouter.js**, include the following data:

```js
const teachersArr = [
  {
    name: "Brian McClain",
    origin: "Unknown",
    age: "Unknown",
    leadingClass: false,
  },
  {
    name: "Colin Jaffe",
    origin: "Earth",
    age: 44,
    leadingClass: true,
  },
];
```

8. B) Set up a response to the URL extension `localhost:3000/teachers`. Remember to send in the `teachersArr` variable so that we can manage the data later
<!-- 8. B) Set up a response to the URL extension `localhost:3000/teachers` -->

```js
router.get("/teachers", (req, res) => {
  res.render("teachers", {
    teachers: teachersArr,
    name: "Colin Jaffe",
    loggedIn: true,
  });
});
```

8. C) Create **./views/teachers.ejs** and write on that file:
<!-- 8. C) Create **./views/teachers.ejs** and write on that file: -->

```html
<!DOCTYPE html>
<html lang="en">
  <%- include("./partials/head") %>
  <body>
    <%- include("./partials/navbar") %>
  </body>
</html>
```

Note that this file is very slim, thanks to our partials.

- Use command `node index.js` in terminal to test the server
- Use the browser to navigate to `localhost:3000/`. Use the navbar to navigate between the Home page and the Teachers page
- Shut the server off using `ctrl + c`

Now that we've tested that the page works, let's begin rendering new elements and populating it with data.

9. A) Use a `forEach()` function to loop over the array elements and render some elements
<!-- 9. A) Use a `forEach()` function to loop over the array elements and render some elements -->

```html
<% teachers.forEach((teacher)=> { %>
<div class="teachCard">
  <h3><%=teacher.name%></h3>
  <p>Origin: <%=teacher.origin%></p>
  <p>Age: <%=teacher.age%></p>
</div>
<% }) %>
```

Now let's take advantage of conditional rendering to change up the style a bit

9. B) Use an `if()` statement to change the style of the teacher cards:
<!-- 9. B) Use an `if()` statement to change the style of the teacher cards: -->

```html
<% teachers.forEach((teacher)=> { %> <% if(teacher.leadingClass) { %>
<div class="teachCard greenBackground">
  <% } else { %>
  <div class="teachCard redBackground">
    <% } %>
    <h3><%=teacher.name%></h3>
  </div>
</div>
```

Make sure you don't have an extra closing tag on the div, there are 2 opening divs seen here because the class names are the only things within the `if/else` statement.

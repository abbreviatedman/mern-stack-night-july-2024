# Fullstack Web Development

---

## Overview:

- Intro
- MERN-stack
- Node
- Express
- MongoDB
- React

---

## Intro

In this course, you’ll learn how to use JavaScript to program memorable, interactive webpages. You’ll also use the MERN tech stack (`M`ongoDB, `E`xpress.js, `R`eact, and `N`ode.js) to add databases, create APIs, manage server environments, and apply interactivity for those web applications. The Full-Stack Web Development Certificate provides students with a robust programming education that can help them break into the in-demand world of web development, software engineering, and computer science.

This is a project-oriented course that teaches students how to code a website from scratch. By the end of the course, you’ll have developed a portfolio of working web applications that you can take with you onto the job market.

## MERN-stack

![MERN-stack Diagram](https://i.imgur.com/K1Qk4IW.png)

Here is a diagram showing the general order of events that occurs as someone uses a MERN application. A Client (any user on your app) will be interacting with the front-end of the application, which will be built in React. Any action that a user takes that requires interacting with data in your app will be sent to the server, built in Node. The Express module will then route the request to interact with the database. Once it returns from the database with the request, Express will route the request back out of the server. React will then capture this response, and display it to the client.

Think of this like application like a service, such as a restaurant. You "log in" by requesting a table, the seating area and the menu are parts of the front-end. The server handles your requests, after you've selected something from the menu. The server routes the request to the chefs (the Express module). The chefs grab the ingredients they need (the data in the database), cook/prepare it, and package it in a way that's easy for the user. They hand the plates back to the server, who return with the requested food.

Next are the parts of the application that will be covered in this course.

## Node

Node.js is a running environment that allows you to run JavaScript locally on your computer, usually as a server. In this course, it will be used in 2 instances at once. One instance will be the front-end, running React code and actively listening for users to visit the website via a URL address. Another instance will be connected to the database, and manage requests hidden away from the users. The second instance is what we begin the course with.

## Express

Express is the bread-and-butter module used in Node. HTTP requests and database requests are complex, and Express streamlines the amount of code you have to write to automate responses to requests. However, this course begins with the basic under-the-hood functionality so that you understand how many actions are taken by such a small amount of code.

## MongoDB

MongoDB is a Database manager that allows you to connect your data set to your application and manage it through other languages. In this case, we will write MongoDB requests in JavaScript using a module called Mongoose. Data is unsafe to be kept on a server where users can potentially reach and alter it, and a Database allows you to to keep the data protected. You will also be using a local software application called Compass to manage the data and troubleshoot as you learn how to use MongoDB. A web application called Atlas will be used in the browser to manage certain administrator settings.

## React

React is the front-end of the application that is a combination of HTML and JavaScript in order to make interactive applications and give the users a smooth experience. Before taking this course, you may have learned about how to manage the DOM using JavaScript on the front-end. React makes this easy to manage, and uses modular pieces of code called Components that can be easily plugged into your application. A nav bar, a search bar, a login form, and loading screens are all examples of a component.

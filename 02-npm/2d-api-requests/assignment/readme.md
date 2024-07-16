# Lesson 2D: One-Pager Assignment

---

## What this lab covers:

- Create a server using express
- Use a router to handle all URL requests
- Use keywords `async` & `await` to perform a GET request to an API of your choosing
- Use a `try-catch` statement to safely perform the GET request via `axios`
- Render the data you get back onto an EJS file

---

![One-pager](https://i.imgur.com/GFJ3A1I.png)

It's time to create a One-page application! We're going to combine the skills we learned in this unit to create a simple application. We haven't arrived at the part of the course that covers MongoDB, so instead of using our own data we will use a free API available to the public. You can browse for one here: https://github.com/public-apis/public-apis

The idea here is to make a GET request to the API, and attach the data to the front-end of the application in a way that is useful or entertaining. In this folder, I've included an example where if you access `localhost:3000/villagers`, it returns a list of villagers from the video game series Animal Crossing (remember to use `npm install` to get the necessary modules before trying to run the server). Another example of a one-page application can be found here: https://shiny-pokemon-app.onrender.com/ . In the Shiny Pokemon app, you type in the name of a pokemon, and what is returned is an image of the shiny version of that pokemon (Here is a link to the API: https://pokeapi.co/ ) . Here are some other ideas:

- An application that displays the status of the trains at a certain location (for example, here is the API endpoint for the metro in Lisbon, Portugal: https://app.metrolisboa.pt/status/getLinhas.php )
- An application with a search bar, that returns data based on the search (see Shiny Pokemon app, 02.05.Simple-Movie-App, etc)
- An application that displays a list of characters and useful/entertaining information related to these characters (Any video game/TV show/Movie that has a free API available)

The application doesn't need to be complex, impressive, or super stylish. As long as you get the data from point A (the API) to point B (the server) to point C (the client), and practiced all of the skills listed at the top, then you've completed this lab!

# Extending The Fullstack Database Lab

The best way to extend this project is to add films. Our data doesn't have _all_ the MCU films, by any means, but it _does_ have a few, and we can create some meaningful interface views from it.

Here are your general steps.

### Create Film Data

- Using VS Code, create a `films.json` file (probably in `/models`), with `name` and `year` fields manually entered from your characters collection. This shouldn't take _too_ long… but it won't be fast, either.
- Create a `films` collection with Compass and import the `films.json` file.

### Create A Films Api Endpoint

Following the lead of the characters, create a controller and route on the back end to fetch all films.

### Create A Films Page

On the front end:

- Create a component for listing all films.
- Create a Route and Link in App.js for viewing all films.

### Create A Film API Endpoint

Following the lead of the one character endpoint, create a controller and route on the back end to fetch one film with a given _name_.

### Create A Film Page

On the front end:

- Create a component for showing the details of one film.
- Make each film in the film list into a link for that particular film.

### Put Debuts On Each Film Page

Each film page should show the characters who debuted in that film. You'll have to:

- Edit the one-film endpoint to also fetch all characters whose `debutFilm` field matches the film's name.
- Attach that array of characters to the object you convert to JSON and send back to the client.
- Edit the front-end component for one film to display a list of characters debuting in the film.

Good luck!

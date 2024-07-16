# Routing and API Exercise

![Exercise Preview](./routing-and-api-exercise-preview.png)

## Exercise overview

In this exercise we will be a space mission website that will inform astronauts the details of their next mission. The site will also access NASA API to get images from the Mars rover. If you would like to learn more about the API we are using you can visit the website at: [https://api.nasa.gov/](https://api.nasa.gov/).

## Set up a new Create-React-App project

1. Open VS code and then open your terminal from the menus at the top of the screen under `View > Terminal` or use the shortcut key **Ctrl+`**.

2. In Terminal type `npx create-react-app space-mission`. Wait while a new project is setup... It will display "Happy hacking!" when it's done.

3. In Terminal type `cd space-mission` to enter the project folder.

## Install Bootstrap

4. Next let's import Bootstrap a front-end framework that provides CSS code to make our project beautiful. In terminal type `npm i bootstrap@5.2.3`. This will install the package into our project.

## Install React Router DOM & axios

5. Import React Router DOM. In terminal type `npm i react-router-dom axios`. This will install the packages into our project.

## Start Node Test Server

6. In terminal type `npm start` to start a node test server this should open a new tab in your browser to **localhost:3000**.

## Import Bootstrap

7. Then in VS Code, open the **/src/index.js** file and import the bootstrap css like by typing the following line `import 'bootstrap/dist/css/bootstrap.css';` placing it just after the import for ReactDOM and just before our import for **Index.css**.

## Import BrowserRouter

8. On **index.js** import the Browser Router by typing the following line `import { BrowserRouter } from 'react-router-dom';` placing it just after the import for **App.js**. Then, wrap the App component in `<BrowserRouter></BrowserRouter>` tags.

## Exercise Assets

9. Move the image files from the _/assets_ folder outside the create-react-app project folder into the create-react-app folder _/public/_ this way the images will be accessible to your application. Also move the components folder and hooks folders into the `src` folder.

## Creating the App Component

10. Open **/src/App.js**. This file is an example component that create-react-app starts with. You can delete everything in this file. Then at the top of the file you can type the command `ffc` and press **Tab** to create the boiler plate code for a functional component. When the code appears start typing the class name `App`. It should fill in the for both the function name as well as in the default export command.

## Adding custom CSS

11. At the top of file after the React import add `import './App.css';`.

12. Open **/src/App.css** and delete all the code there and replace with the following CSS:

```css
body {
  margin: 30px;
  color: white;
  background: black;
}

nav {
  text-align: right;
}

a {
  display: inline-block;
  color: aqua;
}

a:hover {
  color: yellow;
  text-decoration: underline;
}

nav a {
  padding: 10px 20px;
}

h1,
h2,
h3 {
  margin-top: 15px;
}

th,
td {
  color: white;
}
```

13. Back in **/src/App.js**, at the top of the file below the React import we want to import the Router, and Route.

```javascript
import { Routes, Route } from "react-router-dom";
```

14. In the `return()` statement return the following JSX code:

```jsx
<div className="container">
  <div className="row">
    {/* Header goes here... */}
    {/* Navbar goes here... */}
  </div>
  <div className="row">
    <Routes>
      <Route path="/" element={<h1>Home</h1>} />
      <Route path="/mission" element={<h1>Mission</h1>} />
      <Route path="/gallery" element={<h1>Gallery</h1>} />
      <Route path="/contact" element={<h1>Contact</h1>} />
    </Routes>
  </div>
</div>
```

We have wrapped all other elements in the `<Routes>` element and inside we added `<Route>` elements.

## Create Header Component

Most of these other components will display static data so we will create them as static functional components.

15. From the File Explorer from the left side panel **right click** on the **/src/** folder and select **New File**. Name the file `Header.js`.

16. Open the **/src/Header.js** file and use the shortcut command `ffc` to create the basic functional component scaffolding. Name the function `Header`.

17. At the top of the file import the Link component.

```javascript
import { Link } from "react-router-dom";
```

18. Fill the empty `return ( )` with the following elements:

```jsx
<header className="col-md-6">
  <h1>
    <Link to="/">Space Mission</Link>
  </h1>
</header>
```

The finished Header code should look like this:

```jsx
import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="col-md-6">
      <h1>
        <Link to="/">Space Mission</Link>
      </h1>
    </header>
  );
}

export default Header;
```

19. Save this file and head back to **/src/App.js** and after the React Router DOM import, include an import to the `Header` component.

```javascript
import Header from "./Header";
```

20. Then replace the comment `{/* Header will go here */}` with our static `<Header />` component.

## Create Navbar Component

21. From the File Explorer from the left side panel **right click** on the **/src/** folder and select **New File**. Name the file `Navbar.js`.

22. Open the **/src/Navbar.js** file and use the shortcut command `ffc` to create the basic functional component scaffolding. Name the function `Navbar`.

23. At the top of the file import the Link component.

```javascript
import { Link } from "react-router-dom";
```

24. Fill the empty `return ( )` with the following elements:

```jsx
<nav className="col-md-6">
  <Link to="/mission">Mission</Link>
  <Link to="/gallery">Gallery</Link>
  <Link to="/contact">Contact</Link>
</nav>
```

The finished Navbar code should look like this:

```jsx
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="col-md-6">
      <Link to="/mission">Mission</Link>
      <Link to="/gallery">Gallery</Link>
      <Link to="/contact">Contact</Link>
    </nav>
  );
}

export default Navbar;
```

25. Save this file and head back to **/src/App.js** and after the React Router DOM import, include an import to the `Navbar` component.

```javascript
import Navbar from "./Navbar";
```

26. Then replace the comment `{/* Navbar will go here */}` with our `<Navbar />` component.

## Create Home Component

27. From the File Explorer from the left side panel **right click** on the **/src/** folder and select **New File**. Name the file `Home.js`.

28. Open the **/src/Home.js** file and use the shortcut command `ffc` to create the basic functional component scaffolding. Name the function `Home`.

29. Fill the empty `return ( )` with the following elements:

```jsx
<div className="col-12">
  <h2>Welcome Astronauts</h2>
  <img src="./mars.jpg" alt="Mars" className="img-fluid" />
  <h3>About</h3>
  <p>
    You will use this site to brief yourself on upcoming space missions. For
    more information visit the official{" "}
    <a href="https://mars.nasa.gov/mars2020/" target="_blank" rel="noreferrer">
      Mars Perseverance Mission Site
    </a>
  </p>
  <p>
    We’ve been driving on Mars since 1997, beginning with the 83 sol Sojourner
    rover mission. Since 2003 with the arrival of the Spirit and Opportunity
    rovers, followed by the Curiosity rover in 2012 and Perseverance rover in
    2021 we have been continuously exploring the surface of Mars. The
    Perseverance mobility system was designed to enable faster and more precise
    autonomous driving than any prior mission. It has wheels optimized for
    rugged terrain, cameras with fast exposure times, wide navigation camera
    “Navcam” field of view, and a dedicated second computer and Field Gate
    Programmable Array “FPGA” for fast image processing. Visual Odometry, “VO”,
    tracks the motion of features in images as it is driving to provide accurate
    position estimates and measure slip. “Thinking-While-Driving” capability
    allows Perseverance to continuously drive while performing VO, generating a
    map of terrain geometry, and autonomously blending drive arcs and selecting
    a safe and efficient drive path.
  </p>
</div>
```

The finished Home code should look like this:

```jsx
function Home() {
  return (
    <div className="col-12">
      <h2>Welcome Astronauts</h2>
      <img src="./mars.jpg" alt="Mars" className="img-fluid" />
      <h3>About</h3>
      <p>
        You will use this site to brief yourself on upcoming space missions. For
        more information visit the official{" "}
        <a
          href="https://mars.nasa.gov/mars2020/"
          target="_blank"
          rel="noreferrer"
        >
          Mars Perseverance Mission Site
        </a>
      </p>
      <p>
        We’ve been driving on Mars since 1997, beginning with the 83 sol
        Sojourner rover mission. Since 2003 with the arrival of the Spirit and
        Opportunity rovers, followed by the Curiosity rover in 2012 and
        Perseverance rover in 2021 we have been continuously exploring the
        surface of Mars. The Perseverance mobility system was designed to enable
        faster and more precise autonomous driving than any prior mission. It
        has wheels optimized for rugged terrain, cameras with fast exposure
        times, wide navigation camera “Navcam” field of view, and a dedicated
        second computer and Field Gate Programmable Array “FPGA” for fast image
        processing. Visual Odometry, “VO”, tracks the motion of features in
        images as it is driving to provide accurate position estimates and
        measure slip. “Thinking-While-Driving” capability allows Perseverance to
        continuously drive while performing VO, generating a map of terrain
        geometry, and autonomously blending drive arcs and selecting a safe and
        efficient drive path.
      </p>
    </div>
  );
}

export default Home;
```

30. Save this file and head back to **/src/App.js** and after the React Router DOM import, include an import to the `Home` component.

```javascript
import Home from "./Home";
```

31. Then add `element={<Home />}` to the `<Route path="/" />` component.

## Create Mission Component

32. From the File Explorer from the left side panel **right click** on the **/src/** folder and select **New File**. Name the file `Mission.js`.

33. Open the **/src/Mission.js** file and use the shortcut command `ffc` to create the basic functional component scaffolding. Name the function `Mission`.

34. Fill the empty `return ( )` with the following elements:

```jsx
<div className="col-12">
  <h2>Mission</h2>
  <img src="./mars-mission.jpg" alt="Mars" className="img-fluid" />
  <h3>Key Details</h3>
  <p>
    Mission Name: Mars 2020
    <br />
    Rover Name: Perseverance
    <br />
    Main Job: Seek signs of ancient life and collect samples of rock and
    regolith (broken rock and soil) for possible return to Earth.
    <br />
    Launch: July 30, 2020
    <br />
    Landing: Feb. 18, 2021, Jezero Crater, Mars
    <br />
    Tech Demo: The Mars Helicopter completed its 30-day technology demonstration
    and is now in its new operations demo phase.
  </p>
  <h3>Issue</h3>
  <p>
    The Mars Rover's cameras went dark after a bright pulsing light was detected
    and now the cameras are no longer operating.
  </p>
  <h3>Mission Overview</h3>
  <p>
    Astronaut, your mission is as follows. You will be landing on Mars where you
    will locate the rover and download the images being stored on it's drive,
    you will be accompanied by Dr. Skeleton who will attempt to repair the
    cameras. You will protect and assist Dr. Skelton until he completes repairs
    and then return to the module 9 station for debriefing and to report your
    findings.
  </p>
</div>
```

The finished Mission code should look like this:

```jsx
function Mission() {
  return (
    <div className="col-12">
      <h2>Mission</h2>
      <img src="./mars-mission.jpg" alt="Mars" className="img-fluid" />
      <h3>Key Details</h3>
      <p>
        Mission Name: Mars 2020
        <br />
        Rover Name: Perseverance
        <br />
        Main Job: Seek signs of ancient life and collect samples of rock and
        regolith (broken rock and soil) for possible return to Earth.
        <br />
        Launch: July 30, 2020
        <br />
        Landing: Feb. 18, 2021, Jezero Crater, Mars
        <br />
        Tech Demo: The Mars Helicopter completed its 30-day technology
        demonstration and is now in its new operations demo phase.
      </p>
      <h3>Issue</h3>
      <p>
        The Mars Rover's cameras went dark after a bright pulsing light was
        detected and now the cameras are no longer operating.
      </p>
      <h3>Mission Overview</h3>
      <p>
        Astronaut, your mission is as follows. You will be landing on Mars where
        you will locate the rover and download the images being stored on it's
        drive, you will be accompanied by Dr. Skeleton who will attempt to
        repair the cameras. You will protect and assist Dr. Skelton until he
        completes repairs and then return to the module 9 station for debriefing
        and to report your findings.
      </p>
    </div>
  );
}

export default Mission;
```

35. Save this file and head back to **/src/App.js** and after the React Router DOM import, include an import to the `Mission` component.

```javascript
import Mission from "./Mission";
```

36. Then add `element={<Mission />}` to the `<Route path="/mission" />` component.

## Create Contact Component

37. From the File Explorer from the left side panel **right click** on the **/src/** folder and select **New File**. Name the file `Contact.js`.

38. Open the **/src/Contact.js** file and use the shortcut command `ffc` to create the basic functional component scaffolding. Name the function `Contact`.

39. Fill the empty `return ( )` with the following elements:

```jsx
<div className="col-12">
  <h2>Contact</h2>
  <img src="./team.jpg" alt="Mars" className="img-fluid" />
  <table className="table">
    <tbody>
      <tr>
        <th>Dr. Bennet Radlow</th>
        <td>Mars Mission Dept Head</td>
        <td>555-358-8346</td>
        <td>b.radlow@nasa.gov</td>
      </tr>
      <tr>
        <th>Dr. Janet Pickelow</th>
        <td>Astro Physicist</td>
        <td>555-276-9947</td>
        <td>j.pickelow@nasa.gov</td>
      </tr>
      <tr>
        <th>Dr. Susan Kent</th>
        <td>Head Robotics Engineer</td>
        <td>555-354-1285</td>
        <td>s.kent@nasa.gov</td>
      </tr>
      <tr>
        <th>Dr. Seth Skeleton</th>
        <td>Rover Engineer</td>
        <td>555-456-3467</td>
        <td>s.kent@nasa.gov</td>
      </tr>
    </tbody>
  </table>
</div>
```

The finished Contact code should look like this:

```jsx
function Contact() {
  return (
    <div className="col-12">
      <h2>Contact</h2>
      <img src="./team.jpg" alt="Mars" className="img-fluid" />
      <table className="table">
        <tbody>
          <tr>
            <th>Dr. Bennet Radlow</th>
            <td>Mars Mission Dept Head</td>
            <td>555-358-8346</td>
            <td>b.radlow@nasa.gov</td>
          </tr>
          <tr>
            <th>Dr. Janet Pickelow</th>
            <td>Astro Physicist</td>
            <td>555-276-9947</td>
            <td>j.pickelow@nasa.gov</td>
          </tr>
          <tr>
            <th>Dr. Susan Kent</th>
            <td>Head Robotics Engineer</td>
            <td>555-354-1285</td>
            <td>s.kent@nasa.gov</td>
          </tr>
          <tr>
            <th>Dr. Seth Skeleton</th>
            <td>Rover Engineer</td>
            <td>555-456-3467</td>
            <td>s.kent@nasa.gov</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default Contact;
```

40. Save this file and head back to **/src/App.js** and after the React Router DOM import, include an import to the `Contact` component.

```javascript
import Contact from "./Contact";
```

41. Then add `element={<Contact />}` to the `<Route path="/contact" />` component.

## Create Gallery Component

This will be a special component that will pull down images from the NASA API.

42. From the File Explorer from the left side panel **right click** on the **/src/** folder and select **New File**. Name the file `Gallery.js`.

43. Open the **/src/Gallery.js** file and use the shortcut command `ffc` to create the functional component scaffolding. Name the class `Gallery`.

44. Import and use `useEffect` to make an API call when the component renders, and import the loading screen:

```jsx
import React, { useEffect } from "react";
import Spinner from "./components/Spinner/Spinner";
```

Here we are creating some state to hold the photos when they are received from our API.

45. Fill the empty `render()` with the following JSX elements:

```jsx
<div className="col-12">
  <h2>Gallery</h2>
  <p>
    These are the last known images the Rover had taken before going offline.
  </p>
  <div className="row">{!loading && data ? "photo" : <Spinner />}</div>
</div>
```

Here we are checking the length of the photos array we hold in state. If it is empty then we will display our loading element `Spinner`. Otherwise for the time being we will just show some text that says Photo as a placeholder until we create our Photo component.

46. Next, import our custom hook `useAxios` and call it in a `useEffect`:

```javascript
import useAxios from "./hooks/useAxios";
// ...

const [setUrl, data, loading, setLoading] = useAxios();

useEffect(() => {
  setUrl(
    "https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&api_key=Lc6mCmy8pmn55pfWyTeOUCytfdZvsJsUqRhtowWL"
  );
  setLoading(false);
}, []);
```

Here we are fetching from the free public NASA API which will pull down recent images from the Mars rover. It will happen on component render because we are using an empty bracket in our `useEffect()`. After it gets the images, the turnary operator will be activated and render `'Photo'` instead of the `Spinner`.

The full Gallery code currently looks like this:

```jsx
import React, { useState, useEffect } from "react";
import Spinner from "./components/Spinner/Spinner";
import useAxios from "./hooks/useAxios";

function Gallery() {
  const [setUrl, data, loading, setLoading] = useAxios();

  useEffect(() => {
    setUrl(
      "https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&api_key=Lc6mCmy8pmn55pfWyTeOUCytfdZvsJsUqRhtowWL"
    );
    setLoading(false);
  }, []);

  return (
    <div className="col-12">
      <h2>Gallery</h2>
      <p>
        These are the last known images the Rover had taken before going
        offline.
      </p>
      <div className="row">{!loading && data ? "photo" : <Spinner />}</div>
    </div>
  );
}

export default Gallery;
```

47. Save this file and head back to **/src/App.js** and after the React Router DOM import, include an import to the `Gallery` component.

```javascript
import Gallery from "./Gallery";
```

48. Then add `element={<Gallery />}` to the `<Route path="/gallery" />` component.

## Create Photo Component

This will be a simple functional component to display an image for each photo inside our photos array within Gallery component.

49. From the File Explorer from the left side panel **right click** on the **/src/** folder and select **New File**. Name the file `Photo.js`.

50. Open the **/src/Photo.js** file and use the shortcut command `ffc` to create the basic functional component scaffolding. Name the function `Photo`.

51. Pass the prop object `data` into the function `function Photo(data) {`. This will make props accessible inside of our functional component.

52. Replace the empty `return()` the following elements:

```jsx
<div className="col-sm-2">
  <img src={data.photo.img_src} alt="Mars" className="img-fluid" />
  <small>{data.photo.earth_date}</small>
</div>
```

The finished Photo code should look like this:

```jsx
function Photo(data) {
  return (
    <div className="col-sm-2">
      <img src={data.photo.img_src} alt="Mars" className="img-fluid" />
      <small>{data.photo.earth_date}</small>
    </div>
  );
}

export default Photo;
```

53. Save this file and head back to **/src/Gallery.js** and after the React import, include an import to the `Photo` component.

```javascript
import Photo from "./Photo";
```

54. Then update the turnary operator in the `<div className="row">` with the following code.

```jsx
{
  !loading && data ? (
    data.photos.map((photo) => <Photo key={photo.id} photo={photo} />)
  ) : (
    <Spinner />
  );
}
```

Here we are first checking if the photos array is empty if it is not then we are using map to iterate over each phot in the photos array and display a `<Photo />` component for each. If the photos array is empty we instead display our JSX loading element instead.

Here is the finished Gallery code.

```jsx
import React, { useEffect } from "react";
import Spinner from "./components/Spinner/Spinner";
import useAxios from "./hooks/useAxios";
import Photo from "./Photo";

function Gallery() {
  const [setUrl, data, loading, setLoading, error] = useAxios();

  useEffect(() => {
    setUrl(
      "https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&api_key=Lc6mCmy8pmn55pfWyTeOUCytfdZvsJsUqRhtowWL"
    );
    setLoading(true);
  }, []);

  return (
    <div className="col-12">
      <h2>Gallery</h2>
      <p>
        These are the last known images the Rover had taken before going
        offline.
      </p>
      <div className="row">
        {!loading && data ? (
          data.photos.map((photo) => <Photo key={photo.id} photo={photo} />)
        ) : (
          <Spinner />
        )}
      </div>
    </div>
  );
}

export default Gallery;
```

## Completed App Code

Here is the completed App code:

```jsx
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "./Header";
import Navbar from "./Navbar";
import Home from "./Home";
import Mission from "./Mission";
import Contact from "./Contact";
import Gallery from "./Gallery";

function App() {
  return (
    <div className="container">
      <div className="row">
        <Header />
        <Navbar />
      </div>
      <div className="row">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/mission" element={<Mission />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
```

55. Save all files and check your work in teh browser. Each link should display the corresponding component for that page. the Gallery page should display the images form the NASA API.

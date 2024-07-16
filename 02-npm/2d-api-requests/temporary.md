# Lesson 2D: One-Pager Assignment

---

## What this lab covers:

- Create a server using express
- Use a router to handle all URL requests
- Use keywords `async` & `await` to perform a GET request to an API of your choosing
- Use a `try-catch` statement to safely perform the GET request via `axios`
- Make a simple route that returns a sub-section of the API data

ex. If the API URL is `https://api.chucknorris.io/jokes/random`, sending a request to `localhost:3000/` should return the `value` property from the object it's returning:

```js
{
    "categories": [],
    "created_at": "2020-01-05 13:42:19.324003",
    "icon_url": "https://assets.chucknorris.host/img/avatar/chuck-norris.png",
    "id": "sf-y9rI_Ts6AmOEnv8i9lA",
    "updated_at": "2020-01-05 13:42:19.324003",
    "url": "https://api.chucknorris.io/jokes/sf-y9rI_Ts6AmOEnv8i9lA",
    "value": "Chuck Norris can hit ctrl-alt-delete with one finger."
}
```

Make sure that you look at the `data` property from the value that is returned from the Axios call. Example:

```js
try {
  let results = await axios.get("https://api.chucknorris.io/jokes/random");

  res.json({
    message: "success",
    payload: results.data.value,
  });
} catch (error) {
  console.log(error);
}
```

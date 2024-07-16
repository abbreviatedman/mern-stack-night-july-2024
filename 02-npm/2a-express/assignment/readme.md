# Assignment 2A. Express

---

## Goals

- Create a server using the Express module
- Create an API that serves data based on the URL request

---

![Subway Map](https://i.imgur.com/z0fkkyE.jpg)

You are now an intern for the MTA! The MTA is having trouble sending information to subway riders about which stations are available for which trains. For your internship, they've asked you to create an API that will respond with the stations that are available. For this assignment, they only want you to focus on the following data:

```js
{
  "redLine": [
    {
      "train": ["1", "2", "3"],
      "station": "96th Street"
    },
    {
      "train": ["1"],
      "station": "86th Street"
    },
    {
      "train": ["1"],
      "station": "79th Street"
    },
    {
      "train": ["1", "2", "3"],
      "station": "72nd Street"
    },
    {
      "train": ["2", "3"],
      "station": "42nd Street - Times Square"
    },
    {
      "train": ["2", "3"],
      "station": "34th Street - Penn Station"
    },
    {
      "train": ["1"],
      "station": "28th Street"
    },
    {
      "train": ["1"],
      "station": "23rd Street"
    },
    {
      "train": ["1"],
      "station": "18th Street"
    },
    {
      "train": ["1"],
      "station": "14th Street"
    },
    {
      "train": ["1"],
      "station": "Christopher Street - Sheridan Square"
    },
    {
      "train": ["1"],
      "station": "Houston Street"
    },
    {
      "train": ["1"],
      "station": "Canal Street"
    },
    {
      "train": ["1"],
      "station": "Franklin Street"
    },
    {
      "train": ["1"],
      "station": "Chambers Street"
    },
    {
      "train": ["2", "3"],
      "station": "Chambers Street"
    },
    {
      "train": ["2", "3"],
      "station": "Fulton Street"
    },
    {
      "train": ["2", "3"],
      "station": "Wall Street"
    }
  ],
  "greenLine": [
    {
      "train": ["4", "5", "6"],
      "station": "59th Street - Columbus Circle"
    },
    {
      "train": ["6"],
      "station": "51st Street"
    },
    {
      "train": ["4", "5", "6"],
      "station": "Grand Central - 42nd Street"
    },
    {
      "train": ["6"],
      "station": "33rd Street"
    },
    {
      "train": ["6"],
      "station": "28th Street"
    },
    {
      "train": ["6"],
      "station": "23rd Street"
    },
    {
      "train": ["4", "5", "6"],
      "station": "14th Street - Union Square"
    },
    {
      "train": ["6"],
      "station": "Astor Place"
    },
    {
      "train": ["6"],
      "station": "Bleecker Street"
    },
    {
      "train": ["6"],
      "station": "Spring Street"
    },
    {
      "train": ["6"],
      "station": "Canal Street"
    },
    {
      "train": ["4", "5", "6"],
      "station": "Brooklyn Bridge - City Hall"
    }
  ]
}
```

For each of the following URL's, they want you respond accordingly:

- If the URL ends in `"/"`, they want you to send back the entire object.
- If the URL ends in `"/red"`, they want you to send back only the `redLine` property.
- If the URL ends in `"/green"`, they want you to send back only the `greenLine` property.
- If the URL ends in anything else, they want you to send back `"The MTA is currently working to complete this application soon. Thank you for your patience"`

## Bonus

You decided to impress the MTA with your work and take this API a step further. Here are your goals:

- If the URL ends in `"/1"`, you want to send back only the objects where `"1"` is in the `train` property
- If the URL ends in `"/2"`, you want to send back only the objects where `"2"` is in the `train` property
- If the URL ends in `"/3"`, you want to send back only the objects where `"3"` is in the `train` property
- If the URL ends in `"/4"`, you want to send back only the objects where `"4"` is in the `train` property
- If the URL ends in `"/5"`, you want to send back only the objects where `"5"` is in the `train` property
- If the URL ends in `"/6"`, you want to send back only the objects where `"6"` is in the `train` property

## Extra Bonus

You decided to prove that you're a real New Yorker, and that you know what's best for subway riders and how they ask for information. Here are your goals:

- If the URL ends in `"/local"`, you want to send back only the objects where `"1"` or `"6"` is in the `train` property
- If the URL ends in `"/express"`, you want to send back only the objects where `"2"`, `"3"`, `"4"` or `"5"` is in the `train` property

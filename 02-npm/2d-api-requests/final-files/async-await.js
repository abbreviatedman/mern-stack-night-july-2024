/*
    7. Example of an asynchronous function
*/

async function orderingMcDonalds() {
  // When you make an order, you get back a receipt. This is a promise that you will get your food when it's done
  let receipt = new Promise((resolve, reject) => {
    setTimeout(() => resolve("finished cooking your McDouble!"), 5000);
  });

  let myOrder = await receipt; // wait until the promise resolves (*)

  console.log(myOrder); // "done!"
}

// console.log("This is before ordering");
// orderingMcDonalds();
// console.log("This is after ordering");

/*
    8. Use `fetch()` and async-await to write an async function that makes an HTTP request
*/
async function fetchData() {
  let returnData = await fetch("https://whatthecommit.com/index.txt");
  let commitMessage = await returnData.text();

  console.log(commitMessage);
}

console.log("before");
fetchData();
console.log("after");

// AWS Lambda Example File
console.log("Loading function"); // You won't see this via Lambda

// This is equivalent to `module.exports.handler = ...`
export const handler = async (event, context) => {
  //console.log('Received event:', JSON.stringify(event, null, 2));
  console.log("value1 =", event.key1);
  console.log("value2 =", event.key2);
  console.log("value3 =", event.key3);
  return event; // Echo back the first key value
  // throw new Error('Something went wrong');
};

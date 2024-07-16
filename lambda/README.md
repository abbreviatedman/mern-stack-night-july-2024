# AWS Lambda: Serverless API

---

- [Intro](#intro)
- [Serverless Functions](#serverless-functions)
- [Test Events](#test-events)
- [Function URL](#function-url)
- [MongoDB](#mongodb)

---

## Intro

AWS Lambda is a serverless computing service provided by AWS. It allows you to run code without provisioning or managing servers. You simply upload your code, and Lambda automatically scales & manages the execution of your code. We will be wrapping our API server as a serverless function, and managing requests to our database using AWS Lambda.

Express servers aren't built to run on serverless, and the whole point of Lambda is that it's a serverless function, so we will have to make modifications to fit the Lambda format. We accomplish that by using a library called `serverless-http`.

Inside this folder, you'll find a file called `index.mjs` (no, this is not a typo). This is an example of the format AWS will be expecting of a Node.js function. The root of the application must export something called a `handler`, and this function is what runs when you perform an HTTP request to Lambda. We can export an entire server this way!

In your project directory, make sure to run the following command to install the proper library we need to export our server:

`npm install serverless-http`

The `package.json` file should already contain the modules we need, so in this lesson you can just use `npm install` to get everything we need.

Make sure to test first that this server works using command `node index.js` and making requests to `localhost:3001` && `localhost:3001/test`.

## Serverless Functions

Before deploying your app, select all of the files (except `index.mjs`)inside of your project directory and compress them into a `.zip` file (name it `app.zip`). Once you have it prepared, follow these steps to create your first serverless function:

1. Open the AWS Management Console and navigate to the Lambda service.

2. Click on the "Create Function` button

3. Choose "Author from scratch"

4. Give this function a name, any name

5. Configure the runtime to Node.js 18.x

6. Scroll to the bottom and click the "Create function" button.

7. On this next screen, scroll down and select the "Code" tab to see the source code. Click the "Upload from" file and select ".zip file" from the dropdown

8. Click "Upload" and select the `app.zip` file you created earlier.

### Test Events

1. Inside the Lambda function console, click on the dropdown for the "Test" button. Select "Configure test events" from the dropdown

2. In the "Event name" field, you can give this test any kind of name. The "Event JSON" section shows the body of the test request.

3. Click "Save" at the bottom.

4. After clicking the "Test" button now, a pretend request will be sent to this function, and a tab that says "Execution results" will show in the code editor. This will show the response to the request.

### Function URL

1. In the Lambda function console, go to the "Configuration" tab.

2. Go to the function URL in the side menu. Click "Create function URL".

3. Select None in the Auth Type and click "Save".

4. After that, you can get the function URL from the "Confguration" tab or in the Function Overview.

5. Take this URL to Postman and perform a GET request. Make sure to try `/test` as well, which shows that all routes will respond accordingly!

## MongoDB

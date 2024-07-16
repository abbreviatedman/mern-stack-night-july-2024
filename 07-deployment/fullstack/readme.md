# Deploying a Fullstack MERN App

The following will be instructions on how to deploy a Fullstack MERN app to Render's deployment service on `render.com`. This means deploying the back-end server as if it were an API, and deploying the front-end _separately_ to coordinate with the server.

Let's use everything in the `server` folder as the back-end. We'll also use everything in the `client` folder as the front-end.

## Getting Started

What you will need to get started is:

- A Github account
- A Render account that is connected to Github
- A local React application, ready to be uploaded

## Deploying the back-end server

**The following instructions assume that you have created an account on `Render.com`, linked your Github account, and understand how to upload & push new changes to your github repository**

0.5. CHANGE THE `.env` FILE TO CONNECT TO YOUR OWN DATABASE. THIS WILL BE A REFERENCE FOR LATER

1. Upload the all of contents of the `server` folder (EXCEPT `/node_modules`) to a github repository. For this example, it will be called "MCU-back-end"

2. Go to `Render.com` and sign in. Click the blue `New +` button next to your username.

3. Select **Web Service**

4. Select the github repository you just uploaded to ("MCU-back-end")

5. Give it a name that matches the repository

6. Region should be closest to you. US East and US West should be the main options you're looking at, depending on if you're closer to the East coast or West coast

7. Root directory should remain empty, UNLESS there is a single folder in your repository containing the project. The Root directory refers to the one that holds other folders such as `models` and `routes`. If those are the first folders you see in the repository, leave this empty by default.

8. Runtime should be set to `Node`

9. Build Command should be `npm install` so that the cloud installs the node modules on render's end

10. If you are using the provided project as an example, Start command should be `npm run start`. There is `nodemon` installed on this application, so you can see the script on `package.json` that says `"start": "nodemon index.js"`.

If you are using a different project, Start command should be `node index.js`

11. Select the "free" tier

12. Under "Advanced" options, you can input the Environment Variables. For example, the first variable should be your MongoDB connection string. The Key should be `MONGODB_URI` and the Value should be `mongodb+srv://<USERNAME>:<PASSWORD>@cluster0.<CLUSTER-CODE>.mongodb.net/fullstack-db` but with your personal credentials filled in.

You are also given the option to upload your `.env` file directly.

13. Click "Create Web Service" and wait for your project to build.

14. Once it's done, click on the "logs" tab on the left side of the "MCU-back-end" page. You should see in the logs that MongoDB failed to connect. This is because Render's web services are at a different IP address.

If you click on the white `Connect` drop down option next to the blue `Manual Deploy` button, select `Outbound`, you should see a list of potential IP addresses that Render will choose from.

15. Go to MongoDB Atlas, and sign in. On the left side, there should be a "Network Access" tab. Add the IP addresses that were listed from Render, and label each of these as "Render 1", "Render 2", etc.

16. Go back to Render, and click on the blue `Manual Deploy` button. Select `Deploy lastest commit`. This will also be what you do whenever you make changes to your code and push it to Github.

17. The logs should show "MongoDB Connected" this time, which means it works. Test it by making a GET request via Postman to `https://<YOUR-URL-HERE>.onrender.com/api/allCharacters` (you can get the base URL from Render, under the title of your web service). If your data comes back, congrats! You've successfully deployed the server for your application!

## Deploying the front-end/client-side

Now that the back-end is deployed and tested, let's deploy the front-end

18. Upload the all of contents of the `client` folder (EXCEPT `/node_modules`) to a github repository. For this example, it will be called "MCU-front-end"

19. Go to `Render.com` and sign in. Click the blue `New +` button next to your username.

20. Select **Static Site**

21. Select the github repository you just uploaded to ("MCU-front-end")

22. Give it a name that matches the repository

23. Region should be closest to you. US East and US West should be the main options you're looking at, depending on if you're closer to the East coast or West coast

24. Root directory should remain empty, UNLESS there is a single folder in your repository containing the project. The Root directory refers to the one that holds other folders such as `src` and `public`. If those are the first folders you see in the repository, leave this empty by default.

25. Build Command can be left as the default (`npm run build`)

26. Start command can be left as the default (`build`)

27. Select the "free" tier

28. Under "Advanced" options, you can input the Environment Variables. For example, the first variable should be your back-end URL. The Key should be `REACT_APP_API_URL` and the Value should be `https://<YOUR-URL-HERE>.onrender.com/api` but with your personal UR filled in. When it was tested locally, it was `http://localhost:3001/api` and can remain that way on your local file.

29. Click "Create Static Site" and wait for your project to build.

30. Once it's done, click on the provided link and test the functionality. If you ran into no errors, then CONGRATULATIONS! You've deployed your first Fullstack MERN application with full CRUD capabilities!

# Assignment 4C. Aaron's image board

---

## Objectives:

- Navigate a pre-built app
- Use `express-session` and `argon2` to create user logins & encrypted passwords

---

You are helping our client Aaron with his totally unique, never before seen image boards! He doesn't want everyone to post anonymously, some people should be able to register for the site and be the only ones who can choose their display name on each post. Here are what those features should be from the user's perspective:

# USER STORIES

- Users can register/sign up
- User can log in
- If logged in, user can specify a name when creating a thread or post
- if logged out, name is set to "anonymous" and cannot be changed
- - `vvv` BONUS `vvv`
- User can access a unique page (user portal) containing all posts done by the user
- If nobody is logged in, you cannot access the user portal. It should redirect you to the login page

We've also created a roadmap to help you remember each step of the way:

# ROADMAP

# BACK-END STUFF

1. Place your MongoDB URI & secret session key in your `.env` file.

2. On `userModel.js` - fill the schema with properties such as username, password, threadsInteractedWith, postsInteractedWith.

3. Install `argon2`.

4. Install `express-session`.

5. Import & add the session middleware to `index.js`.

6. Review the `models/authMiddleware.js` file - both of these functions will be used.

7. On `userController.js` create a `registerNewUser()` function.

8. On `userRouter.js` create a route for this function.

9. Plug the router into `index.js`.

**TEST THE BACK-END WORK BEFORE MOVING ON TO FRONT-END**

## CLIENT-SIDE STUFF

10. Add links to `partials/top-nav.ejs` for `/register`, `/login`, and `/logout`.

11. On `register.ejs` place a form that takes in a username & password. It should have `action="/user/registerNewUser"`.

12. On the `viewController.js` make a `renderRegisterPage()`.

13. On `viewRouter.js` create a route for this function.

14. Modify `userController > registerNewUser()` to redirect to the home page.

**TEST THE ABILITY TO REGISTER A NEW USER**

15. On `login.ejs` place a form that takes in a username & password. It should have `action="/user/login"`.

16. On the `viewController.js` make a `renderLoginPage()`.

17. On `viewRouter.js` make a route for this function.

18. Modify all functions on `viewController.js` to render each page with `user: req.session.userInfo`.

19. On `userController.js` make a `login()`. respond by redirecting to `/`.

20. On `userRouter.js` create a route for this function.

**TEST THE ABILITY TO LOG IN**

Once this works, let's implement our middleware and make some changes that gives a user/non-user different capabilities.

21. Modify all of `viewRouter.js` to apply `isLoggedIn()` to every route. This way, when each page loads, it understands whether or not a user is logged in.

22. Modify `top-nav.ejs` - If user is logged in, only show the logout link. Otherwise, show the register and login links.

23. Modify `catalog.ejs` - If logged in, make the placeholder & value the username. If logged out, use the original input.

24. Modify `singleThread.ejs` - If logged in, make the placeholder & value the username. If logged out, use the original input.

Now that the site has different access depending on being logged in/out, let's make a simple logout link work.

25. On `viewController.js` make a `logout()`. respond by redirecting to `/`.

26. On `viewRouter.js` create a route for this function.

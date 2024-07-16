const User = require("../models/userModel");
const argon2 = require("argon2");

async function createUser(req, res) {
  try {
    // temporarily hold password
    let userPassword = req.body.password;

    // encrypt password
    const sentPassword = await argon2.hash(userPassword);

    // generate new user document
    let newUser = {
      username: req.body.username,
      password: sentPassword,
    };

    // insert document into the database
    await User.create(newUser);

    res.json({
      message: "success",
      payload: newUser,
    });
  } catch (error) {
    let errorObj = {
      message: "create user failure",
      payload: error,
    };

    res.json(errorObj);
    console.log(errorObj);
  }
}

async function verifyPassword(req, res) {
  try {
    // hold username & password individually
    let incomingUsername = req.body.username;
    let incomingPassword = req.body.password;

    // find the target user
    let foundUser = await User.findOne({ username: incomingUsername });

    // compare passwords
    const isCorrectPassword = await argon2.verify(
      foundUser.password,
      incomingPassword
    );

    // respond based on password correctness
    if (isCorrectPassword) {
      req.session.userId = foundUser._id;

      res.redirect("/");
    } else {
      res.json({
        message: "verify password success",
        payload: "Please check your password and try again",
      });
    }
  } catch (error) {
    let errorObj = {
      message: "verify password failure",
      payload: error,
    };

    res.json(errorObj);
    console.log(errorObj);
  }
}

async function updatePassword(req, res) {
  try {
    // capture all necessary info
    const { username, oldPassword, newPassword } = req.body;

    // Target the correct user
    let foundUser = await User.findOne({ username: username });

    // Verify the original password is correct
    let isCorrectPassword = await argon2.verify(
      foundUser.password,
      oldPassword
    );

    // Double check that the new password isn't the same as the old one
    let isSamePassword = await argon2.verify(foundUser.password, newPassword);

    // respond accordingly
    if (isCorrectPassword && !isSamePassword) {
      const newSafePassword = await argon2.hash(newPassword);

      foundUser.password = newSafePassword;

      await foundUser.save();

      res.json({
        message: "update password success",
        payload: "Your password has been updated!",
      });
    } else if (isSamePassword) {
      res.json({
        message: "update password success",
        payload: "New password must be different from the old password",
      });
    } else {
      res.json({
        message: "update password success",
        payload:
          "Original password is incorrect, please check the spelling and try again",
      });
    }
  } catch (error) {
    let errorObj = {
      message: "update password failure",
      payload: error,
    };

    res.json(errorObj);
    console.log(errorObj);
  }
}

module.exports = {
  createUser,
  verifyPassword,
  updatePassword,
};

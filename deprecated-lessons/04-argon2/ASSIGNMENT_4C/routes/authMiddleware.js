const User = require("../models/userModel");

function requireAuth(req, res, next) {
  if (req.session && req.session.userId) {
    return next();
  } else {
    res.redirect("/login");
  }
}

async function isLoggedIn(req, res, next) {
  try {
    if (req.session && req.session.userId) {
      req.session.userInfo = await User.findOne({ _id: req.session.userId });
      return next();
    } else {
      req.session.userInfo = null;
      return next();
    }
  } catch (error) {
    let errorObj = {
      message: "isLoggedIn middleware failed",
      payload: error,
    };

    console.log(errorObj);
    res.json(errorObj);
  }
}

module.exports = {
  requireAuth,
  isLoggedIn,
};

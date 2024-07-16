const User = require("../models/userModel");

async function renderHomepage(req, res) {
  try {
    let userId = req.session.userId;

    let foundUser = await User.findOne({ _id: userId });

    res.render("homepage", { user: foundUser.username });
  } catch (error) {}
}

function renderLoginForm(req, res) {
  res.render("login");
}

async function logout(req, res) {
  try {
    // Destroy the session
    req.session.destroy((err) => {
      if (err) {
        console.error("Error destroying session:", err);
        res.status(500).json({
          message: "logout failure",
          payload: "Error logging out",
        });
      } else {
        res.redirect("/");
      }
    });
  } catch (error) {
    let errorObj = {
      message: "logout failure",
      payload: error,
    };
    console.error(errorObj);
    res.status(500).json(errorObj);
  }
}

module.exports = {
  renderHomepage,
  renderLoginForm,
  logout,
};

const Thread = require("../models/threadModel");

async function renderCatalogPage(req, res) {
  try {
    //gets all threads
    let results = await Thread.find({});

    // #18: Render each page with { user: req.session.userInfo }
    res.render("catalog", { threads: results });
  } catch (error) {
    let errorObj = {
      message: "renderCatalogPage failed",
      payload: error,
    };
    console.log(errorObj);
    res.json(errorObj);
  }
}

async function renderSingleThreadPage(req, res) {
  try {
    //gets all threads
    let result = await Thread.findOne({ threadNo: req.params.threadNo });

    // #18: Render each page with { user: req.session.userInfo }
    res.render("singleThread", { thread: result });
  } catch (error) {
    let errorObj = {
      message: "renderSingleThreadPage failed",
      payload: error,
    };
    console.log(errorObj);
    res.json(errorObj);
  }
}

// #12: Use this function to render register.ejs
async function renderRegisterPage(req, res) {
  // #18: Render each page with { user: req.session.userInfo }
}

// #16: Use this function to render login.ejs
async function renderLoginPage(req, res) {
  // #18: Render each page with { user: req.session.userInfo }
}

// #25: Use this function to log out. Use res.redirect('/')
async function logout(req, res) {}

module.exports = {
  renderCatalogPage,
  renderSingleThreadPage,
  // renderRegisterPage,
  // renderLoginPage,
  // logout
};

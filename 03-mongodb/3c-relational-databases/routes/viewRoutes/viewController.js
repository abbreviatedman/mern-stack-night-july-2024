const Album = require("../albums/albumsModel");
const User = require("../users/usersModel");
const axios = require("axios");

async function getHomePage(req, res) {
  try {
    res.render("home");
  } catch (error) {
    let errorObj = {
      message: "failure to get Home Page",
      payload: error,
    };

    // server-side error
    console.log(errorObj);

    // client-side error
    res.json(errorObj);
  }
}

async function getAlbumPage(req, res) {
  try {
    let listOfAlbums = await Album.find({});

    res.render("albums", { albums: listOfAlbums });
  } catch (error) {
    let errorObj = {
      message: "failure to get Album Page",
      payload: error,
    };

    // server-side error
    console.log(errorObj);

    // client-side error
    res.json(errorObj);
  }
}


async function getOneAlbumPage(req, res) {
  try {
    const { id } = req.params;
    const currentAlbum = await Album.findOne({ _id: id });
    const usersWithAlbumFaved = await User.find({ favoriteAlbums: id });
    const usersListedOnAlbum = await User.find({
      _id: currentAlbum.userFavorite,
    });

    res.render("oneAlbum", {
      album: currentAlbum,
      userList: usersWithAlbumFaved.concat(usersListedOnAlbum),
    });
  } catch (error) {
    let errorObj = {
      message: "failure to get User Favorite Page",
      payload: error,
    };

    // server-side error
    console.log(errorObj);

    // client-side error
    res.json(errorObj);
  }
}

module.exports = {
  getHomePage,
  getAlbumPage,
  getOneAlbumPage,
};

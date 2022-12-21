exports.index_get = (req, res) => {
    res.render("index", {welcomeMessage: "Welcome to Home Page"});
  };
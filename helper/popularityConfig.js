const popularityJson = require("../data/popularity.json");

module.exports = popularityJson.map(function (popularity) {
  return popularity.popularity;
});
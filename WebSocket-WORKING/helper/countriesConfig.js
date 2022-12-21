const countryJson = require("../data/country.json");

module.exports = countryJson.map(function (country) {
  return country.country;
});
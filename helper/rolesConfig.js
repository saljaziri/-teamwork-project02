const roleJson = require("../data/role.json");

module.exports= roleJson.map(function (role) {
  return role.role;
});
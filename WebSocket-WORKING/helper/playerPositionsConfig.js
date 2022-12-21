const playerPositionJson = require("../data/playerPosition.json");

module.exports= playerPositionJson.map(function (playerPosition) {
  return playerPosition.position;
});
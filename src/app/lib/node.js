const mongoose = require("mongoose");
const Player = require("../schema/player");

async function updatePlayer() {
  await mongoose.connect("mongodb://localhost:27017/the-kobe");
  console.log("connected");

  const player = await Player.find();
  console.log(player);
}

updatePlayer();
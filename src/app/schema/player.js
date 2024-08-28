import mongoose from "mongoose";

const playerSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  familyName: String,
  givenName: String,
  picture: String,
  username: String,
  phoneNumber: String,
  kindeId: {
    type: String,
    unique: true,
  },
});

const Player =
  mongoose.models.Player || mongoose.model("Player", playerSchema);

export default Player;

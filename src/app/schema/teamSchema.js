import mongoose from "mongoose";
import { Schema } from "mongoose";
import { v4 as uuidv4 } from "uuid";

const teamSchema = new mongoose.Schema({
  teamId: {
    type: String,
    default: uuidv4,
  },

  players: [
    {
      type: Schema.Types.ObjectId,
      ref: "Player",
      required: true,
    },
  ],
  isChampionTeam: {
    type: Boolean,
    default: false,
  },
});

const Team = mongoose.models.Team || mongoose.model("Team", teamSchema);

export default Team;

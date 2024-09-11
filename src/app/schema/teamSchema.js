import mongoose from "mongoose";
import { Schema } from "mongoose";

const teamSchema = new mongoose.Schema({
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

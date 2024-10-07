import mongoose from "mongoose";

const teamScoreSchema = new mongoose.Schema({
  team: {
    type: String,
    ref: "Team",
    required: true,
  },
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "GolfCourse",
    required: true,
  },
  playerScores: [
    {
      player: { type: mongoose.Schema.Types.ObjectId, ref: "Player" },
      holeScores: [
        {
          hole: { type: Number, required: true },
          holeScore: { type: Number, required: true },
        },
      ],
      netScores: [
        {
          hole: { type: Number, required: true },
          netScore: { type: Number, required: true },
        },
      ],
      totalNetScore: {
        type: Number,
        required: true,
      },
    },
  ],
  totalScore: {
    type: Number,
    required: true,
  },
});

const TeamScore =
  mongoose.models.TeamScore || mongoose.model("TeamScore", teamScoreSchema);

export default TeamScore;

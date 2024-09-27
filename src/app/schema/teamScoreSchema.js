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
      holeScore: [
        {
          hole: { type: Number, required: true },
          holeScore: { type: Number, required: true },
        },
      ],
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

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
  totalScore: {
    type: Number,
    required: true,
  },
});

const TeamScore =
  mongoose.models.TeamScore || mongoose.model("TeamScore", teamScoreSchema);

export default TeamScore;

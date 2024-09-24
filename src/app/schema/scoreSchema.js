import mongoose from "mongoose";

const scoreSchema = new mongoose.Schema({
  player: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Player",
    required: true,
  },
  course: {
    name: {
      type: String,
      required: true,
    },
    _id: { type: mongoose.Schema.Types.ObjectId, ref: "GolfCourse" },
  },

  totalScore: {
    type: Number,
    required: true,
  },

  roundComplete: {
    type: Boolean,
    default: false,
  },
  notes: {
    type: String,
    default: "",
  },
  submitted: {
    type: Boolean,
    default: false,
  },
});

const Score = mongoose.models.Score || mongoose.model("Score", scoreSchema);

export default Score;

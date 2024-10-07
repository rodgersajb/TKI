import mongoose from "mongoose";

const testScoreSchema = new mongoose.Schema({
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
    }
  ],
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

const TestScore =
  mongoose.models.TestScore || mongoose.model("TestScore", testScoreSchema);

export default TestScore;

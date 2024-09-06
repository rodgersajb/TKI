import mongoose from "mongoose";
import { Schema } from "mongoose";

const scoreSchema = new mongoose.Schema({
  player: {
    type: Schema.Types.ObjectId,
    ref: "Player",
    required: true,
  },
  course: {
    type: String,
    ref: "GolfCourse",
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  score: {
    type: Number,
    required: true
  },
  // score: [
  //   {
  //     holeNumber: {
  //       type: Number,
  //     },
  //     strokes: {
  //       type: Number,
  //       required: true,
  //     },
  //   },
  // ],
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

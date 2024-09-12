import mongoose from "mongoose";
import { Schema } from "mongoose";

const scoreSchema = new mongoose.Schema({
  team: {
    type: Schema.Types.ObjectId,
    ref: "Team",
    required: true,
  },
  course: {
    type: Schema.Types.ObjectId,
    ref: "GolfCourse",
    required: true,
  },
  holeScores: [
    {
      player: {
        type: Schema.Types.ObjectId,
        ref: "Player",
        required: true,
      },
      holeNumber: {
        type: Number,
        required: true,
      },
      strokes: {
        type: Number,
        required: true,
      },
    },
    
  ],
  netScore: {
    type: Number,
    default: 0,
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

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
    required: true,
  },
  data: {
    type: Date,
    default: Date.now,
  },
  score: {
    type: Number,
    required: true,
  },
  notes: {
    type: String,
    default: "",
  },
});

const Scores = mongoose.models.Scores || mongoose.model("Scores", scoreSchema);

export default Scores;

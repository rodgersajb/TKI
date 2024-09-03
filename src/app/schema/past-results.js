import mongoose from "mongoose";

const pastResultsSchema = new mongoose.Schema({
    team: [String],
    score: Number,
    year: Number,
});

const PastResults = mongoose.models.PastResults || mongoose.model("PastResults", pastResultsSchema);

export default PastResults;
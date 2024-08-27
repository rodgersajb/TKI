import mongoose from "mongoose";
import { type } from "os";

const playerSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
});

const Players = mongoose.models.Players || mongoose.model("Players", playerSchema);

export default Players;
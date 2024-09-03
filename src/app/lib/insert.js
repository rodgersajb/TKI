const mongoose = require("mongoose");
const { ObjectId } = require("mongodb");

const pastResultsSchema = new mongoose.Schema({
  team: [String],
  score: Number,
  year: Number,
});

const PastResults =
  mongoose.models.PastResults ||
  mongoose.model("PastResults", pastResultsSchema);

async function updateMany() {
  mongoose.connect(process.env.MONGO_URI, {
    useUnifiedTopology: true,
  });

  try {
 
  } catch (error) {
    console.error("Error updating year:", error);
  }
}
updateMany();

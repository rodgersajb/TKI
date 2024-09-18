import connect from "@/app/lib/mongoose";
import Team from "@/app/schema/teamSchema";
import Score from "@/app/schema/score";


export async function POST() {
    await connect()

    try {
      const { player, course, holeNumber, strokes } = new Request(req).json();

      // Find the existing score document or create a new one
      let score = await Score.findOne({ player, course, roundComplete: false });

      if (!score) {
        score = new Score({ player, course, roundComplete: false });
      }

      // Update the score for the specific hole
      const holeScoreIndex = score.holeScores.findIndex(
        (hs) => hs.holeNumber === holeNumber
      );

      if (holeScoreIndex > -1) {
        // Update existing score entry
        score.holeScores[holeScoreIndex].strokes = strokes;
      } else {
        // Add new score entry
        score.holeScores.push({ player, holeNumber, strokes });
      }

      // Save the score document
      await score.save();

      res.status(200).json({ message: "Score updated successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to update score" });
    }
  } 

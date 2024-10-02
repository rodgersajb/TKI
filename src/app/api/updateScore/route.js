import connect from "@/app/lib/mongoose";
import TestScore from "@/app/schema/testScoreSchema";

export async function POST(req) {
  console.log("POST request received");
  try {
    await connect();

    const data = await req.json();
    const { course, holeNumber, holeScore } = data;
    console.log("FROM UPDATEAPI CALL", data)

    // Update the score for the given hole number
    const updatedScore = await TestScore.findOneAndUpdate(
      { course, holeNumber: parseInt(holeNumber, 10) }, // Ensure correct type
      { $set: { holeScore } },
      { new: true } // Return the updated document
    );

    console.log("Updated Score:", updatedScore);

    if (!updatedScore) {
      return new Response(
        JSON.stringify({ message: "Score not found" }, { status: 200 })
      );
    }
  } catch (error) {
    console.error("Error updating score:", error);
    return new Response(
      JSON.stringify({ error: "Failed to update score" }, { status: 500 })
    );
  }
}

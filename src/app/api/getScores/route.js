import Player from "@/app/schema/player";
import TestScore from "@/app/schema/testScoreSchema";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export async function GET(req) {
  try {
    // Get the user session
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    // Find the player based on the user's email
    const player = await Player.findOne({ email: user.email });
    if (!player) {
      return new Response(JSON.stringify({ error: "Player not found" }), {
        status: 404,
      });
    }

    // Find the player's scores
    const scores = await TestScore.find({ player: player._id })
      .populate("player")
      .exec();

    // Return the scores as a JSON response
    return new Response(JSON.stringify(scores), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    // Handle any errors
    console.error("Error fetching scores:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
    });
  }
}

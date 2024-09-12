import connect from "@/app/lib/mongoose";
import Team from "@/app/schema/teamSchema";
import Score from "@/app/schema/score";
import Player from "@/app/schema/playerSchema";

export async function POST(req) {

    try {
        await connect()

        const { teamId, holeScores } = await req.json();

        // Find the team and their score
        const team = await Team.findById(teamId).populate("players");
        const teamScore = await Score.findOne({ teamId });

        // Ensure the team exists

        if (!team || !teamScore) {
            return new Response(
                JSON.stringify({ error: "Team not found" }),
                { status: 404 }
            );
        }

        //update hole scores
        teamScore.holeScores = holeScores;

        await teamScore.save();

        return new Response(
            JSON.stringify({ message: "Hole scores updated successfully" }),
            { status: 200 }
        );
    } catch (error) {
        console.error("Error updating hole scores:", error);
        return new Response(JSON.stringify({ error: "Failed to update hole scores" }), { status: 500 });
    }
}
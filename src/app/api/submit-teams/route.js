import TestTeam from "@/app/schema/testTeamSchema";
import connect from "@/app/lib/mongoose";
import { v4 as uuidv4 } from "uuid";

export async function POST(req) {
  try {
    await connect();
    const teamId = uuidv4();

    // Parse the incoming JSON request
    const data = await req.json();
    const { selectedPlayers } = data;

    // Ensure we have two players
    if (!selectedPlayers || selectedPlayers.length !== 2) {
      return new Response(
        JSON.stringify({ error: "You must select exactly two players." }),
        { status: 400 }
      );
    }

    // Create a new team in the database
    const newTeam = new TestTeam({
      teamId: teamId,
      players: selectedPlayers.map((player) => player._id),
      isChampionTeam: false,
    });

    console.log(newTeam, "new team");
    await newTeam.save();

    // Return success response
    return new Response(
      JSON.stringify({ message: "Team created successfully!" }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error creating team:", error);
    return new Response(JSON.stringify({ error: "Failed to create team." }), {
      status: 500,
    });
  }
}

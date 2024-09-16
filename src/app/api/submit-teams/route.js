import Team from "@/app/schema/teamSchema";
import connect from "@/app/lib/mongoose";
import { v4 as uuidv4 } from "uuid";


export async function POST(req) {
  try {
    await connect();

    // Parse the incoming JSON request
    const data = await req.json();
    const { selectedPlayers } = data;
    console.log(selectedPlayers, "selected players");

    // Ensure we have two players
    if (selectedPlayers.length !== 2) {
      return new Response(
        JSON.stringify({ error: "You must select two players." }),
        { status: 400 }
      );
    }

    // Create a new team in the database
    const newTeam = new Team({
      teamId: uuidv4(),
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
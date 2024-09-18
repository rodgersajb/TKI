import connect from "@/app/lib/mongoose";

import Team from "@/app/schema/teamSchema";
import Player from "@/app/schema/player";

export async function GET() {
    try {
        await connect();

        const teams = await Team.find().populate("players").lean();
        const players = await Player.find(teams.players).lean();
        console.log(teams, "teams");
        console.log(players, "players");

        return new Response(JSON.stringify(teams), { status: 200 });
    } catch (error) {
        
    }
}
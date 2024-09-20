import Player from "@/app/schema/player";
import TestTeam from "@/app/schema/testTeamSchema";
export default async function ListItem({ result, ranking }) {
 
    const teamId = await result.team.teamId;
    console.log(teamId, "teamId");

    const team = await TestTeam.find({teamId}).populate("players").lean();
    console.log(team.players, "team");

  return (
    <li>
      <span>#{ranking}</span>
      {/* {team.players.map((player) => (
        
        ))} */}
    </li>
  );
}

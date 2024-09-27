"use server";
import Team from "@/app/schema/teamSchema";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Scorecard from "./scorecard";

export default async function ListItem({ result, ranking }) {
  console.log(result, "result");
  const teamId = await result.team;

  const team = await Team.findOne({ teamId }).populate("players").lean();
  // console.log(team, "team");
  // console.log(team.players, "team");
  return (
    <TableBody>
      <TableRow>
        <TableCell># {ranking}</TableCell>
        <TableCell>
          {team.players.map((player, index) => {
            const playerScore = result.playerScores.find(
              (ps) => ps.player.toString() === player._id.toString()
            );

            return (
              <section key={player._id} className="flex flex-col">
                <span>
                  {player.givenName} {player.familyName}
                </span>
                {/* Render player's hole scores */}
                
                <Scorecard playerScore={playerScore} />
              </section>
            );
          })}
        </TableCell>

        <TableCell>{result.totalScore}</TableCell>
      </TableRow>
    </TableBody>
  );
}

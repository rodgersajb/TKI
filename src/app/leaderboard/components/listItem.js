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
              <div key={player._id} className="flex flex-col">
                <span>
                  {player.givenName} {player.familyName}
                </span>
                {/* Render player's hole scores */}
                {playerScore && (
                  <div className="flex w-full">
                    {playerScore && (
                      <div>
                        <h3 className="font-bold">Scorecard</h3>
                        <div className="grid grid-cols-9 gap-2">
                          {playerScore.holeScore
                            .filter((scoreObj) => scoreObj.hole <= 9)
                            .map((scoreObj) => (
                              <div
                                className="flex flex-col items-center w-full"
                                key={scoreObj._id}
                              >
                                <div className="bg-kobePurple px-4 text-kobeWhite">
                                  <span>{scoreObj.hole}</span>
                                </div>
                                <span>{scoreObj.holeScore}</span>
                              </div>
                            ))}
                        </div>
                        <div className="grid grid-cols-9 gap-2">
                          {playerScore.holeScore
                            .filter((scoreObj) => scoreObj.hole > 9)
                            .map((scoreObj) => (
                              <div
                                className="flex flex-col items-center w-full"
                                key={scoreObj._id}
                              >
                                <div className="bg-kobePurple px-3 text-kobeWhite">
                                  <span className="">{scoreObj.hole}</span>
                                </div>
                                <span>{scoreObj.holeScore}</span>
                              </div>
                            ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </TableCell>

        <TableCell>{result.totalScore}</TableCell>
      </TableRow>
    </TableBody>
  );
}

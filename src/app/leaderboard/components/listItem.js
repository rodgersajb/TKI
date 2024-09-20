import TestTeam from "@/app/schema/testTeamSchema";

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
  const teamId = await result.team.teamId;

  const team = await TestTeam.findOne({ teamId }).populate("players").lean();

  return (
    <>
      
        <TableBody >
          <TableRow>
            <TableCell># {ranking}</TableCell>
            <TableCell>
              {team.players.map((player) => (
                <div className="flex">
                  <span key={player._id}>
                    {player.givenName} {player.familyName}
                  </span>
                </div>
              ))}
            </TableCell>
            <TableCell>{result.totalScore}</TableCell>
          </TableRow>
        </TableBody>
    
    </>
  );
}

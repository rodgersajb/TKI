
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
    console.log(result, 'result');
    const teamId = await result.team.teamId;
    

    const team = await TestTeam.findOne({teamId}).populate("players").lean();
    

  return (
    <>
      <TableHeader>
        <TableRow>
          <TableCell>Rank</TableCell>
          <TableCell>Players</TableCell>
          <TableCell>Score</TableCell>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
            <TableCell># {ranking}</TableCell>
            <TableCell>{team.players.map((player) => (
              <span key={player._id}>
                {player.givenName} {player.familyName}
              </span>
            ))}</TableCell>
            <TableCell>{result.totalScore}</TableCell>
        </TableRow>
        
       
      </TableBody>


    </>
  );
}

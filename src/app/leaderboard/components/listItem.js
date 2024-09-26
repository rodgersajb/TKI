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
  const teamId = await result.team;

  const team = await Team.findOne({ teamId }).populate("players").lean();
  // console.log(team, "team");
  return (
    <TableBody>
      <TableRow >
        <TableCell># {ranking}</TableCell>
        <TableCell>
          {team.players.map((player) => (
            <div key={player._id} className="flex">
              <span>
                {player.givenName} {player.familyName}
              </span>
            </div>
          ))}
        </TableCell>
        <TableCell>{result.totalScore}</TableCell>
      </TableRow>
    </TableBody>
  );
}

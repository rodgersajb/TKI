
import connect from "../lib/mongoose";
import TestScore from "../schema/testScoreSchema";
import TestTeam from "../schema/testTeamSchema";
import TeamScore from "../schema/teamScoreSchema";

import { redirect } from "next/navigation";

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import ListItem from "./components/listItem";

import {
  Table,
  TableCaption,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// revalidate path once scores are submitted

export default async function Leaderboard() {
  // connect to db
  await connect();
  // server session to be used for authentication

  const { getUser, isAuthenticated } = getKindeServerSession();
  const user = await getUser();

  const playerScores = await TestScore.find();

  const teams = await TestTeam.find().populate("players").lean();

  if (!(await isAuthenticated())) {
    redirect("/api/auth/login");
  }
  // Fetch all individual scores

  // Now we have both teams and player scores to start matching
  teams.forEach((team) => {
    const teamPlayers = team.players.map((player) => player._id.toString());

    const teamScores = playerScores.filter((score) =>
      teamPlayers.includes(score.player.toString())
    );
    console.log(teamScores[1], "teamScore");

    console.log(
      `Team ${team.teamId} has players with these scores:`,
      teamScores
    );
    if (!teamScores) {
      console.log("No scores for this team");
      return;
    } else if (teamScores > 0)
      TeamScore.create({
        team: team._id,
        course: teamScores[0].course,
        totalScore: teamScores.reduce(
          (acc, score) => acc + score.totalScore,
          0
        ),
      });
  });

  let ranking = 0;
  const teamResults = await TeamScore.find()
    .populate("team")
    .sort({ totalScore: 1 });
console.log(teamResults, "teamResults");
  // const results = await TeamScore.find().populate("player").sort({ score: 1 });

  return (
    <main className="min-h-svh w-full">
      {isAuthenticated && (
        <div className="w-[95%] m-auto flex flex-col">
          <h1 className="text-3xl text-center">Leader Board</h1>
          <Table>
            <TableHeader>
              <TableRow>
                <TableCell>Rank</TableCell>
                <TableCell>Players</TableCell>
                <TableCell>Score</TableCell>
              </TableRow>
            </TableHeader>
            {teamResults.map((result, index) => (
              <ListItem key={result._id} result={result} ranking={index + 1} />
            ))}
          </Table>
        </div>
      )}
    </main>
  );
}

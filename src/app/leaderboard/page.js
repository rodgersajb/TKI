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
import mongoose from "mongoose";

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
  teams.forEach(async (team) => {
    const teamPlayers = team.players.map((player) => player._id.toString());
    // console.log(teamPlayers, "teamPlayers");
    const teamScores = playerScores.filter((score) =>
      teamPlayers.includes(score.player.toString())
    );

    // const teamObjectId = new mongoose.Types.ObjectId(team.teamId);
    // console.log(teamObjectId, "teamObjectId");

    console.log(teamScores, "teamScores");

    // const testing = teamScores.map((score) => score.totalScore);
    // console.log(testing, "testing");
    // console.log(
    //   `Team ${team.teamId} has players with these scores:`,
    //   teamScores
    // );

    const courseId = teamScores[0].course._id;

    // total score for team on Six Foot Bay
    const totalScore = teamScores.reduce(
      (acc, score) => acc + score.totalScore,
      0
    );
    console.log(totalScore, "totalScore");

    let existingTeamScore = await TeamScore.findOne({
      team: team.teamId,
      course: courseId,
    });

    if (!existingTeamScore) {
      existingTeamScore = new TeamScore({
        team: team.teamId,
        course: courseId,
        totalScore,
      });
      console.log(existingTeamScore, "existingTeamScore");
    } else {
      existingTeamScore.totalScore = totalScore;
    }
    existingTeamScore.save();
    await existingTeamScore;
  });

  let ranking = 0;
  const teamResults = await TeamScore.find();
   console.log(teamResults, "teamResults");


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

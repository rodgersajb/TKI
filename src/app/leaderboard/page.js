import connect from "../lib/mongoose";
import TestScore from "../schema/testScoreSchema";
import TestTeam from "../schema/testTeamSchema";
import TeamScore from "../schema/teamScoreSchema";
import Player from "../schema/player";

import { redirect } from "next/navigation";

import { revalidatePath } from "next/cache";

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
  console.log(user, "user");

  const playerScores = await TestScore.find();
  // console.log(playerScores, "playerScores");

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

    // console.log(teamScores, "teamScores");

    // console.log(
    //   `Team ${team.teamId} has players with these scores:`,
    //   teamScores
    // );

    const courseId = teamScores[0].course._id;
    // console.log(courseId, "courseId");

    // total score for team on Six Foot Bay
    const totalScore = teamScores.reduce(
      (acc, score) => acc + score.totalScore,
      0
    );

    let existingTeamScore = await TeamScore.findOne({
      team: team.teamId,
      course: courseId,
    });

    if (!existingTeamScore) {
      existingTeamScore = new TeamScore({
        team: team.teamId,
        course: courseId,
        totalScore,
        playerScores: teamScores.map((score) => ({
          player: score.player,
          holeScore: score.holeScores,
        })),
      });
    } else {
      existingTeamScore.totalScore = totalScore;
      existingTeamScore.playerScores = teamScores.map((score) => ({
        player: score.player,
        holeScore: score.holeScores,
      }));
    }
    await existingTeamScore.save();
    // console.log(existingTeamScore, "existingTeamScore");
    revalidatePath("/leaderboard");
  });

  let ranking = 0;
  const teamResults = await TeamScore.find().sort({ totalScore: 1 }).lean();
  // console.log(teamResults, "teamResults");

  return (
    <main className=" w-full">
      <h1 className=" bg-kobePurple text-kobeWhite py-8 text-xl text-center">
        Leader Board
      </h1>
      {isAuthenticated && (
        <div className="w-[95%] m-auto flex flex-col">
          <div>
            <span>Rank</span>
            <span>Players</span>
            <span>Score</span>
          </div>
         
            {teamResults.map((result, index) => (
              <>
                <ListItem
                  key={result._id}
                  result={result}
                  ranking={index + 1}
                  
                />
                
              </>
            ))}
          
        </div>
      )}
    </main>
  );
}

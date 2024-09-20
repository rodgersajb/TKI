import Header from "../components/header";
import connect from "../lib/mongoose";
import TestScore from "../schema/testScoreSchema";
import TestTeam from "../schema/testTeamSchema";
import TeamScore from "../schema/teamScoreSchema";

import { redirect } from "next/navigation";

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import ListItem from "./components/listItem";

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

    // console.log(
    //   `Team ${team.teamId} has players with these scores:`,
    //   teamScores
    // );
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

  // const results = await TeamScore.find().populate("player").sort({ score: 1 });

  return (
    <main className="min-h-svh w-full">
      <Header />
      {isAuthenticated && (
        <div className="w-[95%] m-auto flex flex-col">
          <h1>Leader Board</h1>

          <ul className="">
            {teamResults.map((result, index) => (
              <ListItem key={result._id} result={result} ranking={index + 1} />
            ))}
          </ul>
        </div>
      )}
    </main>
  );
}

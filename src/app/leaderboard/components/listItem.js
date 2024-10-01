"use server";
import Team from "@/app/schema/teamSchema";

import Scorecard from "./scorecard";

export default async function ListItem({ result, ranking }) {
  console.log(result, "result");
  const teamId = await result.team;

  const team = await Team.findOne({ teamId }).populate("players").lean();
  // console.log(team, "team");
  // console.log(team.players, "team");

  // Calculate total current score for the team
  const totalCurrentScore = result.playerScores.reduce((total, playerScore) => {
    // Check if holeScore exists and is an array
    if (playerScore.holeScore && Array.isArray(playerScore.holeScore)) {
      const playerCurrentScore = playerScore.holeScore.reduce(
        (acc, score) => acc + score.holeScore,
        0
      );
      return total + playerCurrentScore; // Add player's score to total
    }
    return total; // Return total unchanged if no scores
  }, 0);
  return (
    <main className="flex flex-col gap-4">
      <div
        style={{ borderRadius: "0.4rem" }}
        className="w-[95%] m-auto font-semibold odd:bg-kobeWhite even:bg-kobeWhite even:text-kobePurple "
      >
        <h3 className="text-xl text-kobeGreen">{ranking}</h3>
        {team.players.map((player) => {
          console.log("Current player ID:", player._id.toString());

          // Log all the playerScores to ensure they are available
          console.log("Result Player Scores:", result.playerScores);
          const playerScore = result.playerScores.find(
            (ps) => ps.player.toString() === player._id.toString()
          );

          return (
            <section key={player._id} className="flex justify-between gap-10">
              <span className="w-[50px]">
                {player.givenName} {player.familyName}
              </span>
              {/* Render player's hole scores */}
              <Scorecard playerScore={playerScore} />
            </section>
          );

        })}
      </div>
        <div className="result-total-score">Total Score: {totalCurrentScore}</div>
    </main>
  );
}

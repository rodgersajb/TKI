"use server";
import Team from "@/app/schema/teamSchema";

import Scorecard from "./scorecard";

export default async function ListItem({ result, ranking }) {
  console.log(result, "result");
  const teamId = await result.team;

  const team = await Team.findOne({ teamId }).populate("players").lean();
  // console.log(team, "team");
  // console.log(team.players, "team");
  return (
    <main className="flex flex-col gap-4">
      

      <div style={{borderRadius: "0.4rem"}} className="w-[95%] m-auto font-semibold odd:bg-kobeWhite even:bg-kobeWhite even:text-kobePurple ">
        <h3>{ranking}</h3>
        {team.players.map((player) => {
          console.log("Current player ID:", player._id.toString());

          // Log all the playerScores to ensure they are available
          console.log("Result Player Scores:", result.playerScores);
          const playerScore = result.playerScores.find(
            (ps) => ps.player.toString() === player._id.toString()
          );

          return (
            <section key={player._id} className="flex items-center">
              <span>
                {player.givenName} {player.familyName}
              </span>
              {/* Render player's hole scores */}
              <Scorecard playerScore={playerScore} />
            </section>
          );
        })}

        <div className="result-total-score">
          Total Score: {result.totalScore}
        </div>
      </div>
    </main>
  );
}

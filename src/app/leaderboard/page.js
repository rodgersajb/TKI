import Header from "../components/header";
import connect from "../lib/mongoose";
import Scores from "../schema/score";
import Team from "../schema/teamSchema";

import { redirect } from "next/navigation";

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

// revalidate path once scores are submitted

export default async function Leaderboard() {
  // connect to db
  await connect();
  // server session to be used for authentication
  const teams = await Team.find();
  console.log(teams.teamId, "LEADERBOARD");
  const { isAuthenticated, getUser } = getKindeServerSession();

  if (!(await isAuthenticated())) {
    redirect("/api/auth/login");
  }

  let ranking = 0;

  const results = await Scores.find().populate("player").sort({ score: 1 });
  console.log(results, "results");

  return (
    <main className="min-h-svh w-full">
      <Header />
      {isAuthenticated && (
        <div className="w-[95%] m-auto flex flex-col">
          <h1>Leader Board</h1>

          <ul className="">
            {results.map((result, index) => (
              <li className="flex w-full items-center gap-10" key={result._id}>
                <span>#{index + 1}</span>
                <h2>{result.player.givenName}</h2>

                <p className="text-pink">{result.score}</p>
                <p>{result.notes}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </main>
  );
}

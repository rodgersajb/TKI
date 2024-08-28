import Header from "../components/header";
import connect from "../lib/mongoose";
import Scores from "../schema/score";

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export default async function Leaderboard() {
  // connect to db
  await connect();
  // server session to be used for authentication
  const { isAuthenticated, getUser } = getKindeServerSession();
  const user = getUser();
  if (!(await isAuthenticated())) {
    redirect("/api/auth/login");
  }

  const results = await Scores.find().populate("player").sort({ score: 1 });
  console.log(results, "results");

  return (
    <main>
      <Header />
      <h1>Leader Board</h1>
      <ul>
        {results.map((result) => (
          <li key={result._id}>
            <h2>{result.player.givenName}</h2>

            <p>{result.score}</p>
            <p>{result.notes}</p>
          </li>
        ))}
      </ul>
    </main>
  );
}

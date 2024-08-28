import Header from "../components/header";

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";

import connect from "../lib/mongoose";
import Scores from "../schema/score";
import Player from "../schema/player";

export default async function SubmitScore() {
  //connect to db
  await connect();
  // check for authentication
  const { isAuthenticated, getUser } = getKindeServerSession();
  const isLoggedIn = await isAuthenticated();
  const user = await getUser();

  // check if user is logged in and in database
  if (!(await isAuthenticated())) {
    redirect("/api/auth/login");
  }

  const submitScore = async (formData) => {
    "use server";

    // destructure score data

    const { course, score, notes } = Object.fromEntries(formData.entries());

    // Link to logged in player
    const player = await Player.findOne({ email: user.email });
    console.log(course, score, notes);

    // Save score to database
    const scoreSubmission = await Scores.create({
      player: player._id,
      name: player.givenName,
      course,
      score,
      notes,
    });

    await scoreSubmission.save();
  };

  return (
    <main className="text-center">
      <Header />
      <h1 className="text-xl">Submit Score</h1>
      <form action={submitScore} className="">
        <label htmlFor="course">Course</label>
        <input
          className="text-purple-500"
          type="text"
          name="course"
          id="course"
        />
        <label htmlFor="score">Score</label>
        <input
          className="text-purple-500"
          type="number"
          name="score"
          id="score"
        />
        <label htmlFor="notes">Notes</label>
        <textarea className="text-purple-500" name="notes" id="notes" />
        <button type="submit">Submit</button>
      </form>
    </main>
  );
}

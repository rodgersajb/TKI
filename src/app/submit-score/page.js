import { redirect } from "next/navigation";

import TestForm from "./components/testForm";
import Player from "../schema/player";

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export default async function SubmitScore() {
  const { getUser, isAuthenticated } = getKindeServerSession();
  const res = await fetch("http://localhost:3000/api/courses");
  const data = await res.json();
  // console.log(data[0].name, data[1].name, "data");
  // check for authentication
  const teamResults = await fetch("http://localhost:3000/api/teams");
  const teamData = await teamResults.json();
  // console.log(teamData, "teamData");

  const getPlayers = teamData.flatMap((team) => team.players);
  // const players = await Player.find({ _id: { $in: getPlayers } });
  // get user from kinde session
  const user = await getUser();

  const player = await Player.findOne({ email: user.email });

  // convert player to plain object
  const plainPlayer = player.toObject();
  plainPlayer.id = player._id.toString();

  // check if user is logged in and in database
  if (!(await isAuthenticated())) {
    redirect("/api/auth/login");
  }

  return (
    <main className="bg-kobeGrey h-svh">
      <TestForm user={plainPlayer} quarryGolf={data[1]} sixFootGolf={data[0]} />
    </main>
  );
}

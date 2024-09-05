import Player from "../schema/player";
import connect from "../lib/mongoose";

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";

import Navbar from "../components/navbar";

export default async function StartKobe() {
  await connect();

  const players = await Player.find();
  // server session to be used for authentication
  const { isAuthenticated, getPermission } = getKindeServerSession();
  const isLoggedIn = await isAuthenticated();

  if (!isLoggedIn) {
    redirect("api/auth/login");
  }

  const adminPermission = await getPermission("create:team");
  console.log(adminPermission);
  if (!adminPermission?.isGranted) {
    redirect("/");
  }

  return (
    <main className="flex min-h-svh w-full ">
      <Navbar />
      <h1 className="text-3xl">Start the 2024 Kobe</h1>
      <h4>Select Teams</h4>
      <ul>
        {players.map((player) => (
          <li key={player._id}>
            {player.givenName} - {player.familyName}
          </li>
        ))}
        </ul>
    </main>
  );
}

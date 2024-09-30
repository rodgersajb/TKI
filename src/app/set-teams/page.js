
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";


import connect from "../lib/mongoose";
import Player from "../schema/player";
import { redirect } from "next/navigation";
import SetTeamsForm from "./components/setTeamsForm";

import Image from "next/image";

export default async function SetTeams() {
    //connect to db
    await connect();

    //authenticate for admin permission only
    const { getPermission } = getKindeServerSession();
    // // variable to check for permission from kinde
    const adminPermission = await getPermission("create:team");
    // if the user is not an admin back to start
    if (!adminPermission?.isGranted) {
        redirect("/");
    }

    // get all the players from the database

    const findPlayers = await Player.find().lean();

    // map over the players and convert the newObjectId to a string to please the server to client process
    const players = findPlayers.map((player) => ({  
        ...player,
        _id: player._id.toString(),
    }));

    

    return (
      <main className="relative flex flex-col">
        <div className="w-full py-4 bg-kobeYellow text-kobePurple font-bold pl-4">

        <h1 className="text-2xl">Bingo Night 2024</h1>
        </div>
        {/* <figure className="relative h-[200px] w-full">
          <Image
            src="/img/bingo-min.jpg"
            alt="bingo balls"
            fill
            objectFit="cover"
          />
        </figure> */}

        <SetTeamsForm players={players} />
      </main>
    );
}
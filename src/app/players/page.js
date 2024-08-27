import PlayerList from "../components/playerList";
import connect from "../lib/mongoose";
import Players from "../schema/player";

export default async function getPlayers() {
  await connect();

  const players = await Players.find();
   return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <PlayerList players={players} />
    </main>
   )
}

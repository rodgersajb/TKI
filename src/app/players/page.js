import PlayerList from "../components/playerList";
import connect from "../lib/mongoose";
import Player from "../schema/player";

export default async function getPlayers() {
  await connect();

  const players = await Player.find();
  return (
    <main className="flex min-h-svh w-full flex-col items-center justify-evenly">
      <h1 className="text-3xl">Meet the Competition</h1>
      <PlayerList players={players} />
    </main>
  );
}

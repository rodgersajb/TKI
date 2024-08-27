import connect from "@/app/lib/mongoose";
import Players from "@/app/schema/player";

export default async function getPlayerById({params}) {
  await connect();

  const player = await Players.findById(params.id);
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <div className="bg-white rounded-lg shadow-md p-4">
          <h2 className="text-xl text-black font-semibold">
            {player.firstName} {player.lastName}
          </h2>
        </div>
    </main>
  )
}
import Link from "next/link";

export default function PlayerList({players}) {
  
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {players.map((player) => (
          <Link key={player._id} href={`/players/${player._id}`}>
            <div className="bg-red-400 rounded-lg shadow-md p-4">
              <h2 className="text-xl text-black font-semibold">
                {player.givenName} {player.familyName}
              </h2>
            </div>
          </Link>
        ))}
      </div>
    );
}
import Image from "next/image";

import Link from "next/link";

export default async function Complete() {
  return (
    <div className="h-svh w-full  bg-kobeGrey">
      <div className="w-full bg-kobePurple text-kobeWhite text-center flex items-center justify-center min-h-[75px]">
        <h1 className="text-2xl">Round Complete</h1>
      </div>
      <figure className="relative h-[250px] w-full">
        <Image src="/img/lake.jpg" alt="Lake" fill objectFit="cover" />
      </figure>

      <section className="flex flex-col items-center justify-center gap-4 min-h-[150px]">
        <Link
          style={{ borderRadius: "0.2rem" }}
          className="bg-kobePurple text-kobeWhite font-bold py-2 w-40 text-center"
          href="/leaderboard"
        >
          Leaderboard
        </Link>
        <Link
          style={{ borderRadius: "0.2rem" }}
          className="bg-kobeYellow text-kobePurple  font-bold py-2 w-40 text-center"
          href="/"
        >
          Home
        </Link>
      </section>
      <section className="text-center text-kobePurple font-bold ">
        <h2 className="w-3/4 m-auto">
          That lake is all yours if you want it to be
        </h2>
        <h2 className="w-3/4 m-auto">
          Questions? Talk to Johnny or Alex
        </h2>
      </section>
    </div>
  );
}

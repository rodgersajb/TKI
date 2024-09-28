import Image from "next/image";
import ImageCarousel from "./components/carousel";

import { redirect } from "next/navigation";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import connect from "./lib/mongoose";
import Player from "./schema/player";

export default async function Home() {
  // Connect to the database
  await connect();

  // Fetch session and user details
  const { isAuthenticated, getUser } = getKindeServerSession();
  const isLoggedIn = await isAuthenticated();

  // Redirect if the user is not logged in
  if (!isLoggedIn) {
    return redirect("/login"); // Or another appropriate login page
  }

  const user = await getUser();
  console.log(user, "user");
  const dbPlayer = await Player.findOne({ kindeId: user.id });

  // Redirect if the profile is incomplete
  if (dbPlayer && !dbPlayer.profileComplete) {
    return redirect("/complete-profile");
  }
  return (
    <main className="flex min-h-svh flex-col gap-8  w-full mx-auto ">
      <figure className="relative ">
        <Image
          src="/img/golf-ball.jpg"
          alt="teed up golf ball"
          layout="responsive"
          width={300}
          height={200}
          className="z-50"
          style={{ clipPath: "  circle(70.7% at 50% 11%)" }}
        />
        <div
          className="absolute -z-10 top-4 h-full w-full bg-kobeWhite"
          style={{ clipPath: "  circle(70.7% at 50% 11%)" }}
        ></div>
        <div
          className=" absolute -z-20 top-6 h-full w-full bg-gradient-to-r from-kobePurple to-kobeYellow"
          style={{ clipPath: "  circle(70.7% at 50% 11%)" }}
        >
          {" "}
        </div>
      </figure>
      <section className="w-full flex flex-col gap-2 items-center">
        <h4 className="text-kobePurple text-sm font-bold">
          04 - 06 October 2024
        </h4>
        <h3 className="text-xl font-bold">The Kobe Invitational</h3>
        <h5 className="text-sm">Six Foot Bay Golf Club, Buckhorn, ON</h5>
        <h5 className="text-sm">Quarry Golf Club, Ennismore, ON</h5>
      </section>
      <section>
        <ImageCarousel />
      </section>
    </main>
  );
}

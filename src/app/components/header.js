import Link from "next/link";

import {
  LoginLink,
  RegisterLink,
  LogoutLink,
} from "@kinde-oss/kinde-auth-nextjs/components";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

import connect from "@/app/lib/mongoose";
import Player from "../schema/player";

const routes = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "Score Submission",
    href: "/submit-score",
  },
  {
    label: "Leaderboard",
    href: "/leaderboard",
  },
];

export default async function Header() {
  // connect to db
  await connect();
  // server session to be used for authentication
  const { isAuthenticated, getUser } = getKindeServerSession();
  const isLoggedIn = await isAuthenticated();
  const user = await getUser();
  console.log(user, "user");

    // check if user is logged in and in database
  if (isLoggedIn) {
    let dbPlayer = await Player.findOne({ kindeId: user.id });
    // if user is not in database, create a new player
    console.log(dbPlayer, "dbPlayer");
    if (!dbPlayer) {
      dbPlayer = await Player.create({
        kindeId: user.id,
        email: user.email,
        givenName: user.given_name,
        familyName: user.family_name,
        picture: user.picture,
      });
    }
  }

  return (
    <header className="flex items-center justify-between gap-x-4 p-4">
      <nav>
        <ul className="flex space-x-4 text-sm">
          {routes.map(({ label, href }) => (
            <li key={href}>
              <Link href={href}>{label}</Link>
            </li>
          ))}
        </ul>
      </nav>
      <div className="flex gap-x-3 text-sm">
        {isLoggedIn ? (
          <>
            <span>Logged in as {user?.given_name}</span>
            <LogoutLink className="underline">Logout</LogoutLink>
          </>
        ) : (
          <>
            <LoginLink postLoginRedirectURL="/">Sign In</LoginLink>
            <RegisterLink postLoginRedirectURL="/">Register</RegisterLink>
          </>
        )}
      </div>
    </header>
  );
}

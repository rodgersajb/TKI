import Link from "next/link";

import {
  LoginLink,
  RegisterLink,
  LogoutLink,
} from "@kinde-oss/kinde-auth-nextjs/components";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

import connect from "@/app/lib/mongoose";
import Player from "../schema/player";

import { Button } from "@/components/ui/button";
import Navbar from "./navbar";






export default async function Header() {
  // connect to db
  await connect();
  // server session to be used for authentication
  const { isAuthenticated, getUser } = getKindeServerSession();
  const isLoggedIn = await isAuthenticated();
  const user = await getUser();

  // check if user is logged in and in database
  if (isLoggedIn) {
    let dbPlayer = await Player.findOne({ kindeId: user.id });
    // if user is not in database, create a new player

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
    <header className="flex items-center justify-between w-full">
      <div className="">
        <Navbar />
      </div>
     
      <div className="flex gap-x-3 text-sm pr-3">
        {isLoggedIn ? (
          <>
            <span>Logged in as {user?.given_name}</span>
            <Button>
              <LogoutLink>Logout</LogoutLink>
            </Button>
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

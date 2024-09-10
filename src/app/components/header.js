import { FaUserCircle } from "react-icons/fa";

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

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
import { redirect } from "next/navigation";

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
      <h1>The Kobe</h1>

      <div className="flex items-center pt-1  text-sm pr-3">
        {isLoggedIn ? (
          <>
            <HoverCard>
              <HoverCardTrigger>
                <FaUserCircle className="cursor-pointer" />
              </HoverCardTrigger>
              <HoverCardContent>
                <span>Logged in as {user?.given_name}</span>
                <Button>
                  <LogoutLink>Logout</LogoutLink>
                </Button>
              </HoverCardContent>
            </HoverCard>
            {/* <FaUserCircle />
            <span>Logged in as {user?.given_name}</span>
            <Button>
              <LogoutLink>Logout</LogoutLink>
            </Button> */}
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

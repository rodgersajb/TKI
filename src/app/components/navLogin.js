"use server"
import {
  LoginLink,
  RegisterLink,
  LogoutLink,
} from "@kinde-oss/kinde-auth-nextjs/components";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

import connect from "@/app/lib/mongoose";
import Player from "../schema/player";

export default async function NavLogin() {

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
    <main>
        {isLoggedIn ? (
            <div>
                <span>Logged in as {user.given_name}</span>
                <LogoutLink>Logout</LogoutLink>
            </div>
        )
        : (
            <div>
                <LoginLink>Login</LoginLink>
                <RegisterLink>Register</RegisterLink>
            </div>
        )
    }
    </main>
)

}

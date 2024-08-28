import Link from "next/link";
import {
  LoginLink,
  RegisterLink,
  LogoutLink,
} from "@kinde-oss/kinde-auth-nextjs/components";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

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
  // server session to be used for authentication
  const { isAuthenticated, getUser } = getKindeServerSession();
  const isLoggedIn = await isAuthenticated();
  const user = await getUser();

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
            <span>Logged in as {user?.email}</span>
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

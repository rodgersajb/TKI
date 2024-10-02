"use client";

import { useState } from "react";

import { GiHamburgerMenu } from "react-icons/gi";
import { IoClose } from "react-icons/io5";

import Link from "next/link";
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs";


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
    label: "Leaderboard ",
    href: "/leaderboard",
  },
  {
    label: "Past Results",
    href: "/past-results",
  },
  {
    label: "The Field",
    href: "/players",
  },
  {
    label: "Begin Kobe",
    href: "/set-teams",
    requiredPermission: "create:team"
  },
  {
    label: "Quarry Score",
    href: "/quarry",
  },
];

export default function Nav() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <div className="flex justify-start z-50 ">
        <button
          onClick={() => setIsOpen(!isOpen)}
          id="menu-btn"
          className={`z-50 ${isOpen ? "text-kobeWhite" : "text-kobePurple"}`}
        >
          {isOpen ? <IoClose /> : <GiHamburgerMenu />}
        </button>
      </div>
      <nav
        className={` fixed top-0 left-0 h-svh w-full bg-gray-800 text-white transform ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 ease-in-out z-40`}
      >
        <ul className="flex flex-col items-start justify-center h-full space-y-6 bg-kobePurple">
          {routes.map(({ label, href }) => (
            <li
              onClick={() => setIsOpen(!open)}
              className="text-kobeWhite"
              key={href}
            >
              <Link href={href}>{label}</Link>
            </li>
          ))}
          
          <LogoutLink className="text-kobeWhite">Logout</LogoutLink>
        </ul>
      </nav>
    </>
  );
}

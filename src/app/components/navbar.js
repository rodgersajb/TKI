"use client";
import { useState } from "react";

import Link from "next/link";

import { GiHamburgerMenu } from "react-icons/gi";
import { IoClose } from "react-icons/io5";

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
  {
    label: "Past Results",
    href: "/past-results",
  },
];

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    
  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        id="menu-btn"
        className="flex sm:hidden p-2 z-50"
      >
        {isOpen ? <IoClose /> : <GiHamburgerMenu />}
      </button>
      <nav
        className={` absolute top-10 left-0 z-20 ${
          isOpen ? "block" : "hidden"
        } w-full h-svh`}
      >
        <ul className="flex flex-col gap-10 pt-20 z-20 text-sm bg-slate-400 h-svh w-full">
          {routes.map(({ label, href }) => (
            <li key={href}>
              <Link href={href}>{label}</Link>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
}

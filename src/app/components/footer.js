import Link from "next/link";
import Logo from "./logo";

export default async function Footer() {
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
    {
      label: "The Field",
      href: "/players",
    },
  ];
  return (
    <footer className="bg-kobePurple w-full text-kobeWhite mt-12 p-4  ">
      <nav className="flex flex-col gap-4 items-center justify-center">
        <div className=" w-full flex justify-between text-sm border-b-kobeWhite border-b ">
          <h2 className="text-xl">The Kobe</h2>
          <div className="flex flex-col gap-2">
            <h4>In partnership with:</h4>
            <p className="text-xs">Town Brewery</p>
            <p className="text-xs">Allstate Timpeiro</p>
            <p className="text-xs pb-4">Axel Watches</p>
          </div>
        </div>

        <ul className="flex flex-wrap gap-4 w-[95%] justify-between text-kobeYellow">
          {routes.map(({ label, href }) => (
            <li className="" key={href}>
              <Link href={href}>{label}</Link>
            </li>
          ))}
        </ul>
      </nav>
    </footer>
  );
}

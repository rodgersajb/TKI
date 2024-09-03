import Header from "../components/header";

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";

import connect from "../lib/mongoose";
import ScoreForm from "../components/scoreForm";



export default async function SubmitScore() {
  //connect to db
  await connect();
  // check for authentication
  const { isAuthenticated, getUser } = getKindeServerSession();

  const user = await getUser();

  // check if user is logged in and in database
  if (!(await isAuthenticated())) {
    redirect("/api/auth/login");
  }

  return (
    <main className="text-center">
      <Header />
      <h1 className="text-xl">Submit Score</h1>
      <ScoreForm />
    </main>
  );
}

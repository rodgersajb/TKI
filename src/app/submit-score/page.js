import Header from "../components/header";

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";

export default async function SubmitScore() {
  // check for authentication
  const { isAuthenticated } = getKindeServerSession();
  if (!(await isAuthenticated())) {
    redirect("/api/auth/login");
  }
  return (
    <main className="text-center">
      <Header />
      <h1 className="text-xl">Submit Score</h1>
    </main>
  );
}

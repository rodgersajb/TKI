import Header from "../components/header";

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";

import connect from "../lib/mongoose";
// import ScoreForm from "../components/scoreForm";
import GolfCourse from "../schema/golfCourseSchema";
import Team from "../schema/teamSchema";
import TestForm from "./components/testForm";



export default async function SubmitScore({ params }) {
  const res = await fetch("http://localhost:3000/api/courses");
  const data = await res.json();
  console.log(data[0], data[1], "data");
  // check for authentication
  const { isAuthenticated } = await getKindeServerSession();

 
  


  // const convertIdToString = findCourses.map((course) => ({
  //   ...course,
  //   _id: course._id.toString(), // Convert ObjectId to string
  // }));
  // console.log(convertIdToString, 'convertIdToString')

  // Objects with a toJSON method are a big no no when passing from a server component to a client component
  // This is because the toJSON method will not be called when passing from server to client
  //Thus, we must convert the objectId to a string to please the nextJS gods
  

  // check if user is logged in and in database
  if (!(await isAuthenticated())) {
    redirect("/api/auth/login");
  }

  return (
    <main className="text-center">
      <Header />
      <h1 className="text-xl">Submit Score</h1>
      {/* <ScoreForm /> */}
      <TestForm quarryGolf={data[1]} sixFootGolf={data[0]}  />
    </main>
  );
}

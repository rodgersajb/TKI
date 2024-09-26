

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";

import TestForm from "./components/testForm";
import Player from "../schema/player";



export default async function SubmitScore() {
  const res = await fetch("http://localhost:3000/api/courses");
  const data = await res.json();
  // console.log(data[0].name, data[1].name, "data");
  // check for authentication
  const teamResults = await fetch("http://localhost:3000/api/teams");
  const teamData = await teamResults.json();
  // console.log(teamData, "teamData");

  const getPlayers = teamData.flatMap((team) => team.players);
  // const players = await Player.find({ _id: { $in: getPlayers } });
  
 
  const { isAuthenticated, getUser } =  getKindeServerSession();
  // get user from kinde session
  const user = await getUser();
  
  // find the user in the database by the email provided and then send off as props
//  const findUserByEmail = await Player.findOne({ email: user.email }).lean();

//  console.log(findUserByEmail, "findUserByEmail");
  


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
      
      <h1 className="text-xl">Submit Score</h1>
      
      <TestForm quarryGolf={data[1]} sixFootGolf={data[0]}  />
    </main>
  );
}

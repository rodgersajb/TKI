"use server";

import PastResults from "../schema/past-results";
import Player from "../schema/player";
import Scores from "../schema/score";


import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export const addScore = async (formData) => {
  // server session to be used for authentication
  const { getUser } = getKindeServerSession();
  
  const user = await getUser();
  // exporting a server function to submit a score that can be invoked
  // from the client side

  // destructure score data and grab all of the input values

  const { course, score, notes } = Object.fromEntries(formData.entries());

  // Link to logged in player
  const player = await Player.findOne({ email: user.email });
  console.log(course, score, notes);


  // Save score to database

  
  // try catch block to catch any errors and log them
  //try create a new score submission
  //catch any errors and log them
  const scoreSubmission = await Scores.create({
    player: player._id,
    name: player.givenName,
    course,
    score,
    notes,
  });

  await scoreSubmission.save();
};

export const getPastResults = async () => {

  const rawFormData = {
    year: formData.get('year')
  }
  // server function to get all scores from the database
  // and return them to the client side
  const pastResults = await PastResults.find(rawFormData);
  return pastResults;
}

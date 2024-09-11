"use server";

import PastResults from "../schema/past-results";
import Player from "../schema/player";
import Score from "../schema/score";

import { revalidatePath } from "next/cache";

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export const addScore = async (formData) => {
  // server session to be used for authentication
  const { getUser, getPermission } = getKindeServerSession();

  const user = await getUser();
  // exporting a server function to submit a score that can be invoked
  // from the client side

  // destructure score data and grab all of the input values

  // check if user has permission to submit a score
  const playerPermission = await getPermission("add:score");
  // if the user has permission to submit a score
  if (playerPermission?.isGranted) {
    const { course, score, notes } = Object.fromEntries(formData.entries());
    console.log(course, score, notes, "course, score, notes");
    // Link to logged in player
    const player = await Player.findOne({ email: user.email });
    console.log(player, "player");

    // Save score to database

    // try catch block to catch any errors and log them
    //try create a new score submission
    //catch any errors and log them
    try {
      const scoreSubmission = await Score.create({
        player: player._id,
        course: course,
        score,
        roundComplete: true,
        notes: notes,
        submitted: true,
      });
      console.log("SUBMITTED");
      await scoreSubmission.save();
    } catch (error) {
      return {
        error: error.message,
      };
    }

    revalidatePath("/submit-score");
  }
};

export const getPastResults = async () => {
  const rawFormData = {
    year: formData.get("year"),
  };
  // server function to get all scores from the database
  // and return them to the client side
  const pastResults = await PastResults.find(rawFormData);
  return pastResults;
};

// export const setTeams = async (formData) => {
//   const { getUser, getPermission } = getKindeServerSession();
//   const user = await getUser();
//   const teams = formData.get("selectedPlayers");
//   // const adminPermission = await getPermission("set:teams");
//   // if (adminPermission?.isGranted) {
//   //   const { selectedPlayers } = Object.fromEntries(formData.entries());
//     console.log(teams, );
//   // }
//   revalidatePath("/set-teams");
// };

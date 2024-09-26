"use server";

import PastResults from "../schema/past-results";
import Player from "../schema/player";
import TestScore from "../schema/testScoreSchema";
import GolfCourse from "../schema/golfCourseSchema";

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
    const course = formData.get("course");

    const holeScore = formData.get("holeScore");
    const holeNumber = formData.get("holeNumber");

    console.log(
      course,
      holeScore,
      holeNumber,

      "course",
      "holeScore",
      "holeNumber"
    );
    // Link to logged in player
    const player = await Player.findOne({ email: user.email });
    if (!player) {
      console.log("Player not found");
      // return { error: "Player not found" };
    }
    const golfCourse = await GolfCourse.findOne({ name: course });
    if (!golfCourse) {
      console.log("Course not found");
      // return { error: "Course not found" };
    }

    try {
      // Check if a score submission already exists for the player and course
      let scoreSubmission = await TestScore.findOne({
        player: player._id,
        "course._id": golfCourse._id,
      });

      if (!scoreSubmission) {
        scoreSubmission = await TestScore.create({
          player: player._id,
          course: {
            name: golfCourse.name,
            _id: golfCourse._id,
          },
          holeScores: [{ hole: holeNumber, holeScore: holeScore }],
          totalScore: 0,
          roundComplete: false,
          notes: formData.get("notes"),
          submitted: false,
        });

        console.log(scoreSubmission, "scoreSubmission");

        await scoreSubmission.save();

        return { success: "Hole score submitted successfully" };
      } else {
        scoreSubmission.holeScores[holeNumber] = holeScore;
      }
      if (
        Object.keys(scoreSubmission.holeScores).length ===
        golfCourse.holes.length
      ) {
        const totalScore = Object.values(scoreSubmission.holeScores).reduce(
          (acc, score) => acc + (parseInt(score) || 0),
          0
        );
        scoreSubmission.totalScore = totalScore;
        scoreSubmission.roundComplete = true;
        scoreSubmission.submitted = true;

        console.log("Round Complete", totalScore);
      }
      await scoreSubmission.save();

      return { success: "Score submitted successfully" };
    } catch (error) {
      console.error("Error submitting score:", error.message);
      return { error: error.message };
    }

    // revalidatePath("/submit-score");
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

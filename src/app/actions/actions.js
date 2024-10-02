"use server";

import PastResults from "../schema/past-results";
import Player from "../schema/player";
import TestScore from "../schema/testScoreSchema";
import GolfCourse from "../schema/golfCourseSchema";

import { revalidatePath } from "next/cache";

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";

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

        console.log("Score Submission", scoreSubmission);
        await scoreSubmission.save();

        return { success: "Hole score submitted successfully" };
      } else {
        // Check hole Index
        const holeIndex = scoreSubmission.holeScores.findIndex(
          (hole) => hole.hole === holeNumber
        );
        console.log("Current Hole Score", scoreSubmission.holeScores);
        if (holeIndex !== -1) {
          scoreSubmission.holeScores[holeIndex].holeScore = holeScore;
          console.log("Hole Score Updated", scoreSubmission.holeScores);
        } else {
          scoreSubmission.holeScores.push({
            hole: holeNumber,
            holeScore: holeScore,
          });
          console.log("Hole Score", scoreSubmission.holeScores);
        }
      }

      console.log("UPDATED HOLES", scoreSubmission.holeScores);

      // if (scoreSubmission.holeScores.length === golfCourse.holes.length) {
      //   const totalScore = scoreSubmission.holeScores.reduce(
      //     (acc, hole) => acc + hole.holeScore,
      //     0
      //   );
      //   scoreSubmission.totalScore = totalScore;
      //   scoreSubmission.roundComplete = true;
      //   scoreSubmission.submitted = true;

      //   console.log("Round Complete", totalScore);
      // }
      // console.log("Score Submission", scoreSubmission);
      await scoreSubmission.save();

      return { success: "Score submitted successfully" };
    } catch (error) {
      console.error("Error submitting score:", error.message);
      return { error: error.message };
    }
  }
  revalidatePath("/submit-score");
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

export const updatePlayerProfile = async (formData) => {
  // server function to update a player's profile
  // with the data from the form
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  const sixFootHandicap = formData.get("sixFootHandicap");
  const quarryHandicap = formData.get("quarryHandicap");
  const bio = formData.get("bio");

  // Find the player in the database
  // if there s no player, return an error
  // else complete the player and redirect back to home page
  const player = await Player.findOne({ email: user.email });
  if (!player) {
    console.log("Player not found");
    return { error: "Player not found" };
  } else {
    player.sixFootHandicap = sixFootHandicap;
    player.quarryHandicap = quarryHandicap;
    player.profileComplete = true;
    player.bio = bio;
    await player.save();
  };
  redirect("/");
}

export const confirmScoreSubmission = async (formData) => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  const course = formData.get("course");

  const player = await Player.findOne({ email: user.email });
  if (!player) {
    console.log("Player not found");
    return { error: "Player not found" };
  }

  const golfCourse = await GolfCourse.findOne({ name: course });
  if (!golfCourse) {
    console.log("Course not found");
    return { error: "Course not found" };
  }

  try {
    const scoreSubmission = await TestScore.findOne({
      player: player._id,
      "course._id": golfCourse._id,
    });

    if (!scoreSubmission) {
      return { error: "Score submission not found" };
    }

    // Calculate total score and mark the round as complete
    const totalScore = scoreSubmission.holeScores.reduce(
      (acc, hole) => acc + hole.holeScore,
      0
    );
    scoreSubmission.totalScore = totalScore;
    scoreSubmission.roundComplete = true; // Mark round as complete
    scoreSubmission.submitted = true; // Mark score as submitted
    console.log(scoreSubmission, "Score Submission");
    await scoreSubmission.save();
  } catch (error) {
    console.error("Error confirming score submission:", error.message);
    return { error: error.message };
  }
};

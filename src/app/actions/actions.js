"use server";

import PastResults from "../schema/past-results";
import Player from "../schema/player";
import TestScore from "../schema/testScoreSchema";
import GolfCourse from "../schema/golfCourseSchema";

import { revalidatePath } from "next/cache";

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";

export const addScore = async (formData) => {
  const { getUser, getPermission } = getKindeServerSession();
  const user = await getUser();

  // Check if user has permission to submit a score
  const playerPermission = await getPermission("add:score");
  if (playerPermission?.isGranted) {
    const course = formData.get("course");
    const holeScore = Number(formData.get("holeScore")); // Ensure the score is a number
    const holeNumber = Number(formData.get("holeNumber")); // Ensure the hole number is a number

    console.log(
      course,
      holeScore,
      holeNumber,
      "course",
      "holeScore",
      "holeNumber"
    );

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
      // Check if a score submission already exists for the player and course
      let scoreSubmission = await TestScore.findOne({
        player: player._id,
        "course._id": golfCourse._id,
      });

      if (!scoreSubmission) {
        // If no submission exists, create a new one
        scoreSubmission = await TestScore.create({
          player: player._id,
          course: {
            name: golfCourse.name,
            _id: golfCourse._id,
          },
          holeScores: [{ hole: holeNumber, holeScore }],
          totalScore: 0,
          roundComplete: false,
          notes: formData.get("notes"),
          submitted: false,
        });

        console.log("Score Submission", scoreSubmission);
        await scoreSubmission.save();

        return { success: "Hole score submitted successfully" };
      } else {
        // Check if the hole number already exists in holeScores
        const holeIndex = scoreSubmission.holeScores.findIndex(
          (hole) => hole.hole === holeNumber
        );

        console.log("Current Hole Score", scoreSubmission.holeScores);

        if (holeIndex !== -1) {
          // If the hole already has a score, update it
          scoreSubmission.holeScores[holeIndex].holeScore = holeScore;
          console.log("Hole Score Updated", scoreSubmission.holeScores);
        } else {
          // Otherwise, push the new hole score
          scoreSubmission.holeScores.push({
            hole: holeNumber,
            holeScore,
          });
          console.log("Hole Score Added", scoreSubmission.holeScores);
        }

        // Save the updated score submission
        await scoreSubmission.save();
        revalidatePath("/submit-score");
        return { success: "Hole score submitted successfully" };
      }
    } catch (error) {
      console.error("Error submitting score:", error.message);
      return { error: error.message };
    }
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
  }
  redirect("/");
};

export const updateScore = async (holeNumber, holeScore) => {
  const formData = new FormData();
  formData.append("holeNumber", holeNumber);
  formData.append("holeScore", holeScore);

  try {
    const response = await fetch("/api/updateScore", {
      method: "POST",
      body: JSON.stringify({
        holeNumber,
        holeScore,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to update score");
    }

    // Optionally handle response data
    const data = await response.json();
    console.log("Score updated:", data);
  } catch (error) {
    console.error("Error updating score:", error);
  }
};

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

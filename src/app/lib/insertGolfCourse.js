// This script is used to insert golf courses into the database. It is a one-time script that is run to insert the golf courses into the database. It is not used in the application itself. It is used to populate the database with golf courses.
const GolfCourse = require("../schema/golfCourseSchema");
const mongoose = require("mongoose");

const sixFootBay = new GolfCourse({
  name: "Six Foot Bay",
  holes: [
    { number: 1, par: 4, handicap: 2, yardage: 400 },
    { number: 2, par: 4, handicap: 7, yardage: 225 },
    { number: 3, par: 4, handicap: 10, yardage: 405 },
    { number: 4, par: 5, handicap: 14, yardage: 510 },
    { number: 5, par: 3, handicap: 17, yardage: 165 },
    { number: 6, par: 4, handicap: 12, yardage: 410 },
    { number: 7, par: 3, handicap: 16, yardage: 142 },
    { number: 8, par: 4, handicap: 13, yardage: 365 },
    { number: 9, par: 5, handicap: 4, yardage: 570 },
    { number: 10, par: 4, handicap: 18, yardage: 305 },
    { number: 11, par: 4, handicap: 3, yardage: 410 },
    { number: 12, par: 4, handicap: 5, yardage: 480 },
    { number: 13, par: 3, handicap: 15, yardage: 145 },
    { number: 14, par: 5, handicap: 9, yardage: 520 },
    { number: 15, par: 3, handicap: 6, yardage: 175 },
    { number: 16, par: 4, handicap: 11, yardage: 480 },
    { number: 17, par: 4, handicap: 8, yardage: 333 },
    { number: 18, par: 4, handicap: 1, yardage: 430 },
  ],
  totalPar: 72,
  totalYardage: 6470,
});

const quarryGolfClub = new GolfCourse({
  name: "Quarry Golf Club",
  holes: [
    { number: 1, par: 5, handicap: 1, yardage: 535 },
    { number: 2, par: 4, handicap: 11, yardage: 299 },
    { number: 3, par: 4, handicap: 7, yardage: 386 },
    { number: 4, par: 4, handicap: 5, yardage: 380 },
    { number: 5, par: 3, handicap: 13, yardage: 174 },
    { number: 6, par: 4, handicap: 15, yardage: 320 },
    { number: 7, par: 4, handicap: 9, yardage: 352 },
    { number: 8, par: 3, handicap: 17, yardage: 156 },
    { number: 9, par: 5, handicap: 3, yardage: 494 },
    { number: 10, par: 4, handicap: 8, yardage: 442 },
    { number: 11, par: 5, handicap: 2, yardage: 484 },
    { number: 12, par: 3, handicap: 18, yardage: 162 },
    { number: 13, par: 4, handicap: 14, yardage: 296 },
    { number: 14, par: 3, handicap: 12, yardage: 170 },
    { number: 15, par: 4, handicap: 4, yardage: 411 },
    { number: 16, par: 3, handicap: 16, yardage: 172 },
    { number: 17, par: 5, handicap: 6, yardage: 470 },
    { number: 18, par: 5, handicap: 10, yardage: 460 },
  ],
  totalPar: 72,
  totalYardage: 6163,
});

async function insertGolfCourse() {
  mongoose.connect(process.env.MONGO_URI, {
    useUnifiedTopology: true,
  });
  try {
    await sixFootBay.save();
    console.log("Six Foot Bay saved");
    await quarryGolfClub.save();
    console.log("Quarry Golf Club saved");
  } catch (error) {
    console.error("Error inserting golf course:", error);
  }
}

insertGolfCourse();

// Workflow for Score Submission:
// Player Logs In: Authenticated via Kinde.
// Select Course: Player selects either Six Foot Bay or Quarry Golf Club.
// Submit Scores: Player enters scores per hole or total round score.
// If per hole, they can save progress and complete later.
// Once all holes are entered, they can mark the round as complete.
// Submission Lock: After submission, the score is locked.
// Only admins (isAdmin: true) can edit or delete scores after submission.
// Admin Capabilities:
// Update player scores if corrections are needed.
// Manage team assignments.
// Input teams for the tournament, ensuring last year's champions stay together.
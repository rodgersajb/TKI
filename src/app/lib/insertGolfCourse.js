import GolfCourse from "../schema/golfCourseSchema";

const sixFootBay = new GolfCourse({
  name: "Six Foot Bay",
  holes: [
    { number: 1, par: 4, handicap: 3, yardage: 350 },
    { number: 2, par: 4, handicap: 5, yardage: 320 },
    { number: 3, par: 3, handicap: 7, yardage: 150 },
    { number: 4, par: 5, handicap: 1, yardage: 500 },
    { number: 5, par: 4, handicap: 9, yardage: 400 },
    { number: 6, par: 3, handicap: 8, yardage: 180 },
    { number: 7, par: 4, handicap: 4, yardage: 350 },
    { number: 8, par: 5, handicap: 2, yardage: 520 },
    { number: 9, par: 4, handicap: 6, yardage: 380 },
    { number: 1, par: 4, handicap: 3, yardage: 350 },
    { number: 2, par: 4, handicap: 5, yardage: 320 },
    { number: 3, par: 3, handicap: 7, yardage: 150 },
    { number: 4, par: 5, handicap: 1, yardage: 500 },
    { number: 5, par: 4, handicap: 9, yardage: 400 },
    { number: 6, par: 3, handicap: 8, yardage: 180 },
    { number: 7, par: 4, handicap: 4, yardage: 350 },
    { number: 8, par: 5, handicap: 2, yardage: 520 },
    { number: 9, par: 4, handicap: 6, yardage: 380 },
  ],
  totalPar: 72,
});
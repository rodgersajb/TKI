import GolfCourse from "../schema/golfCourseSchema";

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

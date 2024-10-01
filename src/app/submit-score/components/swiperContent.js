"use client"

import { useRef, useState } from "react";

export default function SwiperContent({ hole, sixFootGolf,  swiperRef}) {

     const [score, setScore] = useState(
       sixFootGolf.holes.reduce((acc, hole) => {
         acc[hole.number] = "";
         return acc;
       }, {})
     );


   
  // function to handle score input
  const handleScoreChange = (holeNumber, value) => {
    const parsedValue = value === "" ? "" : parseInt(value, 10); // Parse to integer or keep as empty string
  setScore((prev) => {
    const updatedScore = { ...prev, [holeNumber]: parsedValue };
    console.log(updatedScore, "score"); // Log the updated score
    return updatedScore;
    });
  };
  return (
    <div className="text-kobePurple flex flex-col gap-4 ">
      <div
        style={{ borderRadius: "0.2rem" }}
        className="w-[95%] m-auto bg-kobeWhite drop-shadow-md flex flex-col items-center"
      >
        <h3 className="text-kobePurple"> #{hole.number}</h3>

        <p>Par {hole.par}</p>
        <div className="flex gap-2">
          <p>HDCP {hole.handicap}</p>
          <p> {hole.yardage} Yards</p>
        </div>
      </div>
      <div style={{borderRadius: "0.2rem"}} className="flex py-2 bg-kobeWhite drop-shadow-md w-[95%] items-center justify-center m-auto">
        <label htmlFor="score">Score:</label>
        <input
          type="number"
          className="w-1/5 text-center"
          id={`score-${hole.number}`}
          name="holeScore"
          
          value={score[hole.number]}
          onChange={(e) => handleScoreChange(hole.number, e.target.value)}
        />
        <input type="hidden" name="holeNumber" defaultValue={hole.number} />
      </div>
    </div>
  );
}
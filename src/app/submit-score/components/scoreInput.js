"use client";

import { useEffect, useState } from "react";

export default function ScoreInput({ hole, score, onScoreChange }) {
  const [scores, setScores] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchScores = async () => {
      try {
        const res = await fetch("/api/getScores");
        if (!res.ok) {
          throw new Error("Failed to fetch scores");
        }
        const data = await res.json();
        setScores(data);
        console.log(scores, "SCORES HEY");
      } catch (error) {
        setError(error.message);
      }
    };
    fetchScores();
  }, []);
  console.log(scores, "SCORES FROM SCORE INPUT");

  // Extract the hole score for the current hole
  const currentScore =
    scores.length > 0
      ? scores[0].holeScores.find((holeScore) => holeScore.hole === hole.number)
      : null;

  return (
    <div className="flex w-[95%] items-center justify-center m-auto bg-kobeWhite rounded drop-shadow-md py-4 gap-2 ">
      <label htmlFor="score">Score:</label>
      <input
        type="number"
        id={`score-${hole.number}`}
        name="holeScore"
        // Set value from the extracted score or default to an empty string
        value={currentScore ? currentScore.holeScore : ""}
        className="w-1/6 text-center"
        onChange={(e) => onScoreChange(hole.number, e.target.value)}
      />
      <input type="hidden" name="holeNumber" value={hole.number} />
    </div>
  );
}

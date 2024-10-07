"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function ScoreInput({ hole, score, netScore, onScoreChange, onNetScoreChange }) {
  const [holeScores, setHoleScores] = useState([]);
  const [netHoleScores, setNetHoleScores] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchScores = async () => {
      try {
        const res = await fetch("/api/getScores");
        if (!res.ok) {
          toast.error("Failed to fetch scores");
        }
        const data = await res.json();
        console.log(data, "DATA");
        setHoleScores(data[0].holeScores);
        setNetHoleScores(data[0].netScores);
        console.log(scores, "SCORES HEY");
      } catch (error) {
        setError(error.message);
      }
    };
    fetchScores();
  }, []);

  // Find the score for the current hole number
  const currentHoleScore =
    holeScores.length > 0
      ? holeScores.find((holeScore) => holeScore.hole === hole.number)
      : null;

  // Find the net score for the current hole number
  const currentNetScore =
    netHoleScores.length > 0
      ? netHoleScores.find((netScore) => netScore.hole === hole.number)
      : null;

  return (
    <div className="flex w-[95%] items-center justify-center m-auto bg-kobeWhite rounded drop-shadow-md py-4 gap-2 ">
      <label htmlFor="score">Score:</label>
      <input
        type="number"
        id={`score-${hole.number}`}
        name="holeScore"
        // If there's a current hole score, set it as the input value
        value={currentHoleScore ? currentHoleScore.holeScore : score || ""}
        className="w-1/6 text-center"
        onChange={(e) => onScoreChange(hole.number, e.target.value)}
      />
      <label htmlFor="netScore">Net:</label>
      <input
        type="number"
        id={`netScore-${hole.number}`}
        name="netScore"
        // Set value for the net score or default to an empty string
        value={currentNetScore ? currentNetScore.netScore : netScore || ""}
        className="w-1/6 text-center"
        onChange={(e) => onNetScoreChange(hole.number, e.target.value)}
      />
      <input type="hidden" name="holeNumber" value={hole.number} />
    </div>
  );
}

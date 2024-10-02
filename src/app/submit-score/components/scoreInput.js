"use client";

export default function ScoreInput({ hole, score, onScoreChange }) {
  return (
    <div className="flex w-[95%] items-center justify-center m-auto bg-kobeWhite rounded drop-shadow-md py-4 gap-2 ">
      <label htmlFor="score">Score:</label>
      <input
        type="number"
        id={`score-${hole.number}`}
        name="holeScore"
        value={score[hole.number]}
        className="w-1/6 text-center"
        onChange={(e) => onScoreChange(hole.number, e.target.value)}
      />
      <input type="hidden" name="holeNumber" value={hole.number} />
    </div>
  );
}

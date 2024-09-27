export default function BackNine({playerScore}) {
  return (
    <>
      {playerScore.holeScore
        .filter((scoreObj) => scoreObj.hole > 9)
        .map((scoreObj) => (
          <div className="flex flex-col items-center w-full" key={scoreObj._id}>
            <div className="bg-kobePurple px-3 text-kobeWhite">
              <span className="">{scoreObj.hole}</span>
            </div>
            <span>{scoreObj.holeScore}</span>
          </div>
        ))}
    </>
  );
}

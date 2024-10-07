
export default function FrontNine({playerScore}) {
  console.log(playerScore, "playerScore FROM FRONT NINE");
    return (
      <>
        {playerScore.holeScore
          .filter((scoreObj) => scoreObj.hole <= 9)
          .map((scoreObj) => (
            <div
              className="flex flex-col items-center w-full"
              key={scoreObj._id}
            >
              <div className="bg-kobePurple px-4 text-kobeWhite">
                <span>{scoreObj.hole}</span>
              </div>
              <span>{scoreObj.holeScore}</span>
            </div>
          ))}
      </>
    );
}
"use client";

import FrontNine from "./front";
import BackNine from "./back";
import SubmitButton from "./submitButton";

export default function ScoreSummary({ sixFootGolf, score, netScore}) {
    return (
      <div className="flex flex-col items-center gap-4 justify-center w-full">
        <div className="flex flex-col gap-2  w-[90%]">
          <h3 className="pt-4">Does this look right to you?</h3>
          <div className="flex">
            <div className="flex flex-col item-start justify-evenly">
              <h5>Hole:</h5>
              <h5>Score</h5>
              <h5>Net:</h5>
            </div>
            {sixFootGolf.holes
              .filter((hole) => hole.number <= 9)
              .map((hole) => (
                <FrontNine
                  key={hole.number}
                  hole={hole}
                  score={score}
                  netScore={netScore}
                />
              ))}
          </div>
          <div className="flex">
            {sixFootGolf.holes
              .filter((hole) => hole.number > 9)
              .map((hole) => (
                <BackNine
                  key={hole.number}
                  hole={hole}
                  score={score}
                  netScore={netScore}
                />
              ))}
          </div>
        </div>
        {/* <p>Total Score: {finalScore}</p> */}
        <p>Net Score : {Object.values(netScore)}</p>
        <div className="flex justify-center items-center">
          <SubmitButton />
        </div>
      </div>
    );
}
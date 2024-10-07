"use client";

import { useRef, useState } from "react";
import useMultiStep from "@/app/hooks/multiStepHook";

export default function SetTeamsForm({ players }) {
  const ref = useRef(null);

  const [selectedPlayers, setSelectedPlayers] = useState([]);
  const [submittedTeams, setSubmittedTeams] = useState([]);

  const { currentStepIndex, nextStep, previousStep } = useMultiStep(
    new Array(players.length / 2).fill(null)
  );

  const handlePlayerSelect = (player) => {
    // Prevent selecting the same player twice
    if (selectedPlayers.some((p) => p._id === player._id)) {
      setSelectedPlayers(selectedPlayers.filter((p) => p._id !== player._id));
    } else if (selectedPlayers.length < 2) {
      setSelectedPlayers([...selectedPlayers, player]);
    }
  };

  // Handle form submission
  const handleSubmitTeam = async (e) => {
    e.preventDefault();
    if (selectedPlayers.length === 2) {
      try {
        const response = await fetch("/api/submit-teams", {
          method: "POST",
          body: JSON.stringify({ selectedPlayers }), // Send as an object
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Something went wrong");
        }

        const data = await response.json();
        

        setSubmittedTeams((prev) => [...prev, selectedPlayers]);
        setSelectedPlayers([]);
        nextStep(); // Move to next step
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handlePreviousStep = () => {
    if (currentStepIndex > 0) {
      const previousTeam = submittedTeams[currentStepIndex - 1];
      setSelectedPlayers(previousTeam);
      previousStep();
    }
  };

  // Filter out selected players
  const remainingPlayers = players.filter(
    (player) =>
      !submittedTeams.flat().some((p) => p._id === player._id) ||
      selectedPlayers.some((p) => p._id === player._id)
  );

  // Check if all teams have been submitted
  const allTeamsSubmitted = submittedTeams.length === players.length / 2;

  return (
    <main className="">
      <div className="absolute top-1 right-1 text-kobeWhite">
        Step {currentStepIndex + 1} / {players.length / 2 + 1}
      </div>
      <h2 className="text-center pt-2 text-xl text-kobePurple font-bold">
        {allTeamsSubmitted ? "Submitted Teams" : "Select Teams:"}
      </h2>

      {allTeamsSubmitted ? (
        <ul className="pt-4">
          {submittedTeams.map((team, index) => (
            <li key={index} className="mb-2">
              Team {index + 1}:{" "}
              {team
                .map((player) => `${player.givenName} ${player.familyName}`)
                .join(", ")}
            </li>
          ))}
        </ul>
      ) : (
        <form className="flex flex-col gap-4 pt-4">
          {remainingPlayers.map((player) => (
            <button
              key={player._id}
              type="button"
              className={`px-4 py-2 bg-kobePurple text-kobeWhite w-1/2 m-auto ${
                selectedPlayers.some((p) => p._id === player._id)
                  ? "bg-kobeGreen text-kobeWhite"
                  : "bg-gray-200"
              }`}
              onClick={() => handlePlayerSelect(player)}
            >
              {player.givenName} {player.familyName}
            </button>
          ))}

          <div className="flex justify-between px-4">
            <button
              onClick={handlePreviousStep}
              disabled={currentStepIndex === 0}
            >
              {currentStepIndex === 0 ? "" : "Back"}
            </button>
            <button
              type="submit"
              disabled={selectedPlayers.length !== 2}
              onClick={handleSubmitTeam}
              className={`px-6 py-2 transition-all duration-300 ${
                selectedPlayers.length === 2
                  ? "bg-kobePurple text-kobeWhite"
                  : "disabled:opacity-50 bg-gray-400 text-gray-400"
              }`}
            >
              {currentStepIndex === players.length / 2 - 1
                ? "Finalize Teams"
                : "Next"}
            </button>
          </div>
        </form>
      )}
    </main>
  );
}

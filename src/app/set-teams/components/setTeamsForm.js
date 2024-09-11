"use client";

import { useRef, useState } from "react";
import useMultiStep from "@/app/hooks/multiStepHook";
import connect from "@/app/lib/mongoose";

export default function SetTeamsForm({ players }) {


  const ref = useRef(null);

  const [selectedPlayers, setSelectedPlayers] = useState([]);
  const [submittedTeams, setSubmittedTeams] = useState([]);

  const { currentStepIndex, nextStep, previousStep, goToStep, steps } =
    useMultiStep(
      // here we are creating a new array that contains all of the players in the database
      // taking the length of the players and dividing it by 2 to get the number of teams
      // We are passing the steps from the useMiltilStep hook to to this array
      new Array(players.length / 2).fill(null)
    );

  const handlePlayerSelect = (player) => {
    // Prevent selecting the same player twice
    if (selectedPlayers.some((p) => p._id === player._id)) return;

    if (selectedPlayers.length < 2) {
      setSelectedPlayers([...selectedPlayers, player]);
    }
  };
  console.log(selectedPlayers, 'selected players');
  console.log(submittedTeams,  'teams');
  // Handle form submission
  const handleSubmitTeam = (e) => {
    e.preventDefault();
    if (selectedPlayers.length === 2) {
      // Save the team and reset selected players for the next step
      setSubmittedTeams((prev) => [...prev, selectedPlayers]);
      setSelectedPlayers([]);
      nextStep(); // Move to next step
    }
  };

  // Filter out selected players
  // Filter remaining players for the current step
  const remainingPlayers = players.filter(
    (player) => !submittedTeams.flat().some((p) => p._id === player._id)
  );
  return (
    <main className="relative">
      <form
      action={async (formData) => {
        

        // const teams = await setTeams(formData);
        // if (teams?.error) {
        //   toast.error(teams.error);
        // } else {
        //   toast.success("Teams submitted");
        // }
        // // input validation

        // await setTeams(formData);
      }
      }
      >
        {remainingPlayers.map((player) => (
          <button
            key={player._id}
            type="button"
            name="teams"
            id="teams"
            className={`px-4 py-2 border ${
              selectedPlayers.some((p) => p._id === player._id)
                ? "bg-green-500"
                : "bg-gray-200"
            }`}
            onClick={() => handlePlayerSelect(player)}
            disabled={selectedPlayers.includes(player)}
          >
            {player.givenName} {player.familyName}
          </button>
        ))}
        
        <div className="absolute top-1 right-1 text-purple-700">
          Step {currentStepIndex + 1} / {players.length / 2}
        </div>

        <div>
          <button onClick={previousStep}>
            {/* if we are at the beginning of the steps we will go no further */}
            {currentStepIndex === 0 ? "" : "Back"}
          </button>
          <button
          type="submit"
          value={selectedPlayers}
          id="selectedPlayers"
          onClick={handleSubmitTeam}>
            {/* checking if the currentIndex is equal to the length of the players array that is divided in to two to show teams - 1 length of the array. If there is next step*/}
            {currentStepIndex === players.length / 2 - 1
              ? "Finalize Teams"
              : "Next"}
          </button>
        </div>
      </form>
    </main>
  );
}

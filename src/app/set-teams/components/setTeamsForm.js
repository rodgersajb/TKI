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
    if (selectedPlayers.some((p) => p._id === player._id)) {
      setSelectedPlayers(selectedPlayers.filter((p) => p._id !== player._id));

    } else if (selectedPlayers.length < 2) {
      setSelectedPlayers([...selectedPlayers, player]);
    }
  };
  console.log(selectedPlayers, 'selected players');
  console.log(submittedTeams,  'teams');
  // Handle form submission
  const handleSubmitTeam = async (e) => {
    e.preventDefault();
    if (selectedPlayers.length === 2) {
      // Save the team and reset selected players for the next step
      // setSubmittedTeams((prev) => [...prev, selectedPlayers]);
      // setSelectedPlayers([]);
      // nextStep(); // Move to next step
      try {
        const response = await fetch("/api/submit-teams", {
          method: "POST",
          body: JSON.stringify({ selectedPlayers }), // Send as an object
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(data.message || "Something went wrong");
        }

        const data = await response.json();
        console.log(data, "server response");

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
  }

  // Filter out selected players
  // Filter remaining players for the current step
  const remainingPlayers = players.filter(
    (player) => !submittedTeams.flat().some((p) => p._id === player._id) || selectedPlayers.some((p) => p._id === player._id)
  );
  return (
    <main className="">
      <div className="absolute top-1 right-1 text-kobeWhite">
        Step {currentStepIndex + 1} / {players.length / 2 + 1}
      </div>
      <h2 className="text-center pt-2 text-xl text-kobePurple font-bold">Select Teams:</h2>
      <form
        className="flex flex-col gap-4 pt-4"
        action={async (formData) => {
          // const teams = await setTeams(formData);
          // if (teams?.error) {
          //   toast.error(teams.error);
          // } else {
          //   toast.success("Teams submitted");
          // }
          // // input validation
          // await setTeams(formData);
        }}
      >
        {remainingPlayers.map((player) => (
          <button
            key={player._id}
            type="button"
            name="teams"
            id="teams"
            style={{ borderRadius: "0.2rem" }}
            className={`px-4 py-2 bg-kobePurple text-kobeWhite w-1/2 m-auto ${
              selectedPlayers.some((p) => p._id === player._id)
                ? "bg-kobeGreen text-kobeWhite"
                : "bg-gray-200"
            }`}
            onClick={() => handlePlayerSelect(player)}
            // disabled={selectedPlayers.includes(player)}
          >
            {player.givenName} {player.familyName}
          </button>
        ))}

        <div className="flex justify-between px-4">
          <button onClick={handlePreviousStep}>
            {/* if we are at the beginning of the steps we will go no further */}
            {currentStepIndex === 0 ? "" : "Back"}
          </button>
          <button
            type="submit"
            disabled={selectedPlayers.length !== 2}
            value={selectedPlayers}
            id="selectedPlayers"
            onClick={handleSubmitTeam}
            style={{ borderRadius: "0.2rem" }}
            className={` px-6 py-2 transition-all duration-300 
              ${selectedPlayers.length === 2 ? "bg-kobePurple text-kobeWhite" : "disabled:opacity-50 bg-gray-400 text-gray-400"}
              `}
          >
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

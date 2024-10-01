"use client";
import { useState } from "react";
import { addScore } from "@/app/actions/actions";

export default function Buttons({swiperRef, sixFootGolf}) {
  const [currentHole, setCurrentHole] = useState(1); // Keep track of current hole
  const [holeScores, setHoleScores] = useState({}); // Store scores for each hole
  // useState to keep track of score
  const [score, setScore] = useState(
    sixFootGolf.holes.reduce((acc, hole) => {
      acc[hole.number] = "";
      return acc;
    }, {})
  );

  // Handlers for buttons
  const handleNextSlide = async (e) => {
    e.preventDefault();
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slideNext();
      console.log(swiperRef.current.swiper, "swiperRef");

      const holeNumber = currentHole; // Adjusted to reflect the current hole
      // Get the hole score for the current hole
      const holeScore = score[holeNumber]; // Get the score for the current hol
      console.log("Hole Number:", holeNumber, "Hole Score:", holeScore);
      const formData = new FormData();
      formData.append("course", sixFootGolf.name);
      formData.append("holeScore", holeScore); // Send the score for the current hole
      formData.append("holeNumber", holeNumber);

      // Log individual values
      console.log("Form Data:", {
        course: sixFootGolf.name,
        holeScore: holeScore,
        holeNumber: holeNumber,
      });
      try {
        const response = await addScore(formData);
        console.log(response, "RESPONSE");

        setHoleScores((prev) => ({ ...prev, [holeNumber]: holeScore }));

        if (currentHole < sixFootGolf.holes.length) {
          setCurrentHole((prev) => prev + 1);
        } else {
          const totalScore = Object.values(holeScores).reduce(
            (acc, score) => acc + (parseInt(score) || 0),
            0
          );
          formData.append("totalScore", totalScore);
        }
      } catch (error) {
        console.log("Error in submission", error);
      }
    }
  };

  const handlePrevSlide = () => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slidePrev();
      console.log(swiperRef.current.swiper, "swiperRef");
    }
  };
  return (
    <div className="flex w-full justify-between px-1">
      <button
        className="bg-kobePurple text-kobeWhite py-1 px-2 rounded-lg"
        type="button"
        onClick={handlePrevSlide}
      >
        Previous Hole
      </button>
      <button
        className="bg-kobePurple text-kobeWhite py-1 px-2 rounded-lg"
        type="button"
        onClick={handleNextSlide}
      >
        Next Hole
      </button>
    </div>
  );
}
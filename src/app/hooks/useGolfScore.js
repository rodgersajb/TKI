"use client"
import { useState, useRef } from "react"
import { addScore } from "../actions/actions"

export const useGolfCourse = (sixFootGolf) => {
  // useState to keep track of score
  const [score, setScore] = useState(
    sixFootGolf.holes.reduce((acc, hole) => {
      acc[hole.number] = "";
      return acc;
    }, {})
  );

  const [currentHole, setCurrentHole] = useState(1); // Keep track of current hole
  const [totalScore, setTotalScore] = useState(0);
  const [holeScores, setHoleScores] = useState({}); // Store scores for each hole

  const swiperRef = useRef(null);
  const ref = useRef(null);

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

  // function to handle score input
  const handleScoreChange = (holeNumber, value) => {
    setScore((prev) => ({ ...prev, [holeNumber]: value }));
    console.log(score, "score");
  };
  // calculate total score by converting object values to an array and then reducing the array to a single value
  const finalScore = Object.values(score).reduce(
    (acc, score) => acc + (parseInt(score) || 0),
    0
  );
  console.log(finalScore, "finalScore");

  
}

// export the custom hook

return {
    handleNextSlide,
    handlePrevSlide,
    handleScoreChange,
    finalScore,
    swiperRef,
    ref,
    score,
    currentHole,
    totalScore,
    holeScores,
    };
    


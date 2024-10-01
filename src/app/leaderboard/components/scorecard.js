"use client";

import BackNine from "./backnine";
import FrontNine from "./frontnine";

import { motion, AnimatePresence, easeInOut } from "framer-motion";

import { FaChevronDown } from "react-icons/fa";

import { useState } from "react";

export default function Scorecard({ playerScore }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

 

  
  let currentScore = 0; // Default value

  // Check if holeScore exists and has items
 
  // Check if holeScore exists and is an array with items
  if (playerScore && playerScore.holeScore && Array.isArray(playerScore.holeScore) && playerScore.holeScore.length > 0) {
    currentScore = playerScore.holeScore.reduce((acc, scoreObj) => acc + scoreObj.holeScore, 0);
  }

  

  return (
    <main className="flex w-full">
      {playerScore && (
        <section className="w-full">
          {/* <div className="flex w-full justify-end gap-4"> */}

          <button
            className="flex w-full justify-end items-center gap-4"
            onClick={toggleOpen}
          >
            <span>Scorecard</span>
            <FaChevronDown
              className={` transition-transform duration-300 ${
                isOpen ? "rotate-180" : ""
              }`}
            />
          </button>
          {/* </div> */}
          <AnimatePresence>
            {isOpen && (
              <motion.section
                initial={{ opacity: 0, translateY: 100 }}
                animate={{ opacity: 1, translateY: 0 }}
                exit={{ opacity: 0, translateY: 100 }}
                duration={{ duration: 0.3, easeInOut }}
              >
                <div className="grid grid-cols-9 gap-2 ">
                  <FrontNine playerScore={playerScore} />
                </div>
                <div className="grid grid-cols-9 gap-2">
                  <BackNine playerScore={playerScore} />
                </div>
              </motion.section>
            )}
          </AnimatePresence>
          <p>{currentScore}</p>
        </section>
      )}
    </main>
  );
}

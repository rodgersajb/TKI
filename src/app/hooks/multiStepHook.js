"use client";

import { useState } from "react";

export default function useMultiStep(steps) {
    // keep track of current step
    const [currentStepIndex, setCurrentStepIndex] = useState(0);

    function nextStep() {
        setCurrentStepIndex((i) => {
            //if we are at the end of the steps we will go no further
            if (i >= currentStepIndex.length) return i;
            // if there are steps to go we proceed to the next step
            return i + 1; 
        });
    }

    function previousStep() {
        setCurrentStepIndex((i) => {
            // if we are at the beginning of the steps we will go no further
            if (i <= 0) return i;
            // if there are steps to go we proceed to the previous step
            return i - 1;
        });
    }
    function goToStep(index) {
        setCurrentStepIndex(index);
    }
    // return our functions and the current step index
    return {
        currentStepIndex,
        nextStep,
        previousStep,
        goToStep,
        steps,
    }
}

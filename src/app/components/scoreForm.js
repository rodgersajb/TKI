"use client";

import { useRef } from "react";
import ScoreButton from "./scoreButton";
import { addScore } from "../actions/actions";
import toast from "react-hot-toast";

import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";

export default function ScoreForm({ courseNames }) {


  
  const ref = useRef(null);

  return (
    <form
      ref={ref}
      
      action={async (formData) => {
        ref.current?.reset();

        const score = await addScore(formData);
        if (score?.error) {
          toast.error(score.error);
        } else {
          console.log("something")
        }
        // input validation

        await addScore(formData);
      }}
      className=""
    >
      <label htmlFor="course">Course</label>
      <select className="text-purple-500" name="course" id="course" required>
        <option>---Select a course, Bills</option>
        {/* {courseNames.map((courseName) => (
          <option key={courseName} value={courseName}>
            {courseName}
          </option>
        ))} */}
      </select>
      {/* <input
          className="text-purple-500"
          type="text"
          name="course"
          id="course"
        /> */}
      <label htmlFor="score">Score</label>
      <input
        className="text-purple-500"
        type="number"
        name="score"
        id="score"
        required
      />
      <label htmlFor="notes">Notes</label>
      <textarea className="text-purple-500" name="notes" id="notes" />
      <ScoreButton />
    </form>
  );
}

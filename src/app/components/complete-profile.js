"use client";
import ScoreButton from "./scoreButton";
import { updatePlayerProfile } from "../actions/actions";
import { useRef } from "react";

import toast from "react-hot-toast";



export default function CompleteProfile() {
  const ref = useRef(null);
 

  return (
    <form
    className="w-[95%] m-auto flex flex-col items-center justify-center"
      ref={ref}
      action={async (formData) => {
        ref.current?.reset();
        const profile = await updatePlayerProfile(formData);
        if (profile?.error) {
          toast.error(profile.error);
        } else {
          toast.success(profile.success);
         
        }
        await updatePlayerProfile(formData);
        
      }}
    >
      <div className="flex flex-col items-center  justify-center gap-4">
        <label htmlFor="handicap">Please enter your handicap</label>
        <input type="number" name="handicap" required />
        <label htmlFor="image">Let's see that beautiful face</label>
        <input type="file" name="image" />
      </div>
      <ScoreButton />
    </form>
  );
}

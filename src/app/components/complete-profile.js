"use client";

import { updatePlayerProfile } from "../actions/actions";
import { useRef } from "react";

import Image from "next/image";

import toast from "react-hot-toast";
import SignUpButton from "./submitButton";

export default function CompleteProfile() {
  const ref = useRef(null);

  return (
    <form
      className="w-[75%] m-auto flex flex-col items-center justify-center gap-4 pt-4"
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
      <div className="flex flex-col items-center justify-center gap-4 w-full m-auto">
        <div className="flex flex-col items-start gap-2 w-full m-auto">
          <label
            style={{ borderRadius: "0.2rem" }}
            className="text-kobeWhite bg-kobePurple w-full p-1"
            htmlFor="handicap"
          >
            Please enter your handicap for Six Foot Bay Golf Club:
          </label>
          <input
            className="w-1/5 outline-none"
            type="number"
            name="sixFootHandicap"
            required
          />
          <label
            style={{ borderRadius: "0.2rem" }}
            className="text-kobeWhite bg-kobePurple w-full p-1"
            htmlFor="handicap"
          >
            Please enter your handicap for Quarry Golf Club:
          </label>
          <input
            className="w-1/5 outline-none"
            type="number"
            name="quarryHandicap"
            required
          />
        </div>

        <div className="flex flex-col items-start gap-2 w-full">
          <label
            style={{ borderRadius: "0.2rem" }}
            className="text-kobeWhite bg-kobePurple w-full p-1"
            htmlFor="bio"
          >
            Bio, or fighting words:
          </label>
          <textarea
            className="w-full outline-none"
            name="bio"
            placeholder="ie. My name is Brandon... "
          />
        </div>
      </div>

      <SignUpButton />
    </form>
  );
}

"use client";

export default function HoleInfo({ hole }) {
    return (
    <div style={{ borderRadius: "0.2rem" }} className="w-[95%] m-auto bg-kobeWhite drop-shadow-md flex flex-col items-center">
      <h3 className="text-kobePurple">#{hole.number}</h3>
      <p>Par {hole.par}</p>
      <div className="flex gap-2">
        <p>HDCP {hole.handicap}</p>
        <p>{hole.yardage} Yards</p>
      </div>
    </div>
  );
};
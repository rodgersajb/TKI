import PastResults from "../schema/past-results";
import connect from "../lib/mongoose";

import SelectYear from "./components/select";

import Image from "next/image";

export default async function PastScores() {
  await connect();

  const pastResults = await PastResults.find().lean();
  console.log(pastResults);

  const plainResults = pastResults.map((result) => ({
    ...result,
    _id: result._id.toString(), // Convert ObjectId to string
  }));

  return (
    <>
      <main className="w-full">
        <figure className="relative w-full min-h-[300px]">
          <Image
            fill
            src="/img/foggy green.jpg 
          "
            style={{ clipPath: "  circle(70.7% at 50% 11%)" }}
          />
          
        </figure>
        <h1 className="text-center text-3xl text-kobePurple">Past Results</h1>
        <SelectYear plainResults={plainResults} />
      </main>
    </>
  );
}

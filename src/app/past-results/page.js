

import PastResults from "../schema/past-results";
import connect from "../lib/mongoose";
import Header from "../components/header";
import SelectYear from "./components/select";

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
      <Header />
      <main>
        <h1>Past Results</h1>
        <SelectYear plainResults={plainResults}/>

      </main>
    </>
  );
}

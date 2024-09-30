import CompleteProfile from "../components/complete-profile";
import Image from "next/image";

export default async function PlayerProfile() {
  return (
    <main className="w-full m-auto flex flex-col ">
      <div className=" ">
        <h1 className="text-2xl text-center py-4 text-kobePurple">A few more things...</h1>
      </div>
      {/* <figure className="relative  h-[200px] w-full">
        <Image src="/img/prov1.jpg" fill objectFit="cover" />
      </figure> */}
      <CompleteProfile />
    </main>
  );
}

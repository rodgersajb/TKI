import Image from "next/image";


export default function Home() {
  return (
    <main className="flex min-h-svh flex-col  w-[95%] mx-auto ">
      
      <div className="grid items-center justify-center h-[200px]">
        <h1 className="">Welcome Billies, to the 2024 Kobe Invitational</h1>
        
      </div>
      <figure className="relative flex justify-end">
        <Image
          src="/img/smitty.jpg"
          alt="Kobe Bryant"
          layout="responsive"
          width={300}
          height={200}
        />
      </figure>
    </main>
  );
}

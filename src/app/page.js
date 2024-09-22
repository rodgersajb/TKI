import Image from "next/image";


export default function Home() {
  return (
    <main className="flex min-h-svh flex-col  w-full mx-auto ">
      <figure className="relative h-[300px] ">
        <Image
          src="/img/golf-ball.jpg"
          alt="teed up golf ball"
          layout="responsive"
          width={300}
          height={200}
          className="z-50"
          style={{ clipPath: "  circle(70.7% at 50% 11%)" }}
        />
        <div
          className="absolute -z-10 top-1 h-full w-full bg-kobeWhite"
          style={{ clipPath: "  circle(70.7% at 50% 11%)" }}
        ></div>
        <div
          className=" absolute -z-20 top-3 h-full w-full bg-gradient-to-r from-kobePurple to-kobeYellow"
          style={{ clipPath: "  circle(70.7% at 50% 11%)" }}
        >
          {" "}
        </div>      
        
      </figure>
      <section className="w-full flex flex-col items-center">
        <h4 className="text-kobePurple">04 - 06 October 2024</h4>
        <h3 className="text-xl font-bold">The Kobe Invitational</h3>
        <h5>Six Foot Bay Golf Club, Buckhorn, ON</h5>
        <h5>Quarry Golf Club, Ennismore, ON</h5>
      </section>
    </main>
  );
}

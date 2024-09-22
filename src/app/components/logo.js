import Image from "next/image";

export default async function Logo() {
  return (
    <figure className=" ">
      <Image
        src="/img/kobe-logo.png"
        alt="Kobe Bryant"
        width={50}
        height={50}
      />
    </figure>
  );
}

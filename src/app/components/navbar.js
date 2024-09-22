


import Nav from "./nav";
import Header from "./header";
import Logo from "./logo";




export default async function Navbar() {
  

  return (
    <main className="w-[95%] m-auto flex justify-between items-center ">
      <Nav />
      <Logo />
      <Header />
    </main>
  );
}

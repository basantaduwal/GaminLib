import React from "react";
import Landing from "./components/Home/Landing";
import ShortInfo from "./components/Home/ShortInfo";
import Image from "next/image";

const Home = () => {
  return (
    <div className="relative  ">
      <Image
        src="/images/bg.jpg"
        alt="Background Image"
        layout="fill"
        objectFit="cover"
        className="fixed top-0 left-0 w-full h-full -z-10"
      />
      <div className="fixed top-0 left-0 w-full h-full bg-gradient-to-b from-black/60 via-black/50 to-black/60 -z-10" />
      <div className="relative z-10 ">
        <Landing />
        <ShortInfo />
      </div>
    </div>
  );
};

export default Home;
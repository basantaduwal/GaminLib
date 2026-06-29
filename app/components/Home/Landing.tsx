import { Plus, View } from "lucide-react";
import Link from "next/link";
import React from "react";

const Landing = () => {
  return (
    <div className="w-full h-130 flex items-center justify-center py-20">
      <div className="flex items-center flex-col">
        <h1 className="font-[Orbitron] text-[100px] px-100 text-center leading-25 font-bold  text-blue-100 drop-shadow-lg">
          Your Gaming Universe
        </h1>
        <p className="font-[JetMono] text-2xl mt-2 tracking-tighter text-blue-300 text-center max-w-2xl drop-shadow-lg">
          Track every <span className="text-black bg-cyan-500">adventure</span>,
          every <span className="text-black bg-lime-500">victory</span>, every
          wishlist <span className="text-black bg-pink-500 px-2">dream</span>
        </p>
        <div className="flex mt-5 gap-10">
          <Link href={'/page/library'} className="px-10 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-bold font-[Orbitron] rounded-lg hover:shadow-lg hover:shadow-cyan-500/50 flex items-center gap-2 transition-all">
           <View /> View Library
          </Link>
          <Link href={'/page/addgame'} className="px-10 py-3 border-2 border-lime-400 text-lime-300 font-bold font-[Orbitron] flex items-center gap-2 rounded-lg hover:bg-lime-400/10 transition-all">
           <Plus /> Add game
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Landing;

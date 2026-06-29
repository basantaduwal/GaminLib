"use client";
import React from "react";
import { useGameStore } from "@/app/Store/gameStore";

const ShortInfo = () => {
  const { games } = useGameStore();

  const completedCount = games.filter(
    (game) => game.state === "completed",
  ).length;
  const playingCount = games.filter((game) => game.state === "playing").length;
  const newCount = games.filter((game) => game.state === "new").length;
  const totalGame = games.length;

  return (
    <div className="w-full h-[calc(100vh-520px)] flex gap-4 p-6">
      <div className="flex-1 bg-gradient-to-br from-purple-600 to-purple-800 flex flex-col items-center justify-center font-[Syne] p-6 shadow-lg rounded-lg border border-cyan-400/50">
        <p className="text-cyan-300 text-5xl font-bold drop-shadow-lg">{totalGame}</p>
        <h3 className="text-cyan-200 text-lg font-bold mt-2 tracking-wider">TOTAL</h3>
      </div>
      <div className="flex-1 bg-gradient-to-br from-blue-600 to-blue-800 flex flex-col items-center justify-center font-[Syne] p-6 shadow-lg rounded-lg border border-lime-400/50">
        <p className="text-lime-300 text-5xl font-bold drop-shadow-lg">{completedCount}</p>
        <h3 className="text-lime-200 text-lg font-bold mt-2 tracking-wider">COMPLETED</h3>
      </div>
      <div className="flex-1 bg-gradient-to-br from-pink-600 to-pink-800 flex flex-col items-center justify-center font-[Syne] p-6 shadow-lg rounded-lg border border-yellow-300/50">
        <p className="text-yellow-300 text-5xl font-bold drop-shadow-lg">{playingCount}</p>
        <h3 className="text-yellow-200 text-lg font-bold mt-2 tracking-wider">PLAYING</h3>
      </div>
      <div className="flex-1 bg-gradient-to-br from-indigo-600 to-indigo-800 flex flex-col items-center justify-center font-[Syne] p-6 shadow-lg rounded-lg border border-pink-400/50">
        <p className="text-pink-300 text-5xl font-bold drop-shadow-lg">{newCount}</p>
        <h3 className="text-pink-200 text-lg font-bold mt-2 tracking-wider">NEW</h3>
      </div>
    </div>
  );
};

export default ShortInfo;

"use client";
import { useGameStore } from "@/app/Store/gameStore";
import React, { useState } from "react";

const Library = () => {
  const { games, removeGame } = useGameStore();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");

  const total = games.length;
  
  // Extract unique genres
  const genres = games
    .map(game => game.genre)
    .filter((value, index, self) => self.indexOf(value) === index && value);
  
  // Extract unique statuses
  const statuses = games
    .map(game => game.state)
    .filter((value, index, self) => self.indexOf(value) === index && value);

  // Filter games based on search and filters
  const filteredGames = games.filter(game => {
    const matchesSearch = game.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesGenre = !selectedGenre || game.genre === selectedGenre;
    const matchesStatus = !selectedStatus || game.state === selectedStatus;
    
    return matchesSearch && matchesGenre && matchesStatus;
  });

  return (
    <div className="py-25 px-10 w-full min-h-screen bg-[#05050F]">
      <h1 className="font-[Orbitron] text-[30px] font-extrabold text-white/70">
        Your Uniqueverse <span className="text-[25px] font-[JetItalic]">({filteredGames.length}/{total})</span>
      </h1>
      <div className="flex items-center gap-10 justify-between">
        <input 
          type="text" 
          placeholder="Search your games..." 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full mt-5 p-3 rounded-lg bg-[#1E1E2F] text-white/70 focus:outline-none focus:ring-2 focus:ring-blue-500" 
        />
        
        {/* Filters */}
        <div className="mt-6 w-100 flex items-center gap-4">
          <div className="flex-1">
            <select 
              value={selectedGenre}
              onChange={(e) => setSelectedGenre(e.target.value)}
              className="w-full bg-[#1E1E2F] border border-slate-700 text-white/70 p-3 rounded focus:outline-none focus:border-cyan-400"
            >
              <option value="">Genre</option>
              {genres.map(genre => (
                <option key={genre} value={genre}>{genre}</option>
              ))}
            </select>
          </div>
          
          <div className="flex-1">
        
            <select 
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full bg-[#1E1E2F] border border-slate-700 text-white/70 p-3 rounded focus:outline-none focus:border-cyan-400"
            >
              <option value="">Status</option>
              {statuses.map(status => (
                <option key={status} value={status}>
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
      <div>
        {filteredGames.length > 0 ? (
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredGames.map(game => (  
              <div key={game.id} className="bg-[#1E1E2F] rounded-lg overflow-hidden shadow-lg">
                
                <div className="p-4">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h2 className="text-lg font-bold text-white/70">{game.title}</h2>
                      <p className="text-sm text-gray-400">{game.genre} | {game.state.charAt(0).toUpperCase() + game.state.slice(1)}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeGame(game.id)}
                      className="rounded-2xl border border-red-500/30 bg-red-500/10 px-3 py-2 text-xs font-semibold text-red-300 transition hover:bg-red-500/20 hover:text-red-100"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="mt-10 text-center text-gray-400">No games found. Try adjusting your search or filters.</p>
        )}
      </div>
    </div>
  );
};

export default Library;
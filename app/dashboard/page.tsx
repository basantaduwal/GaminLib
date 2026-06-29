"use client"

import React, { useMemo } from "react"
import { useGameStore } from "@/app/Store/gameStore"

const DashboardPage = () => {
  const { games, removeGame } = useGameStore()

  const totalGames = games.length
  const completedCount = games.filter(game => game.state === "completed").length
  const playingCount = games.filter(game => game.state === "playing").length
  const newCount = games.filter(game => game.state === "new").length

  const genreCounts = useMemo(() => {
    return games.reduce<Record<string, number>>((acc, game) => {
      acc[game.genre] = (acc[game.genre] ?? 0) + 1
      return acc
    }, {})
  }, [games])

  const sortedGenres = useMemo(
    () => Object.entries(genreCounts).sort((a, b) => b[1] - a[1]),
    [genreCounts]
  )

  const latestGames = useMemo(
    () => [...games].sort((a, b) => new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime()).slice(0, 4),
    [games]
  )

  return (
    <main className="min-h-screen w-full bg-[#05050F] pt-32 pb-20 px-6 sm:px-10">
      <div className="mx-auto max-w-7xl">
        <section className="mb-10 flex flex-col gap-5 rounded-3xl border border-cyan-500/20 bg-white/5 p-6 shadow-2xl shadow-cyan-500/5 sm:p-8">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.35em] text-cyan-400/80">Player Hub</p>
              <h1 className="mt-3 text-4xl font-[Orbitron] font-extrabold text-white sm:text-5xl">Dashboard</h1>
              <p className="mt-4 max-w-2xl text-sm text-slate-300 sm:text-base">
                Overview of your collection, progress, and recent titles in your Uniqueverse.
              </p>
            </div>
            <div className="rounded-3xl bg-[#08101F] p-4 text-slate-200 shadow-inner shadow-slate-900/30 sm:w-80">
              <p className="text-xs uppercase tracking-[0.4em] text-cyan-400/80">Current collection</p>
              <p className="mt-4 text-4xl font-[Orbitron] font-bold text-white">{totalGames}</p>
              <p className="mt-2 text-sm text-slate-400">Total games stored in your library</p>
            </div>
          </div>
        </section>

        <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <div className="rounded-3xl border border-cyan-500/10 bg-[#0D1222] p-6 shadow-lg shadow-cyan-500/5">
            <p className="text-sm uppercase tracking-[0.35em] text-cyan-300/80">Completed</p>
            <p className="mt-4 text-4xl font-[Orbitron] font-bold text-lime-300">{completedCount}</p>
            <p className="mt-2 text-sm text-slate-400">Titles you have finished</p>
          </div>

          <div className="rounded-3xl border border-cyan-500/10 bg-[#0D1222] p-6 shadow-lg shadow-cyan-500/5">
            <p className="text-sm uppercase tracking-[0.35em] text-cyan-300/80">Playing</p>
            <p className="mt-4 text-4xl font-[Orbitron] font-bold text-blue-300">{playingCount}</p>
            <p className="mt-2 text-sm text-slate-400">Titles currently in progress</p>
          </div>

          <div className="rounded-3xl border border-cyan-500/10 bg-[#0D1222] p-6 shadow-lg shadow-cyan-500/5">
            <p className="text-sm uppercase tracking-[0.35em] text-cyan-300/80">New</p>
            <p className="mt-4 text-4xl font-[Orbitron] font-bold text-fuchsia-300">{newCount}</p>
            <p className="mt-2 text-sm text-slate-400">Fresh titles waiting to be played</p>
          </div>

          <div className="rounded-3xl border border-cyan-500/10 bg-[#0D1222] p-6 shadow-lg shadow-cyan-500/5">
            <p className="text-sm uppercase tracking-[0.35em] text-cyan-300/80">Genres</p>
            <p className="mt-4 text-4xl font-[Orbitron] font-bold text-cyan-300">{sortedGenres.length}</p>
            <p className="mt-2 text-sm text-slate-400">Different genre categories in your library</p>
          </div>
        </section>

        <section className="mt-8 grid gap-6 xl:grid-cols-[1.4fr_0.8fr]">
          <div className="rounded-3xl border border-cyan-500/10 bg-[#0D1222] p-6 shadow-lg shadow-cyan-500/5">
            <div className="flex items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold text-white">Latest additions</h2>
                <p className="mt-2 text-sm text-slate-400">Recently added titles from your collection.</p>
              </div>
              <span className="rounded-full bg-cyan-500/15 px-3 py-1 text-xs uppercase tracking-[0.35em] text-cyan-200">Top 4</span>
            </div>

            <div className="mt-6 grid gap-4">
              {latestGames.map(game => (
                <div key={game.id} className="flex flex-col gap-4 rounded-3xl border border-slate-800 bg-[#08101F] p-4 sm:flex-row sm:items-center">
                  <div className="h-28 w-full overflow-hidden rounded-3xl bg-slate-900 sm:h-24 sm:w-24">
                    <img
                      src={game.imageUrl}
                      alt={game.title}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <p className="text-lg font-semibold text-white">{game.title}</p>
                    <p className="mt-1 text-sm text-slate-400">{game.genre} • {game.state.charAt(0).toUpperCase() + game.state.slice(1)}</p>
                    <p className="mt-3 text-sm text-slate-400">Released: {new Date(game.releaseDate).toLocaleDateString()}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeGame(game.id)}
                    className="whitespace-nowrap rounded-2xl border border-red-500/30 bg-red-500/10 px-4 py-2 text-sm font-semibold text-red-300 transition hover:bg-red-500/20 hover:text-red-100"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-3xl border border-cyan-500/10 bg-[#0D1222] p-6 shadow-lg shadow-cyan-500/5">
              <h2 className="text-2xl font-bold text-white">Genre breakdown</h2>
              <div className="mt-6 space-y-4">
                {sortedGenres.length > 0 ? (
                  sortedGenres.map(([genre, count]) => {
                    const ratio = Math.round((count / totalGames) * 100)
                    return (
                      <div key={genre} className="space-y-2">
                        <div className="flex items-center justify-between text-sm text-slate-300">
                          <span>{genre}</span>
                          <span>{count} game{count > 1 ? "s" : ""}</span>
                        </div>
                        <div className="h-2 overflow-hidden rounded-full bg-slate-800">
                          <div className="h-full rounded-full bg-cyan-400" style={{ width: `${ratio}%` }} />
                        </div>
                      </div>
                    )
                  })
                ) : (
                  <p className="text-slate-400">No genre data available.</p>
                )}
              </div>
            </div>

            <div className="rounded-3xl border border-cyan-500/10 bg-[#0D1222] p-6 shadow-lg shadow-cyan-500/5">
              <h2 className="text-2xl font-bold text-white">Play state summary</h2>
              <div className="mt-6 space-y-4">
                {[
                  { label: "Completed", count: completedCount, color: "bg-lime-400/90" },
                  { label: "Playing", count: playingCount, color: "bg-blue-400/90" },
                  { label: "New", count: newCount, color: "bg-fuchsia-400/90" },
                ].map(({ label, count, color }) => (
                  <div key={label} className="rounded-3xl bg-[#08101F] p-4">
                    <div className="flex items-center justify-between gap-4">
                      <span className="text-sm text-slate-300">{label}</span>
                      <span className="text-lg font-bold text-white">{count}</span>
                    </div>
                    <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-900">
                      <div className={`h-full rounded-full ${color}`} style={{ width: `${Math.round((count / Math.max(totalGames, 1)) * 100)}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="mt-8 rounded-3xl border border-cyan-500/10 bg-[#0D1222] p-6 shadow-lg shadow-cyan-500/5">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-white">Manage library</h2>
              <p className="mt-2 text-sm text-slate-400">Remove any game you no longer want in your collection.</p>
            </div>
            <span className="rounded-full bg-cyan-500/15 px-3 py-1 text-xs uppercase tracking-[0.35em] text-cyan-200">Editable</span>
          </div>

          <div className="mt-6 grid gap-4">
            {games.length > 0 ? (
              games.map(game => (
                <div key={game.id} className="flex flex-col gap-4 rounded-3xl border border-slate-800 bg-[#08101F] p-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-base font-semibold text-white">{game.title}</p>
                    <p className="mt-1 text-sm text-slate-400">{game.genre} • {game.state.charAt(0).toUpperCase() + game.state.slice(1)}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeGame(game.id)}
                    className="rounded-2xl border border-red-500/30 bg-red-500/10 px-4 py-2 text-sm font-semibold text-red-300 transition hover:bg-red-500/20 hover:text-red-100"
                  >
                    Remove from library
                  </button>
                </div>
              ))
            ) : (
              <p className="text-slate-400">Your library is empty. Add new games from the Import Game page.</p>
            )}
          </div>
        </section>
      </div>
    </main>
  )
}

export default DashboardPage

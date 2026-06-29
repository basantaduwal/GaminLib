import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface Game {
  id: number
  title: string
  description: string
  genre: string
  state: 'completed' | 'playing' | 'new'
  releaseDate: string
  imageUrl: string
}

interface GameState {
  games: Game[]
  setGames: (games: Game[]) => void
}

const dummyGames: Game[] = [
  {
    id: 1,
    title: 'The Legend of Zelda: Breath of the Wild',
    description: 'An open-world adventure game',
    genre: 'Adventure',
    state: 'completed',
    releaseDate: '2017-03-03',
    imageUrl: '/games/zelda.jpg',
  },
  {
    id: 2,
    title: 'Elden Ring',
    description: 'A challenging action RPG',
    genre: 'RPG',
    state: 'playing',
    releaseDate: '2022-02-25',
    imageUrl: '/games/elden-ring.jpg',
  },
  {
    id: 3,
    title: 'Starfield',
    description: 'A space exploration RPG',
    genre: 'RPG',
    state: 'new',
    releaseDate: '2023-09-06',
    imageUrl: '/games/starfield.jpg',
  },
  {
    id: 4,
    title: 'Cyberpunk 2077',
    description: 'A futuristic action RPG',
    genre: 'Action',
    state: 'completed',
    releaseDate: '2020-12-10',
    imageUrl: '/games/cyberpunk.jpg',
  },
  {
    id: 5,
    title: 'Baldur\'s Gate 3',
    description: 'A story-driven fantasy RPG',
    genre: 'RPG',
    state: 'playing',
    releaseDate: '2023-08-03',
    imageUrl: '/games/baldurs-gate-3.jpg',
  },
  {
    id: 6,
    title: 'Dragon\'s Dogma 2',
    description: 'An action fantasy game',
    genre: 'Action',
    state: 'new',
    releaseDate: '2024-03-22',
    imageUrl: '/games/dragons-dogma-2.jpg',
  },
]

export const useGameStore = create<GameState>((set)=>({
  games: dummyGames,
  setGames: (games: Game[]) => set({ games }),
}))
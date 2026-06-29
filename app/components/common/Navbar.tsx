'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

const Navbar = () => {
  const pathname = usePathname()

  const isActive = (href: string) => pathname === href

  return (
    <nav className='fixed top-0 left-0 right-0 w-full py-5 bg-black/50 border-b-2 border-cyan-500/50 flex items-center justify-between px-8 z-50'>
      {/* Logo */}
      <Link href="/" className='flex items-center gap-2'>
        <h1 className='font-[Orbitron] text-3xl font-bold text-blue-600 hover:drop-shadow-lg transition-all'>
          GaminLib
        </h1>
      </Link>

      {/* Navigation Links */}
      <div className='flex items-center gap-10'>
        <Link href="/" className={`font-[JetMono] text-lg transition-colors hover:drop-shadow-lg ${isActive('/') ? 'text-lime-300 font-bold' : 'text-cyan-300 hover:text-lime-300'}`}>
          Home
        </Link>
        <Link href="/page/library" className={`font-[JetMono] text-lg transition-colors hover:drop-shadow-lg ${isActive('/library') ? 'text-lime-300 font-bold' : 'text-cyan-300 hover:text-lime-300'}`}>
          Library
        </Link>
        <Link href="/dashboard" className={`font-[JetMono] text-lg transition-colors hover:drop-shadow-lg ${isActive('/dashboard') ? 'text-lime-300 font-bold' : 'text-cyan-300 hover:text-lime-300'}`}>
          Dashboard
        </Link>
        <Link href="/page/addgame" className={`font-[JetMono] text-lg transition-colors hover:drop-shadow-lg ${isActive('/page/addgame') ? 'text-lime-300 font-bold' : 'text-cyan-300 hover:text-lime-300'}`}>
          Import Game
        </Link>
      </div>

      {/* Login Button */}
      <Link href="/login" className='px-6 py-2 bg-gradient-to-r from-lime-500 to-cyan-500 text-slate-900 font-bold rounded-lg hover:shadow-lg hover:shadow-lime-500/50 transition-all hover:scale-105 font-[JetMono]'>
        Login
      </Link>
    </nav>
  )
}

export default Navbar
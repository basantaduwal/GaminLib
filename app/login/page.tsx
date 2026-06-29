import React from "react"

const LoginPage = () => {
  return (
    <main className="min-h-screen flex items-center justify-center bg-slate-900 text-slate-100 px-4">
      <div className="w-full max-w-md rounded-3xl border border-cyan-500/40 bg-slate-950/90 p-10 shadow-2xl shadow-cyan-500/10">
        <h1 className="text-4xl font-bold text-cyan-300 mb-4">Login</h1>
        <p className="text-slate-400 mb-8">
          This is a placeholder login page. Add authentication logic here.
        </p>
        <form className="space-y-5">
          <label className="block text-sm text-slate-300">
            Email
            <input
              type="email"
              className="mt-2 w-full rounded-2xl border border-slate-700 bg-slate-900 px-4 py-3 text-slate-100 outline-none transition focus:border-cyan-400"
              placeholder="you@example.com"
            />
          </label>
          <label className="block text-sm text-slate-300">
            Password
            <input
              type="password"
              className="mt-2 w-full rounded-2xl border border-slate-700 bg-slate-900 px-4 py-3 text-slate-100 outline-none transition focus:border-cyan-400"
              placeholder="••••••••"
            />
          </label>
          <button
            type="button"
            className="w-full rounded-2xl bg-cyan-500 px-4 py-3 text-slate-950 font-bold transition hover:bg-cyan-400"
          >
            Continue
          </button>
        </form>
      </div>
    </main>
  )
}

export default LoginPage

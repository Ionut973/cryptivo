"use client";

import { useState } from "react";
import AuthCryptoBackground from "@/components/AuthCryptoBackground";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();

    setLoading(true);
    setError("");

    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const text = await res.text();

    setLoading(false);

    if (res.ok) {
      window.location.href = "/profile";
    } else {
      setError(text || "Login error");
    }
  }

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-zinc-950 px-6 py-20 text-white">
      <AuthCryptoBackground />

      <div className="absolute left-[-120px] top-[-120px] h-[320px] w-[320px] rounded-full bg-green-500/20 blur-3xl" />
      <div className="absolute bottom-[-120px] right-[-120px] h-[320px] w-[320px] rounded-full bg-blue-500/20 blur-3xl" />

      <div className="relative z-10 w-full max-w-md rounded-3xl border border-zinc-800 bg-zinc-900/90 p-8 shadow-[0_0_80px_rgba(0,0,0,0.6)] backdrop-blur-xl">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.35em] text-green-400">
              CRYPTIVO
            </p>

            <h1 className="mt-3 text-4xl font-black">
              Welcome back
            </h1>

            <p className="mt-2 text-sm text-zinc-400">
              Login to your crypto account
            </p>
          </div>

          <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-green-500/30 bg-green-500/10 text-3xl shadow-lg shadow-green-500/20">
            ₿
          </div>
        </div>

        {error && (
          <div className="mt-6 rounded-2xl border border-red-500/30 bg-red-500/10 p-4 text-sm font-bold text-red-300">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="mt-8 space-y-5">
          <div>
            <p className="mb-2 text-xs font-bold uppercase tracking-[0.25em] text-zinc-500">
              Email
            </p>

            <input
              type="email"
              required
              placeholder="you@example.com"
              className="w-full rounded-2xl border border-zinc-700 bg-black/70 px-5 py-4 text-sm outline-none transition focus:border-green-400 focus:ring-2 focus:ring-green-500/20"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <p className="mb-2 text-xs font-bold uppercase tracking-[0.25em] text-zinc-500">
              Password
            </p>

            <input
              type="password"
              required
              placeholder="••••••••"
              className="w-full rounded-2xl border border-zinc-700 bg-black/70 px-5 py-4 text-sm outline-none transition focus:border-green-400 focus:ring-2 focus:ring-green-500/20"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            disabled={loading}
            className="group relative w-full overflow-hidden rounded-2xl bg-green-500 py-4 text-sm font-black text-black transition hover:bg-green-400 disabled:opacity-60"
          >
            <span className="relative z-10">
              {loading ? "CONNECTING..." : "LOGIN"}
            </span>

            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 transition group-hover:translate-x-full group-hover:opacity-100" />
          </button>
        </form>

        <div className="mt-8 grid grid-cols-3 gap-3">
          <div className="rounded-2xl border border-zinc-800 bg-black/60 p-3 text-center">
            <p className="text-lg font-black text-green-400">₿</p>
            <p className="mt-1 text-[10px] font-bold text-zinc-500">
              BTC
            </p>
          </div>

          <div className="rounded-2xl border border-zinc-800 bg-black/60 p-3 text-center">
            <p className="text-lg font-black text-green-400">Ξ</p>
            <p className="mt-1 text-[10px] font-bold text-zinc-500">
              ETH
            </p>
          </div>

          <div className="rounded-2xl border border-zinc-800 bg-black/60 p-3 text-center">
            <p className="text-lg font-black text-green-400">◎</p>
            <p className="mt-1 text-[10px] font-bold text-zinc-500">
              SOL
            </p>
          </div>
        </div>

        <a
          href="/register"
          className="mt-6 block text-center text-sm font-bold text-zinc-400 transition hover:text-green-400"
        >
          Don’t have an account? Register →
        </a>
      </div>
    </main>
  );
}
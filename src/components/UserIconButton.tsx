"use client";

import { useState } from "react";
import { User } from "lucide-react";

export default function UserIconButton({
  loggedIn,
}: {
  loggedIn: boolean;
}) {
  const [open, setOpen] = useState(false);

  async function handleLogout() {
    await fetch("/api/logout", { method: "POST" });
    window.location.reload();
  }

  return (
    <div className="relative">
      {/* ИКОНКА */}
      <button
        onClick={() => setOpen(!open)}
        className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-zinc-700 to-zinc-900 hover:scale-105"
      >
        <User className="h-5 w-5 text-white" />
      </button>

      {/* МЕНЮ */}
      {open && (
        <div className="absolute right-0 mt-2 w-40 rounded-xl border border-zinc-800 bg-zinc-900 shadow-xl">
          {!loggedIn ? (
            <>
              <a
                href="/login"
                className="block px-4 py-2 text-sm hover:bg-zinc-800"
              >
                Login
              </a>
              <a
                href="/register"
                className="block px-4 py-2 text-sm hover:bg-zinc-800"
              >
                Register
              </a>
            </>
          ) : (
            <>
              <a
                href="/profile"
                className="block px-4 py-2 text-sm hover:bg-zinc-800"
              >
                Profile
              </a>
              <button
                onClick={handleLogout}
                className="block w-full text-left px-4 py-2 text-sm hover:bg-zinc-800"
              >
                Logout
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
}
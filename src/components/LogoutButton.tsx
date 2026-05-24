"use client";

export default function LogoutButton() {
  async function handleLogout() {
    await fetch("/api/logout", {
      method: "POST",
    });

    window.location.href = "/";
  }

  return (
    <button
      onClick={handleLogout}
      className="rounded-xl border border-zinc-700 px-4 py-2 text-sm hover:bg-zinc-800"
    >
      Logout
    </button>
  );
}
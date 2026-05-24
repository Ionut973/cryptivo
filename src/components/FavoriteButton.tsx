"use client";

import { useState } from "react";

export default function FavoriteButton({
  productId,
  label = "Favorite",
}: {
  productId: string;
  label?: string;
}) {
  const [loading, setLoading] = useState(false);

  async function toggleFavorite() {
    setLoading(true);

    const res = await fetch("/api/favorites", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ productId }),
    });

    if (res.ok) {
      window.location.reload();
    } else {
      alert("Login required");
      window.location.href = "/login";
    }

    setLoading(false);
  }

  return (
    <button
      onClick={toggleFavorite}
      disabled={loading}
      className="rounded-xl border border-zinc-700 px-4 py-2 text-sm text-white"
    >
      {loading ? "..." : label === "Favorite" ? "♡" : label}
    </button>
  );
}
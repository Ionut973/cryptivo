"use client";

import { useState } from "react";

export default function ProductColorPicker({ colors }: { colors: string[] }) {
  const [selected, setSelected] = useState(colors[0] || "");

  return (
    <div className="mt-6">
      <p className="mb-3 text-sm font-bold uppercase tracking-[0.25em] text-green-400">
        Colors
      </p>

      <div className="flex flex-wrap gap-2">
        {colors.map((color) => (
          <button
            key={color}
            type="button"
            onClick={() => setSelected(color)}
            className={`rounded-full border px-4 py-2 text-sm font-bold transition ${
              selected === color
                ? "border-green-400 bg-green-500 text-black"
                : "border-green-500/30 bg-green-500/10 text-green-400 hover:border-green-400"
            }`}
          >
            {color}
          </button>
        ))}
      </div>

      <p className="mt-3 text-sm text-zinc-400">
        Selected: <span className="font-bold text-green-400">{selected}</span>
      </p>
    </div>
  );
}
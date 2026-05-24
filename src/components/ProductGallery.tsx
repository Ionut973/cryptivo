"use client";

import { useState } from "react";

export default function ProductGallery({
  images,
  name,
}: {
  images: string[];
  name: string;
}) {
  const cleanImages = images.filter(Boolean);

  const [active, setActive] = useState(cleanImages[0] || "");

  return (
    <div className="space-y-4">
      <div className="flex h-[320px] w-full items-center justify-center rounded-3xl bg-black p-3 sm:h-[420px] lg:h-[520px]">
        <img
          src={active}
          alt={name}
          className="max-h-full max-w-full rounded-2xl object-contain"
        />
      </div>

      {cleanImages.length > 1 && (
        <div className="grid grid-cols-3 gap-2 sm:grid-cols-4 sm:gap-3">
          {cleanImages.map((url) => (
            <button
              key={url}
              type="button"
              onClick={() => setActive(url)}
              className={`rounded-2xl border-2 bg-black p-1 transition ${
                active === url
                  ? "border-green-500"
                  : "border-zinc-800"
              }`}
            >
              <img
                src={url}
                alt={name}
                className="h-16 w-full rounded-xl object-cover sm:h-24"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
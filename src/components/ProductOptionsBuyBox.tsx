"use client";

import { useState } from "react";
import FavoriteButton from "@/components/FavoriteButton";
import ShareButton from "@/components/ShareButton";

export default function ProductOptionsBuyBox({
  productId,
  colors,
  sizes,
}: {
  productId: string;
  colors: string;
  sizes: string;
}) {
  const colorList = colors
    ? colors.split(",").map((c) => c.trim()).filter(Boolean)
    : [];

  const sizeList = sizes
    ? sizes.split(",").map((s) => s.trim()).filter(Boolean)
    : [];

  const [selectedColor, setSelectedColor] = useState(colorList[0] || "");
  const [selectedSize, setSelectedSize] = useState(sizeList[0] || "");
  const [loading, setLoading] = useState(false);

  async function addToCart() {
    setLoading(true);

    const res = await fetch("/api/cart", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        productId,
        color: selectedColor,
        size: selectedSize,
      }),
    });

    setLoading(false);

    if (res.ok) {
      alert("Added to basket");
    } else {
      alert(await res.text());
    }
  }

  async function buyNow() {
    setLoading(true);

    const res = await fetch("/api/cart", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        productId,
        color: selectedColor,
        size: selectedSize,
      }),
    });

    setLoading(false);

    if (res.ok) {
      window.location.href = "/checkout";
    } else {
      alert(await res.text());
    }
  }

  return (
    <div className="mt-6">
      {colorList.length > 0 && (
        <div>
          <p className="text-xs font-black uppercase tracking-[0.35em] text-green-400 sm:w-auto">
            Colors
          </p>

          <div className="mt-3 flex flex-wrap gap-2">
            {colorList.map((color) => (
              <button
                key={color}
                type="button"
                onClick={() => setSelectedColor(color)}
                className={`rounded-xl border px-4 py-2 text-sm font-black transition ${
                  selectedColor === color
                    ? "border-green-400 bg-green-500 text-black"
                    : "border-zinc-700 bg-zinc-900 text-white hover:border-green-400"
                }`}
              >
                {color}
              </button>
            ))}
          </div>

          <p className="mt-2 text-xs text-zinc-400 sm:w-auto ">
            Selected color:{" "}
            <span className="font-bold text-green-400 sm:w-auto">{selectedColor}</span>
          </p>
        </div>
      )}

      {sizeList.length > 0 && (
        <div className="mt-5">
          <p className="text-xs font-black uppercase tracking-[0.35em] text-green-400 sm:w-auto">
            Sizes
          </p>

          <div className="mt-3 flex flex-wrap gap-2 ">
            {sizeList.map((size) => (
              <button
                key={size}
                type="button"
                onClick={() => setSelectedSize(size)}
                className={`rounded-xl border px-4 py-2 text-sm font-black transition ${
                  selectedSize === size
                    ? "border-green-400 bg-green-500 text-black"
                    : "border-zinc-700 bg-zinc-900 text-white hover:border-green-400"
                }`}
              >
                {size}
              </button>
            ))}
          </div>

          <p className="mt-2 text-xs text-zinc-400">
            Selected size:{" "}
            <span className="font-bold text-green-400 sm:w-auto">{selectedSize}</span>
          </p>
        </div>
      )}

      <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
        <button
          type="button"
          disabled={loading}
          onClick={addToCart}
          className="rounded-xl bg-white px-5 py-3 text-sm font-black text-black transition hover:bg-green-400 disabled:opacity-60 sm:w-auto"
        >
          Add to basket
        </button>

        <button
          type="button"
          disabled={loading}
          onClick={buyNow}
          className="rounded-xl bg-green-500 px-5 py-3 text-sm font-black text-black transition hover:bg-green-400 disabled:opacity-60 sm:w-auto"
        >
          Buy Now
        </button>

        <FavoriteButton productId={productId} />
        <ShareButton />
      </div>
    </div>
  );
}
"use client";

export default function AddToCartButton({ productId }: { productId: string }) {
  async function addToCart() {
    const res = await fetch("/api/cart", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ productId }),
    });

    if (res.ok) {
      alert("Added to basket");
    } else {
      alert("Login required");
      window.location.href = "/login";
    }
  }

  return (
    <button
      onClick={addToCart}
      className="rounded-xl bg-white px-4 py-2 text-sm text-black"
    >
      Add to bascket
    </button>
  );
}
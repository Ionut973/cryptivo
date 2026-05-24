"use client";

export default function CheckoutButton() {
  return (
    <button
      onClick={() => {
        window.location.href = "/checkout";
      }}
      className="w-full rounded-xl bg-green-500 px-6 py-3 text-sm font-black text-black transition hover:bg-green-400"
    >
      Checkout
    </button>
  );
}
"use client";

export default function CartQuantityButtons({ id }: { id: string }) {
  async function updateQuantity(action: "increase" | "decrease") {
    const res = await fetch(`/api/cart/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ action }),
    });

    if (res.ok) {
      window.location.reload();
    } else {
      alert(await res.text());
    }
  }

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={() => updateQuantity("decrease")}
        className="rounded-lg border border-zinc-700 px-3 py-1"
      >
        -
      </button>

      <button
        onClick={() => updateQuantity("increase")}
        className="rounded-lg border border-zinc-700 px-3 py-1"
      >
        +
      </button>
    </div>
  );
}
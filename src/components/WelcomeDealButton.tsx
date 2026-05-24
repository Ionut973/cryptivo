"use client";

export default function WelcomeDealButton({
  id,
  isWelcomeDeal,
}: {
  id: string;
  isWelcomeDeal: boolean;
}) {
  async function toggle() {
    const discount = prompt("Скидка %", "50");

    const res = await fetch(`/api/admin/products/${id}/welcome-deal`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        isWelcomeDeal: !isWelcomeDeal,
        welcomeDiscount: Number(discount),
      }),
    });

    if (res.ok) {
      window.location.reload();
    } else {
      alert("Ошибка");
    }
  }

  return (
    <button onClick={toggle} className="rounded-lg border px-3 py-2 text-sm">
      {isWelcomeDeal ? "Remove Deal" : "Make Deal"}
    </button>
  );
}
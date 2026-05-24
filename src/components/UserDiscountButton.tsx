"use client";

export default function UserDiscountButton({
  userId,
  currentDiscount,
}: {
  userId: string;
  currentDiscount: number;
}) {
  async function updateDiscount() {
    const value = prompt("Введите скидку %", String(currentDiscount));

    if (value === null) return;

    const res = await fetch(`/api/admin/users/${userId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        loyaltyDiscount: Number(value),
      }),
    });

    if (res.ok) {
      window.location.reload();
    } else {
      alert("Ошибка обновления скидки");
    }
  }

  return (
    <button
      onClick={updateDiscount}
      className="rounded-lg border border-zinc-700 px-3 py-2 text-sm"
    >
      Edit Discount
    </button>
  );
}
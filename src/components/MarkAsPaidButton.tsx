"use client";

export default function MarkAsPaidButton({ orderId }: { orderId: string }) {
  async function handleClick() {
    const res = await fetch(`/api/orders/${orderId}/check`, {
      method: "POST",
    });

    if (res.ok) {
      window.location.href = "/order-success";
    } else {
      alert(await res.text());
    }
  }

  return (
    <button
      onClick={handleClick}
      className="mt-6 w-full rounded-xl bg-yellow-500 py-3 font-bold text-black hover:bg-yellow-400"
    >
      I paid
    </button>
  );
}
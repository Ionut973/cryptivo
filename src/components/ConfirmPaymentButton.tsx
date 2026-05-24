"use client";

export default function ConfirmPaymentButton({ orderId }: { orderId: string }) {
  async function confirmPayment() {
    const res = await fetch(`/api/admin/orders/${orderId}/confirm`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status: "PAID" }),
    });

    if (!res.ok) {
      alert(await res.text());
      return;
    }

    window.location.reload();
  }

  return (
    <button
      type="button"
      onClick={confirmPayment}
      className="rounded-xl bg-green-500 px-5 py-3 font-bold text-black transition hover:bg-green-400"
    >
      Confirm payment
    </button>
  );
}
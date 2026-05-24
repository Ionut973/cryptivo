"use client";

export default function IPaidButton({ orderId }: { orderId: string }) {
  async function handlePaid() {
    const res = await fetch(`/api/orders/${orderId}/paid`, {
      method: "POST",
    });

    if (res.ok) {
      alert("Payment sent for checking");
      window.location.href = "/profile";
    } else {
      alert(await res.text());
    }
  }

  return (
    <button
      onClick={handlePaid}
      className="w-full rounded-2xl bg-green-500 py-4 text-lg font-bold text-black hover:bg-green-400"
    >
      I paid
    </button>
  );
}
"use client";

export default function OrderStatusButtons({ id }: { id: string }) {
  async function update(status: "PENDING" | "PAID" | "SHIPPED" | "DELIVERED") {
    const res = await fetch(`/api/admin/orders/${id}/confirm`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status }),
    });

    if (!res.ok) {
      alert(await res.text());
      return;
    }

    window.location.reload();
  }

  return (
    <div className="mt-4 flex flex-wrap gap-2">
      <button type="button" onClick={() => update("PENDING")} className="rounded border px-3 py-2">
        Pending
      </button>

      <button type="button" onClick={() => update("PAID")} className="rounded border px-3 py-2">
        Paid
      </button>

      <button type="button" onClick={() => update("SHIPPED")} className="rounded border px-3 py-2">
        Shipped
      </button>

      <button type="button" onClick={() => update("DELIVERED")} className="rounded border px-3 py-2">
        Delivered
      </button>
    </div>
  );
}
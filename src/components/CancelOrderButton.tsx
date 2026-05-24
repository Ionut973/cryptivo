"use client";

import { useState } from "react";

export default function CancelOrderButton({
  orderId,
  label = "Cancel order",
}: {
  orderId: string;
  label?: string;
}) {
  const [open, setOpen] = useState(false);
  const [reason, setReason] = useState("");
  const [loading, setLoading] = useState(false);

  async function cancelOrder() {
    if (reason.trim().length < 3) {
      alert("Write cancel reason");
      return;
    }

    setLoading(true);

    const res = await fetch(`/api/orders/${orderId}/cancel`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ reason }),
    });

    setLoading(false);

    if (!res.ok) {
      alert(await res.text());
      return;
    }

    window.location.reload();
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="rounded-xl border border-red-500/40 bg-red-500/10 px-4 py-2 text-xs font-bold text-red-400 transition hover:bg-red-500 hover:text-white"
      >
        {label}
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-3xl border border-red-500/30 bg-zinc-950 p-6 text-white shadow-2xl">
            <p className="text-xs font-bold uppercase tracking-[0.35em] text-red-400">
              Cancel order
            </p>

            <h2 className="mt-3 text-3xl font-black">
              Reason for cancellation
            </h2>

            <p className="mt-2 text-sm text-zinc-400">
              Write why this order is being cancelled. The reason will be shown
              to the customer and admin.
            </p>

            <textarea
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              rows={5}
              placeholder="Example: Customer requested cancellation / product unavailable..."
              className="mt-5 w-full rounded-2xl border border-zinc-700 bg-black p-4 text-sm outline-none focus:border-red-400"
            />

            <div className="mt-5 flex gap-3">
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="flex-1 rounded-xl border border-zinc-700 px-4 py-3 text-sm font-bold hover:bg-zinc-800"
              >
                Close
              </button>

              <button
                type="button"
                onClick={cancelOrder}
                disabled={loading}
                className="flex-1 rounded-xl bg-red-500 px-4 py-3 text-sm font-black text-white transition hover:bg-red-400 disabled:opacity-60"
              >
                {loading ? "Cancelling..." : "Confirm cancel"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
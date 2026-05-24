"use client";

import { useState } from "react";

export default function AdminSupportReplyForm({
  ticketId,
}: {
  ticketId: string;
}) {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function sendReply(e: React.FormEvent) {
    e.preventDefault();

    setLoading(true);

    const res = await fetch(`/api/admin/support/${ticketId}/reply`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message }),
    });

    setLoading(false);

    if (res.ok) {
      setMessage("");
      window.location.reload();
    } else {
      alert(await res.text());
    }
  }

  return (
    <form onSubmit={sendReply} className="mt-4 space-y-3">
      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Reply to customer..."
        rows={3}
        required
        className="w-full rounded-xl border border-zinc-700 bg-black p-3 outline-none focus:border-green-500"
      />

      <button
        disabled={loading}
        className="rounded-xl bg-green-500 px-4 py-2 font-semibold text-black disabled:opacity-60"
      >
        {loading ? "Sending..." : "Send Reply"}
      </button>
    </form>
  );
}
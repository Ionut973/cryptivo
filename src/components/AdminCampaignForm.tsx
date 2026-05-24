"use client";

import { useState } from "react";

export default function AdminCampaignForm() {
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");

  async function send() {
    const res = await fetch("/api/admin/campaigns", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, message }),
    });

    if (res.ok) {
      alert("Sent to all users 🚀");
      setTitle("");
      setMessage("");
    } else {
      alert("Error sending");
    }
  }

  return (
    <div className="mt-10 rounded-xl border border-zinc-800 p-6">
      <h2 className="text-xl font-bold">Send Campaign</h2>

      <input
        className="mt-4 w-full rounded bg-zinc-900 p-2"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <textarea
        className="mt-4 w-full rounded bg-zinc-900 p-2"
        placeholder="Message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />

      <button
        onClick={send}
        className="mt-4 rounded bg-white px-4 py-2 text-black"
      >
        Send to all
      </button>
    </div>
  );
}
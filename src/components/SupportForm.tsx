"use client";

import { useState } from "react";

export default function SupportForm({
  subjectPlaceholder,
  messagePlaceholder,
  buttonText,
}: {
  subjectPlaceholder: string;
  messagePlaceholder: string;
  buttonText: string;
}) {
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  async function sendSupport() {
    const res = await fetch("/api/support", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ subject, message }),
    });

    if (res.ok) {
      alert("Sent");
      setSubject("");
      setMessage("");
    } else {
      alert("Error");
    }
  }

  return (
    <div className="space-y-4">
      <input
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
        placeholder={subjectPlaceholder}
        className="w-full rounded-xl border border-zinc-700 bg-black p-4"
      />

      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder={messagePlaceholder}
        rows={6}
        className="w-full rounded-xl border border-zinc-700 bg-black p-4"
      />

      <button
        onClick={sendSupport}
        className="w-full rounded-xl bg-green-500 py-4 font-bold text-black"
      >
        {buttonText}
      </button>
    </div>
  );
}
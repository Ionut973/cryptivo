"use client";

import { useEffect, useState } from "react";

export default function PaymentTimer() {
  const [secondsLeft, setSecondsLeft] = useState(30 * 60);

  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const minutes = Math.floor(secondsLeft / 60);
  const seconds = secondsLeft % 60;

  return (
    <div className="rounded-2xl border border-yellow-500/30 bg-yellow-500/10 p-4">
      <p className="text-sm text-yellow-300">Payment expires in</p>
      <p className="mt-1 text-2xl font-black text-yellow-400">
        {minutes}:{seconds.toString().padStart(2, "0")}
      </p>
    </div>
  );
}
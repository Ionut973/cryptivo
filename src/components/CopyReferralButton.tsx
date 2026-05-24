"use client";

import { useState } from "react";

export default function CopyReferralButton() {
  const [copied, setCopied] = useState(false);

  async function copyLink() {
    await navigator.clipboard.writeText(
      `${window.location.origin}/register?ref=CRYPTIVO777`
    );

    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2500);
  }

  return (
    <>
      <button
        type="button"
        onClick={copyLink}
        className="rounded-2xl bg-green-500 px-8 py-4 text-sm font-black text-black transition hover:scale-105 hover:bg-green-400"
      >
        Copy referral link
      </button>

      {copied && (
        <div className="fixed bottom-6 right-6 z-[9999] animate-[fadeIn_.25s_ease]">
          <div className="flex items-center gap-4 rounded-2xl border border-green-500/30 bg-zinc-900/95 px-5 py-4 shadow-2xl backdrop-blur-xl">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-green-500/15 text-2xl text-green-400">
              ₮
            </div>

            <div>
              <p className="text-sm font-black text-white">
                Referral copied
              </p>

              <p className="mt-1 text-xs text-zinc-400">
                Invite link copied successfully
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
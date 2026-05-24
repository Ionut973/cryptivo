"use client";

export default function CopyButton({ text }: { text: string }) {
  async function copy() {
    await navigator.clipboard.writeText(text);
    alert("Copied");
  }

  return (
    <button
      type="button"
      onClick={copy}
      className="rounded-xl bg-white px-5 py-3 font-bold text-black hover:bg-green-400"
    >
      Copy address
    </button>
  );
}
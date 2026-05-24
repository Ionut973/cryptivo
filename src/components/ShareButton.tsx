"use client";

export default function ShareButton() {
  async function shareProduct() {
    const url = window.location.href;

    if (navigator.share) {
      await navigator.share({
        title: "Cryptivo product",
        url,
      });
      return;
    }

    await navigator.clipboard.writeText(url);
    alert("Product link copied");
  }

  return (
    <button
      onClick={shareProduct}
      className="rounded-xl border border-zinc-700 px-4 py-2 text-sm text-white"
    >
      Share
    </button>
  );
}
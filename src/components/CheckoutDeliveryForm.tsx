"use client";

import { useState } from "react";

export default function CheckoutDeliveryForm({
  text,
  productId,
}: {
  text: any;
  productId?: string;
}) {
  const [deliveryType, setDeliveryType] = useState<"HOME" | "ANONYMOUS">("HOME");
  const [loading, setLoading] = useState(false);

  async function submitOrder(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (loading) return;

    setLoading(true);

    const formData = new FormData(e.currentTarget);

    const res = await fetch("/api/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        productId,
        deliveryType,
        firstName: formData.get("firstName"),
        lastName: formData.get("lastName"),
        address1: formData.get("address1"),
        address2: formData.get("address2"),
        postcode: formData.get("postcode"),
        phone: formData.get("phone"),
        telegram: formData.get("telegram"),
        anonymousPlace: formData.get("anonymousPlace"),
      }),
    });

    setLoading(false);

    if (!res.ok) {
      alert(await res.text());
      return;
    }

    const order = await res.json();
    window.location.href = `/payment/${order.id}`;
  }

  return (
    <form onSubmit={submitOrder} method="post" className="space-y-5">
      <div className="grid gap-4 md:grid-cols-2">
        <button
          type="button"
          onClick={() => setDeliveryType("HOME")}
          className={`rounded-2xl border p-5 text-left transition ${
            deliveryType === "HOME"
              ? "border-green-400 bg-green-500/15 shadow-lg shadow-green-500/20"
              : "border-zinc-800 bg-black/70 hover:border-green-500/50"
          }`}
        >
          <p className="text-2xl">🏠</p>
          <h2 className="mt-3 text-xl font-black">{text.homeDelivery}</h2>
          <p className="mt-1 text-sm text-zinc-400">{text.homeDeliveryText}</p>
        </button>

        <button
          type="button"
          onClick={() => setDeliveryType("ANONYMOUS")}
          className={`rounded-2xl border p-5 text-left transition ${
            deliveryType === "ANONYMOUS"
              ? "border-green-400 bg-green-500/15 shadow-lg shadow-green-500/20"
              : "border-zinc-800 bg-black/70 hover:border-green-500/50"
          }`}
        >
          <p className="text-2xl">🕶</p>
          <h2 className="mt-3 text-xl font-black">{text.anonymousDelivery}</h2>
          <p className="mt-1 text-sm text-zinc-400">
            {text.anonymousDeliveryText}
          </p>
        </button>
      </div>

      {deliveryType === "HOME" ? (
        <div className="rounded-2xl border border-zinc-800 bg-black/60 p-5">
          <div className="grid gap-4 md:grid-cols-2">
            <input name="firstName" required placeholder={text.firstName} className="rounded-xl border border-zinc-700 bg-zinc-950 p-4 outline-none focus:border-green-400" />
            <input name="lastName" required placeholder={text.lastName} className="rounded-xl border border-zinc-700 bg-zinc-950 p-4 outline-none focus:border-green-400" />
          </div>

          <input name="address1" required placeholder={text.deliveryAddress} className="mt-4 w-full rounded-xl border border-zinc-700 bg-zinc-950 p-4 outline-none focus:border-green-400" />
          <input name="address2" placeholder={text.deliveryAddress2} className="mt-4 w-full rounded-xl border border-zinc-700 bg-zinc-950 p-4 outline-none focus:border-green-400" />

          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <input name="postcode" required placeholder={text.postcode} className="rounded-xl border border-zinc-700 bg-zinc-950 p-4 outline-none focus:border-green-400" />
            <input name="phone" required placeholder={text.phoneNumber} className="rounded-xl border border-zinc-700 bg-zinc-950 p-4 outline-none focus:border-green-400" />
          </div>
        </div>
      ) : (
        <div className="rounded-2xl border border-zinc-800 bg-black/60 p-5">
          <h2 className="text-2xl font-black">{text.anonymousDelivery}</h2>

          <p className="mt-2 text-sm leading-6 text-zinc-400">
            {text.anonymousInfo}
          </p>

          <div className="mt-4 rounded-2xl border border-green-500/20 bg-green-500/5 p-5">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-500/20 text-2xl">
                💬
              </div>

              <div>
                <p className="text-sm uppercase tracking-[0.25em] text-green-400">
                  ADMIN
                </p>
                <p className="text-lg font-black">Telegram Support</p>
              </div>
            </div>

            <p className="mt-3 text-sm text-zinc-400">
              {text.contactAdminText}
            </p>

            <a
              href="https://t.me/devutilityy"
              target="_blank"
              className="mt-4 inline-flex items-center gap-2 rounded-xl border border-green-500/40 bg-green-500/10 px-5 py-3 text-sm font-bold text-green-400 transition hover:bg-green-500/20"
            >
              ✈️ {text.contactAdminButton}
            </a>
          </div>

          <input name="telegram" required placeholder={text.telegramUsername} className="mt-5 w-full rounded-xl border border-zinc-700 bg-zinc-950 p-4 outline-none focus:border-green-400" />
          <textarea name="anonymousPlace" required rows={5} placeholder={text.hiddenPlace} className="mt-4 w-full rounded-xl border border-zinc-700 bg-zinc-950 p-4 outline-none focus:border-green-400" />
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-xl bg-green-500 py-4 text-sm font-black text-black transition hover:bg-green-400 disabled:opacity-60"
      >
        {loading ? text.loading : text.confirmOrder}
      </button>
    </form>
  );
}
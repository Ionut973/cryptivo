export default function OrderSuccessPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-zinc-950 px-6 py-20 text-white">
      <section className="relative mx-auto max-w-4xl">
        <div className="absolute left-1/2 top-10 h-72 w-72 -translate-x-1/2 rounded-full bg-green-500/20 blur-3xl" />

        <div className="relative rounded-[2rem] border border-green-500/30 bg-zinc-900/90 p-10 text-center shadow-2xl">
          <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-green-500 text-5xl text-black animate-pulse">
            ✅
          </div>

          <p className="mt-8 text-sm uppercase tracking-[0.3em] text-green-400">
            Payment confirmed
          </p>

          <h1 className="mt-4 text-5xl font-black">
            Order completed
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-zinc-400">
            Your payment has been confirmed. We will start preparing your order.
            You can track your order status in your profile.
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            <div className="rounded-2xl border border-zinc-800 bg-black p-5">
              <p className="text-3xl">💸</p>
              <p className="mt-2 font-bold">Payment paid</p>
            </div>

            <div className="rounded-2xl border border-zinc-800 bg-black p-5">
              <p className="text-3xl">📦</p>
              <p className="mt-2 font-bold">Order processing</p>
            </div>

            <div className="rounded-2xl border border-zinc-800 bg-black p-5">
              <p className="text-3xl">🔔</p>
              <p className="mt-2 font-bold">Updates enabled</p>
            </div>
          </div>

          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <a
              href="/profile"
              className="rounded-2xl bg-green-500 px-7 py-4 font-black text-black hover:bg-green-400"
            >
              View my orders
            </a>

            <a
              href="/categories"
              className="rounded-2xl border border-zinc-700 px-7 py-4 font-bold hover:bg-zinc-800"
            >
              Continue shopping
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
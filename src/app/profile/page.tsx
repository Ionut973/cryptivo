import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { verifyToken } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import CryptoFloating from "@/components/CryptoFloating";
import CancelOrderButton from "@/components/CancelOrderButton";
import { getServerLang, getProductText, getTranslations } from "@/lib/i18n";


const steps = ["PENDING", "PAID", "SHIPPED", "DELIVERED"];

function getActiveStep(order: any) {
  if (order.status === "CANCELLED") return -1;
  if (order.status === "DELIVERED") return 3;
  if (order.status === "SHIPPED") return 2;
  if (order.paymentStatus === "PAID") return 1;
  return 0;
}

function TrackingBar({ order, text }: { order: any; text: any }) {
  const active = getActiveStep(order);

  return (
    <div className="mt-4 rounded-xl border border-zinc-800 bg-black/70 p-4">
      <div className="flex items-center">
        {steps.map((step, index) => (
          <div key={step} className="flex flex-1 items-center">
            <div className="flex flex-col items-center">
              <div
                className={`h-4 w-4 rounded-full border ${
                  order.status === "CANCELLED"
                    ? "border-red-500 bg-red-500"
                    : index <= active
                    ? "border-green-400 bg-green-400 shadow-lg shadow-green-500/40"
                    : "border-zinc-600 bg-zinc-900"
                }`}
              />

              <p
                className={`mt-2 text-[10px] font-bold ${
                  order.status === "CANCELLED"
                    ? "text-red-400"
                    : index <= active
                    ? "text-green-400"
                    : "text-zinc-500"
                }`}
              >
                {step}
              </p>
            </div>

            {index !== steps.length - 1 && (
              <div
                className={`mx-2 h-[2px] flex-1 ${
                  order.status === "CANCELLED"
                    ? "bg-red-500/50"
                    : index < active
                    ? "bg-green-400"
                    : "bg-zinc-700"
                }`}
              />
            )}
          </div>
        ))}
      </div>

      <div className="mt-4 grid gap-2 text-xs text-zinc-300 md:grid-cols-2">
        <p>
          {text.payment}:{" "}
          <span className="font-bold text-green-400">
            {order.paymentStatus}
          </span>
        </p>

        <p>
          {text.delivery}:{" "}
          <span
            className={`font-bold ${
              order.status === "CANCELLED" ? "text-red-400" : "text-white"
            }`}
          >
            {order.status}
          </span>
        </p>

        <p>
          {text.trackingCode}:{" "}
          <span className="font-bold text-green-400">
            {order.trackingCode || text.notAddedYet}
          </span>
        </p>

        <p>
          {text.trackingStatus}:{" "}
          <span className="font-bold text-white">
            {order.trackingStatus || text.waitingUpdate}
          </span>
        </p>
      </div>
    </div>
  );
}

export default async function ProfilePage() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) redirect("/login");

  const user = verifyToken(token) as { id: string; email?: string } | null;

  if (!user) redirect("/login");

  const lang = await getServerLang();
  const text = getTranslations(lang);

  const orders = await prisma.order.findMany({
    where: { userId: user.id },
    include: {
      items: {
        include: {
          product: true,
        },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  return (
    <main className="min-h-screen overflow-hidden bg-zinc-950 px-6 py-10 text-white">
      <section className="relative mx-auto max-w-6xl">
        <CryptoFloating />

        <div className="relative z-10 rounded-2xl border border-zinc-800 bg-zinc-900/90 p-6 shadow-2xl">
          <p className="text-xs uppercase tracking-[0.35em] text-green-400">
            CRYPTIVO ACCOUNT
          </p>

          <div className="mt-3 flex flex-wrap items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-black">{text.myOrders}</h1>
              <p className="mt-1 text-sm text-zinc-400">{user.email}</p>
            </div>

            <a
              href="/support"
              className="rounded-xl border border-zinc-700 px-4 py-2 text-sm font-bold hover:bg-zinc-800"
            >
              {text.needHelp}
            </a>
          </div>
        </div>

        {orders.length === 0 ? (
          <div className="relative z-10 mt-6 rounded-2xl border border-zinc-800 bg-zinc-900/90 p-8 text-center">
            <p className="text-4xl">📦</p>
            <h2 className="mt-3 text-2xl font-black">{text.noOrdersYet}</h2>
            <p className="mt-2 text-sm text-zinc-400">
              {text.ordersWillAppear}
            </p>
          </div>
        ) : (
          <div className="relative z-10 mt-6 space-y-4">
            {orders.map((order) => (
              <div
                key={order.id}
                className={`rounded-2xl border p-4 shadow-xl ${
                  order.status === "CANCELLED"
                    ? "border-red-500/30 bg-red-950/20"
                    : "border-zinc-800 bg-zinc-900/90"
                }`}
              >
                <div className="flex flex-wrap justify-between gap-4 border-b border-zinc-800 pb-4">
                  <div>
                    <p className="text-[11px] uppercase tracking-[0.25em] text-zinc-500">
                      {text.order} #{order.id.slice(0, 8)}
                    </p>

                    <p className="mt-1 text-2xl font-black">${order.total}</p>

                    <p className="mt-1 text-xs text-zinc-500">
                      {new Date(order.createdAt).toLocaleString()}
                    </p>

                    <p className="mt-2 text-xs text-green-400">
                      ₿ BTC • Ξ ETH • ₮ USDT • ◎ SOL
                    </p>
                  </div>

                  <div className="flex flex-col items-end gap-2">
                    <span
                      className={`rounded-full border px-3 py-1 text-xs font-black ${
                        order.paymentStatus === "PAID"
                          ? "border-green-500/30 bg-green-500/10 text-green-400"
                          : "border-yellow-500/30 bg-yellow-500/10 text-yellow-400"
                      }`}
                    >
                      {order.paymentStatus}
                    </span>

                    <span
                      className={`rounded-full border px-3 py-1 text-xs font-black ${
                        order.status === "CANCELLED"
                          ? "border-red-500/30 bg-red-500/10 text-red-400"
                          : "border-zinc-700 bg-black text-white"
                      }`}
                    >
                      {text.delivery}: {order.status}
                    </span>
                  </div>
                </div>

                <TrackingBar order={order} text={text} />

                {order.status === "CANCELLED" && (
                  <div className="mt-4 rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-red-300">
                    <p className="font-bold">
                      Cancelled by: {order.cancelledBy || "Unknown"}
                    </p>
                    <p className="mt-1">
                      Reason: {order.cancelReason || "No reason"}
                    </p>
                  </div>
                )}

                <div className="mt-4 space-y-2">
                  {order.items.map((item) => {
                    const productName = getProductText(
                      item.product,
                      "name",
                      lang
                    );

                    return (
                      <a
                        key={item.id}
                        href={`/product/${item.product.id}`}
                        className="flex items-center gap-3 rounded-xl border border-zinc-800 bg-black/70 p-2 transition hover:border-green-500/60"
                      >
                        <img
                          src={item.product.imageUrl}
                          alt={productName}
                          className="h-14 w-14 rounded-lg object-cover"
                        />

                        <div className="flex-1">
                          <p className="text-sm font-black">{productName}</p>
                          <p className="mt-1 text-xs text-zinc-500">
                            {text.quantity}: {item.quantity}
                          </p>
                        </div>

                        <p className="text-sm font-black text-green-400">
                          ${item.price}
                        </p>
                      </a>
                    );
                  })}
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  <a
                    href="/support"
                    className="rounded-xl border border-zinc-700 px-4 py-2 text-xs font-bold hover:bg-zinc-800"
                  >
                    {text.contactSupport}
                  </a>

                  {order.status !== "CANCELLED" &&
                    order.status !== "DELIVERED" && (
                      <CancelOrderButton
                        orderId={order.id}
                        label="Cancel order"
                      />
                    )}

                  <a
                    href={`/payment/${order.id}`}
                    className="rounded-xl border border-green-500/40 px-4 py-2 text-xs font-bold text-green-400 hover:bg-green-500 hover:text-black"
                  >
                    {text.viewPayment}
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
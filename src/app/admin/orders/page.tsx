import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { verifyToken } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import OrderStatusButtons from "@/components/OrderStatusButtons";
import ConfirmPaymentButton from "@/components/ConfirmPaymentButton";
import CancelOrderButton from "@/components/CancelOrderButton";

function PaymentBadge({ status }: { status: string }) {
  const className =
    status === "PAID"
      ? "border-green-500/30 bg-green-500/10 text-green-400"
      : status === "CHECKING"
      ? "border-blue-500/30 bg-blue-500/10 text-blue-400"
      : "border-yellow-500/30 bg-yellow-500/10 text-yellow-400";

  const label =
    status === "PAID"
      ? "🟢 Paid"
      : status === "CHECKING"
      ? "🔵 Checking"
      : "🟡 Pending";
      

  return (
    <span className={`rounded-full border px-3 py-1 text-xs font-bold ${className}`}>
      {label}
    </span>
  );
}

export default async function AdminOrdersPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) redirect("/login");

  const user = verifyToken(token) as { role?: string } | null;

  if (!user || user.role !== "ADMIN") {
    redirect("/");
  }

  const orders = await prisma.order.findMany({
    include: {
      user: true,
      items: {
        include: {
          product: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <main className="min-h-screen overflow-hidden bg-zinc-950 px-6 py-16 text-white">
      <section className="relative mx-auto max-w-7xl">
        <div className="absolute -left-20 top-10 h-72 w-72 rounded-full bg-green-500/10 blur-3xl" />
        <div className="absolute right-0 top-32 h-72 w-72 rounded-full bg-blue-500/10 blur-3xl" />

        <div className="relative rounded-3xl border border-zinc-800 bg-zinc-900/80 p-8 shadow-2xl">
          <p className="text-sm uppercase tracking-[0.3em] text-green-400">
            CRYPTIVO ADMIN
          </p>

          <h1 className="mt-3 text-4xl font-black">Orders Control</h1>

          <p className="mt-2 text-zinc-400">
            Manage payments, delivery statuses, and customer orders.
          </p>
        </div>

        {orders.length === 0 ? (
          <div className="relative mt-8 rounded-3xl border border-zinc-800 bg-zinc-900 p-10 text-center text-zinc-400">
            No orders yet.
          </div>
        ) : (
          <div className="relative mt-8 space-y-6">
            {orders.map((order: any) => (
              <div
                key={order.id}
                className="rounded-3xl border border-zinc-800 bg-zinc-900/90 p-6 shadow-xl"
              >
                <div className="flex flex-wrap justify-between gap-5 border-b border-zinc-800 pb-5">
                  <div>
                    <p className="text-xs uppercase tracking-[0.25em] text-zinc-500">
                      Order #{order.id.slice(0, 8)}
                    </p>

                    <p className="mt-2 text-lg font-bold">{order.user.email}</p>

                    <p className="mt-1 text-xs text-zinc-500">
                      {new Date(order.createdAt).toLocaleString()}
                    </p>
                  </div>

                  <div className="text-right">
                    <p className="text-3xl font-black">${order.total}</p>

                    <div className="mt-3 flex justify-end">
                      <PaymentBadge status={order.paymentStatus} />
                    </div>

                    <p className="mt-2 text-sm text-zinc-400">
                      Delivery: {order.status}
                    </p>
                  </div>
                </div>

                <div className="mt-5 grid gap-3">
                  {order.items.map((item: any) => (
                    <a
                      key={item.id}
                      href={`/product/${item.product.id}`}
                      className="group flex items-center gap-4 rounded-2xl border border-zinc-800 bg-black p-3 transition hover:border-green-500/60"
                    >
                      <img
                        src={item.product.imageUrl}
                        alt={item.product.nameEn}
                        className="h-20 w-20 rounded-xl object-cover"
                      />

                      <div className="flex-1">
                        <p className="font-bold group-hover:text-green-400">
                          {item.product.nameEn}
                        </p>

                        <p className="mt-1 text-sm text-zinc-500">
                          Qty: {item.quantity}
                          {item.color && (
  <p className="mt-1 text-sm text-green-400">
    Color: {item.color}
  </p>
)}

{item.size && (
  <p className="mt-1 text-sm text-green-400">
    Size: {item.size}
  </p>
)}
                        </p>
                      </div>

                      <p className="font-black">${item.price}</p>
                    </a>
                  ))}
                </div>

                {(order.deliveryType ||
                  order.firstName ||
                  order.address1 ||
                  order.telegram ||
                  order.anonymousPlace) && (
                  <div className="mt-5 rounded-2xl border border-zinc-800 bg-black p-5">
                    <h3 className="font-bold text-green-400">
                      Delivery details
                    </h3>

                    <div className="mt-3 grid gap-2 text-sm text-zinc-300 md:grid-cols-2">
                      <p>Type: {order.deliveryType || "—"}</p>
                      <p>Name: {order.firstName || ""} {order.lastName || ""}</p>
                      <p>Address: {order.address1 || "—"}</p>
                      <p>Address 2: {order.address2 || "—"}</p>
                      <p>Postcode: {order.postcode || "—"}</p>
                      <p>Phone: {order.phone || "—"}</p>
                      <p>Telegram: {order.telegram || "—"}</p>
                      <p>Anonymous place: {order.anonymousPlace || "—"}</p>
                    </div>
                  </div>
                )}

                <div className="mt-5 flex flex-wrap gap-3">
  {order.paymentStatus !== "PAID" && (
    <ConfirmPaymentButton orderId={order.id} />
  )}

  <OrderStatusButtons id={order.id} />

  {order.status !== "CANCELLED" &&
    order.status !== "DELIVERED" && (
      <CancelOrderButton
        orderId={order.id}
        label="Cancel order"
      />
    )}

  <a
    href={`/payment/${order.id}`}
    className="rounded-xl border border-zinc-700 px-4 py-2 text-sm font-bold hover:bg-zinc-800"
  >
    View payment
  </a>
</div>

{order.status === "CANCELLED" && (
  <div className="mt-4 rounded-2xl border border-red-500/30 bg-red-500/10 p-4 text-red-300">
    <p className="font-bold">
      Cancelled by: {order.cancelledBy || "Unknown"}
    </p>

    <p className="mt-2">
      Reason: {order.cancelReason || "No reason"}
    </p>
  </div>
)}
              </div>
            ))}
          </div>
        )}
      </section>
      
    </main>
  );
}
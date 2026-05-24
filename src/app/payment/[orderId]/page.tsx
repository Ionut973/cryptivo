import { prisma } from "@/lib/prisma";
import CopyButton from "@/components/CopyButton";
import PaymentQr from "@/components/PaymentQr";
import MarkAsPaidButton from "@/components/MarkAsPaidButton";
import PaymentTimer from "@/components/PaymentTimer";

export default async function PaymentPage({
  params,
}: {
  params: Promise<{ orderId: string }>;
}) {
  const { orderId } = await params;

  const order = await prisma.order.findUnique({
    where: { id: orderId },
    include: {
      items: {
        include: {
          product: true,
        },
      },
    },
  });

  if (!order) {
    return (
      <main className="min-h-screen bg-zinc-950 px-6 py-20 text-white">
        Order not found
      </main>
    );
  }

  const address =
    order.cryptoAddress ||
    process.env.USDC_ADDRESS ||
    "NO_USDC_ADDRESS_IN_ENV";

  return (
    <main className="min-h-screen bg-zinc-950 px-6 py-20 text-white">
      <section className="mx-auto max-w-5xl">
        <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-8 shadow-2xl">
          <p className="text-sm uppercase tracking-[0.3em] text-green-400">
            CRYPTIVO PAYMENT
          </p>

          <h1 className="mt-4 text-5xl font-black">Pay with USDT / USDC</h1>

          <p className="mt-3 text-zinc-400">
            Order #{order.id.slice(0, 8)} is waiting for crypto payment.
          </p>

          <div className="mt-8 rounded-2xl border border-yellow-500/30 bg-yellow-500/10 p-5 text-yellow-300">
            ⚠️ Send ONLY USDT or USDC on TRC20 network. Other coins or networks
            may result in lost funds.
          </div>

          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl border border-zinc-800 bg-black p-6">
              <p className="text-zinc-400">Amount</p>

              <p className="mt-2 text-5xl font-black">${order.total}</p>

              <p className="mt-2 text-sm text-red-400">
                Send EXACT amount: ${order.total}. Underpaid orders will not be
                confirmed.
              </p>

              <div className="mt-5">
                <PaymentTimer />
              </div>

              {order.paymentStatus === "PENDING" && (
                <div className="mt-5">
                  <MarkAsPaidButton orderId={order.id} />
                </div>
              )}

              <div className="mt-6 space-y-2 text-sm text-zinc-400">
                <p>Currency: USDT / USDC</p>
                <p>Network: TRC20</p>
              </div>

              <div className="mt-4">
                {order.paymentStatus === "PENDING" && (
                  <p className="font-bold text-yellow-400">
                    ⏳ Waiting for payment
                  </p>
                )}

                {order.paymentStatus === "CHECKING" && (
                  <p className="animate-pulse font-bold text-blue-400">
                    🔄 Checking blockchain...
                  </p>
                )}

                {order.paymentStatus === "PAID" && (
                  <p className="font-bold text-green-400">
                    ✅ Payment confirmed
                  </p>
                )}
              </div>
            </div>

            <div className="rounded-2xl border border-zinc-800 bg-black p-6">
              <p className="text-zinc-400">Scan QR or copy address</p>

              <div className="mt-5 flex justify-center">
                <PaymentQr address={address} />
              </div>

              <div className="mt-5 break-all rounded-xl border border-zinc-800 bg-zinc-950 p-4 text-green-400">
                {address}
              </div>

              <div className="mt-4 rounded-xl border border-zinc-800 bg-zinc-950 p-4">
                <p className="text-sm text-zinc-400">Payment note / Order ID</p>
                <p className="mt-1 break-all font-bold text-white">
                  CRYPTIVO-{order.id.slice(0, 8)}
                </p>
              </div>

              <div className="mt-5">
                <CopyButton text={address} /></div>
            </div>
          </div>

          <div className="mt-8 rounded-2xl border border-zinc-800 bg-black p-6">
            <h2 className="text-2xl font-bold">After payment</h2>

            <p className="mt-3 text-zinc-400">
              After sending USDT or USDC, press “I paid”. Admin will check the
              transaction and confirm your order.
            </p>

            <a
              href="/profile"
              className="mt-6 inline-block rounded-xl border border-zinc-700 px-5 py-3 hover:bg-zinc-800"
            >
              View my orders
            </a>
          </div>
        </div>
      </section>

      <script
        dangerouslySetInnerHTML={{
          __html: `
            setTimeout(() => location.reload(), 10000);
          `,
        }}
      />
    </main>
  );
}
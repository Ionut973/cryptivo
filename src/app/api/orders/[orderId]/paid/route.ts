import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";
import { verifyToken } from "@/lib/auth";
import { sendTelegramMessage } from "@/lib/telegram";

export async function POST(
  req: Request,
  { params }: { params: Promise<{ orderId: string }> }
) {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) return new Response("Unauthorized", { status: 401 });

  const user = verifyToken(token) as { id: string; email?: string } | null;
  if (!user) return new Response("Unauthorized", { status: 401 });

  const { orderId } = await params;

  const order = await prisma.order.findUnique({
    where: { id: orderId },
    include: { user: true },
  });

  if (!order) return new Response("Order not found", { status: 404 });

  if (order.userId !== user.id) {
    return new Response("Forbidden", { status: 403 });
  }

  const updatedOrder = await prisma.order.update({
    where: { id: orderId },
    data: {
      paymentStatus: "CHECKING",
    },
  });

  await sendTelegramMessage(
    `💸 Payment checking requested

Order: #${order.id.slice(0, 8)}
Customer: ${order.user.email}
Total: $${order.total}
Currency: USDT / USDC
Network: TRC20`
  );

  return Response.json(updatedOrder);
}
import { prisma } from "@/lib/prisma";
import { verifyToken } from "@/lib/auth";
import { cookies } from "next/headers";

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ orderId: string }> }
) {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) return new Response("Unauthorized", { status: 401 });

  const user = verifyToken(token) as { id: string; role?: string } | null;
  if (!user) return new Response("Unauthorized", { status: 401 });

  const { orderId } = await params;
  const { reason } = await req.json();

  if (!reason || reason.trim().length < 3) {
    return new Response("Write cancel reason", { status: 400 });
  }

  const order = await prisma.order.findUnique({
    where: { id: orderId },
  });

  if (!order) return new Response("Order not found", { status: 404 });

  const isAdmin = user.role === "ADMIN";
  const isOwner = order.userId === user.id;

  if (!isAdmin && !isOwner) {
    return new Response("Forbidden", { status: 403 });
  }

  if (order.status === "DELIVERED") {
    return new Response("Delivered order cannot be cancelled", { status: 400 });
  }

  const cancelledBy = isAdmin ? "ADMIN" : "USER";

  const updatedOrder = await prisma.order.update({
    where: { id: orderId },
    data: {
      status: "CANCELLED",
      trackingStatus: "CANCELLED",
      cancelReason: reason.trim(),
      cancelledBy,
    },
  });

  await prisma.notification.create({
    data: {
      userId: order.userId,
      title: "Order cancelled",
      message: `Order #${order.id.slice(0, 8)} was cancelled. Reason: ${reason.trim()}`,
      type: "ORDER",
    },
  });

  return Response.json(updatedOrder);
}
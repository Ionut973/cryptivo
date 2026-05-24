import { prisma } from "@/lib/prisma";
import { verifyToken } from "@/lib/auth";
import { cookies } from "next/headers";

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ orderId: string }> }
) {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    return new Response("Unauthorized", { status: 401 });
  }

  const user = verifyToken(token) as { role?: string } | null;

  if (!user || user.role !== "ADMIN") {
    return new Response("Forbidden", { status: 403 });
  }

  const { orderId } = await params;
  const { status } = await req.json();

  if (!["PENDING", "PAID", "SHIPPED", "DELIVERED"].includes(status)) {
    return new Response("Invalid status", { status: 400 });
  }

  const order = await prisma.order.update({
    where: { id: orderId },
    data: {
      status,
      paymentStatus: status === "PAID" ? "PAID" : undefined,
      trackingStatus: status,
    },
  });

  await prisma.notification.create({
    data: {
      userId: order.userId,
      title: "Order status updated",
      message: `Your order #${order.id.slice(0, 8)} status is now ${status}.`,
      type: "ORDER",
    },
  });

  return Response.json(order);
}
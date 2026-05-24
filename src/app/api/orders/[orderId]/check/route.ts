import { prisma } from "@/lib/prisma";

export async function POST(
  req: Request,
  { params }: { params: Promise<{ orderId: string }> }
) {
  const { orderId } = await params;

  await prisma.order.update({
    where: { id: orderId },
    data: {
      paymentStatus: "CHECKING",
    },
  });

  return new Response("OK");
}
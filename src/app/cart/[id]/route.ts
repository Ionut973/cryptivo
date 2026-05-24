import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";
import { verifyToken } from "@/lib/auth";

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    return new Response("Unauthorized", { status: 401 });
  }

  const user = verifyToken(token) as { id: string } | null;

  if (!user) {
    return new Response("Unauthorized", { status: 401 });
  }

  const { action } = await req.json();

  const cartItem = await prisma.cartItem.findFirst({
    where: {
      id,
      userId: user.id,
    },
  });

  if (!cartItem) {
    return new Response("Cart item not found", { status: 404 });
  }

  if (action === "increase") {
    await prisma.cartItem.update({
      where: { id },
      data: {
        quantity: cartItem.quantity + 1,
      },
    });
  }

  if (action === "decrease") {
    if (cartItem.quantity <= 1) {
      await prisma.cartItem.delete({
        where: { id },
      });
    } else {
      await prisma.cartItem.update({
        where: { id },
        data: {
          quantity: cartItem.quantity - 1,
        },
      });
    }
  }

  return Response.json({ ok: true });
}
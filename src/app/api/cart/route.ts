import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";
import { verifyToken } from "@/lib/auth";
export async function POST(req: Request) {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    return new Response("Unauthorized", { status: 401 });
  }

  const user = verifyToken(token) as { id: string } | null;

  if (!user) {
    return new Response("Unauthorized", { status: 401 });
  }

  const { productId, color, size } = await req.json();

  if (!productId) {
    return new Response("Product ID required", { status: 400 });
  }

  const existing = await prisma.cartItem.findUnique({
    where: {
      userId_productId: {
        userId: user.id,
        productId,
      },
    },
  });

  if (existing) {
    const item = await prisma.cartItem.update({
      where: { id: existing.id },
      data: {
        quantity: existing.quantity + 1,
        color: color || existing.color,
        size: size || existing.size,
      },
    });

    return Response.json(item);
  }

  const item = await prisma.cartItem.create({
    data: {
      userId: user.id,
      productId,
      quantity: 1,
      color: color || null,
      size: size || null,
    },
  });

  return Response.json(item);
}
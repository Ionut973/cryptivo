import { prisma } from "@/lib/prisma";
import { verifyToken } from "@/lib/auth";
import { cookies } from "next/headers";

async function getUser() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) return null;

  return verifyToken(token) as { id: string } | null;
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const user = await getUser();

  if (!user) {
    return new Response("Unauthorized", { status: 401 });
  }

  const { id } = await params;

  await prisma.cartItem.delete({
    where: {
      id,
      userId: user.id,
    },
  });

  return Response.json({ message: "Removed" });
}

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const user = await getUser();

  if (!user) {
    return new Response("Unauthorized", { status: 401 });
  }

  const { id } = await params;
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
    const updated = await prisma.cartItem.update({
      where: { id },
      data: {
        quantity: cartItem.quantity + 1,
      },
    });

    return Response.json(updated);
  }

  if (action === "decrease") {
    if (cartItem.quantity <= 1) {
      await prisma.cartItem.delete({
        where: { id },
      });

      return Response.json({ message: "Removed" });
    }

    const updated = await prisma.cartItem.update({
      where: { id },
      data: {
        quantity: cartItem.quantity - 1,
      },
    });

    return Response.json(updated);
  }

  return new Response("Invalid action", { status: 400 });
}
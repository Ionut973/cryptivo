import { prisma } from "@/lib/prisma";
import { verifyToken } from "@/lib/auth";
import { cookies } from "next/headers";

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

  const { productId } = await req.json();

  const existing = await prisma.favorite.findUnique({
    where: {
      userId_productId: {
        userId: user.id,
        productId,
      },
    },
  });

  if (existing) {
    await prisma.favorite.delete({
      where: {
        id: existing.id,
      },
    });

    return Response.json({ message: "Removed from favorites" });
  }

  const favorite = await prisma.favorite.create({
    data: {
      userId: user.id,
      productId,
    },
  });

  return Response.json(favorite);
}
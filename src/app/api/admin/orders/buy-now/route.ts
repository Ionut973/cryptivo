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

  const product = await prisma.product.findUnique({
    where: { id: productId },
  });

  if (!product) {
    return new Response("Product not found", { status: 404 });
  }

  const dbUser = await prisma.user.findUnique({
    where: { id: user.id },
  });

  let price = product.price;

  if (product.isWelcomeDeal && product.welcomeDiscount > 0) {
    price = price - (price * product.welcomeDiscount) / 100;
  }

  if (dbUser?.loyaltyDiscount && dbUser.loyaltyDiscount > 0) {
    price = price - (price * dbUser.loyaltyDiscount) / 100;
  }

  const order = await prisma.order.create({
    data: {
      userId: user.id,
      total: price,
      items: {
        create: [
          {
            productId: product.id,
            quantity: 1,
            price,
          },
        ],
      },
    },
  });

  return Response.json(order);
}
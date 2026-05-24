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

  const body = await req.json();
  const { productId } = body;

  let cartItems = await prisma.cartItem.findMany({
    where: {
      userId: user.id,
    },
    include: {
      product: true,
    },
  });

  // BUY NOW
  if (cartItems.length === 0 && productId) {
    const product = await prisma.product.findUnique({
      where: {
        id: productId,
      },
    });

    if (!product) {
      return new Response("Product not found", { status: 404 });
    }

    cartItems = [
      {
        id: "buy-now",
        userId: user.id,
        productId: product.id,
        quantity: 1,
        product,
      } as any,
    ];
  }

  if (cartItems.length === 0) {
    return new Response("Cart is empty", { status: 400 });
  }

  const total = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const order = await prisma.order.create({
    data: {
      userId: user.id,
      total,
      status: "PENDING",
      paymentStatus: "PENDING",

      items: {
  create: cartItems.map((item) => ({
    productId: item.productId,
    quantity: item.quantity,
    price: item.product.price,

    color: item.color,
    size: item.size,
        })),
      },
    },
  });

  // очищаем корзину только если обычная корзина
  if (!productId) {
    await prisma.cartItem.deleteMany({
      where: {
        userId: user.id,
      },
    });
  }

  return Response.json(order);
}
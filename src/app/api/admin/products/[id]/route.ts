import { prisma } from "@/lib/prisma";
import { verifyToken } from "@/lib/auth";
import { cookies } from "next/headers";

async function checkAdmin() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) return false;

  const user = verifyToken(token) as { role?: string } | null;

  return user?.role === "ADMIN";
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const isAdmin = await checkAdmin();

    if (!isAdmin) {
      return new Response("Forbidden", { status: 403 });
    }

    const { id } = await params;

    // удаляем favorites
    await prisma.favorite.deleteMany({
      where: {
        productId: id,
      },
    });

    // удаляем cart items
    await prisma.cartItem.deleteMany({
      where: {
        productId: id,
      },
    });

    // удаляем order items
    await prisma.orderItem.deleteMany({
      where: {
        productId: id,
      },
    });

    // удаляем товар
    await prisma.product.delete({
      where: { id },
    });

    return Response.json({
      message: "Product deleted",
    });
  } catch (error) {
    console.log(error);

    return new Response("Ошибка удаления", {
      status: 500,
    });
  }
}
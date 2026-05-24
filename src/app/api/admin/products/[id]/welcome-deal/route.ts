import { prisma } from "@/lib/prisma";
import { verifyToken } from "@/lib/auth";
import { cookies } from "next/headers";

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) return new Response("Unauthorized", { status: 401 });

  const user = verifyToken(token) as { role?: string } | null;

  if (!user || user.role !== "ADMIN") {
    return new Response("Forbidden", { status: 403 });
  }

  const { id } = await params;
  const { isWelcomeDeal, welcomeDiscount } = await req.json();

  const product = await prisma.product.update({
    where: { id },
    data: {
      isWelcomeDeal,
      welcomeDiscount,
    },
  });

  return Response.json(product);
}
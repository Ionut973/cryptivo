import { prisma } from "@/lib/prisma";
import { verifyToken } from "@/lib/auth";
import { cookies } from "next/headers";

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    return new Response("Unauthorized", { status: 401 });
  }

  const admin = verifyToken(token) as { role?: string } | null;

  if (!admin || admin.role !== "ADMIN") {
    return new Response("Forbidden", { status: 403 });
  }

  const { id } = await params;
  const { loyaltyDiscount } = await req.json();

  const user = await prisma.user.update({
    where: { id },
    data: {
      loyaltyDiscount: Number(loyaltyDiscount),
    },
  });

  return Response.json(user);
}
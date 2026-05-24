import { prisma } from "@/lib/prisma";
import { verifyToken } from "@/lib/auth";
import { cookies } from "next/headers";

export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    return new Response("Unauthorized", { status: 401 });
  }

  const user = verifyToken(token) as { role?: string } | null;

  if (!user || user.role !== "ADMIN") {
    return new Response("Forbidden", { status: 403 });
  }

  const { message } = await req.json();

  if (!message) {
    return new Response("Message required", { status: 400 });
  }

  const reply = await prisma.supportReply.create({
    data: {
      ticketId: id,
      sender: "ADMIN",
      message,
    },
  });

  await prisma.supportTicket.update({
    where: { id },
    data: {
      status: "ANSWERED",
    },
  });

  return Response.json(reply);
}
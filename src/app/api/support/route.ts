import { prisma } from "@/lib/prisma";
import { verifyToken } from "@/lib/auth";
import { cookies } from "next/headers";
import { sendTelegramMessage } from "@/lib/telegram";

export async function POST(req: Request) {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    return new Response("Unauthorized", { status: 401 });
  }

  const user = verifyToken(token) as { id: string; email?: string } | null;

  if (!user) {
    return new Response("Unauthorized", { status: 401 });
  }

  const { subject, message } = await req.json();

  if (!subject || !message) {
    return new Response("Missing fields", { status: 400 });
  }

  const dbUser = await prisma.user.findUnique({
    where: { id: user.id },
  });

  if (!dbUser) {
    return new Response("User not found in DB. Please logout and login again.", {
      status: 400,
    });
  }

  const ticket = await prisma.supportTicket.create({
    data: {
      userId: dbUser.id,
      subject,
      message,
      status: "OPEN",
    },
  });

  await sendTelegramMessage(
    `💬 New support ticket\n\nFrom: ${dbUser.email}\nSubject: ${subject}\nMessage: ${message}`
  );

  return Response.json(ticket);
}
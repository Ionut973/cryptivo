import { prisma } from "@/lib/prisma";
import { verifyToken } from "@/lib/auth";
import { cookies } from "next/headers";
import { sendOrderEmail } from "@/lib/email";
import { sendCampaignEmail } from "@/lib/email";

export async function POST(req: Request) {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    return new Response("Unauthorized", { status: 401 });
  }

  const user = verifyToken(token) as { role?: string } | null;

  if (!user || user.role !== "ADMIN") {
    return new Response("Forbidden", { status: 403 });
  }

  const { title, message } = await req.json();

  const users = await prisma.user.findMany();

  for (const u of users) {
    // Notification на сайте
    await prisma.notification.create({
      data: {
        userId: u.id,
        title,
        message,
        type: "MARKETING",
      },
    });

    // Email
    await sendCampaignEmail(u.email, title, message);
  }

  return Response.json({ success: true });
}
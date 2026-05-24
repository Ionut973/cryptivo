import { prisma } from "@/lib/prisma";
import { sendVerificationCodeEmail } from "@/lib/email";
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const email = body.email?.toLowerCase().trim();

    if (!email) {
      return new Response("Email required", { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      return new Response("Invalid email", { status: 400 });
    }

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return new Response("Email already registered", { status: 400 });
    }

    const code = Math.floor(100000 + Math.random() * 900000).toString();

    await prisma.emailVerification.deleteMany({
      where: { email },
    });

    await prisma.emailVerification.create({
      data: {
        email,
        code,
        expiresAt: new Date(Date.now() + 1000 * 60 * 10),
      },
    });

    await sendVerificationCodeEmail(email, code);

    return new Response("Code sent");
  } catch (error) {
    console.error(error);
    return new Response("Email send error", { status: 500 });
  }
}
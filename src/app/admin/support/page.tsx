import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";
import { verifyToken } from "@/lib/auth";
import { redirect } from "next/navigation";
import AdminSupportReplyForm from "@/components/AdminSupportReplyForm";

export default async function AdminSupportPage() {
  const cookieStore = await cookies();
const token = cookieStore.get("token")?.value;

  if (!token) redirect("/login");

  const user = verifyToken(token) as { role?: string } | null;

  if (!user || user.role !== "ADMIN") {
    redirect("/");
  }

  const tickets = await prisma.supportTicket.findMany({
    include: {
      user: true,
      replies: {
        orderBy: {
          createdAt: "asc",
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <main className="min-h-screen bg-zinc-950 px-6 py-20 text-white">
      <section className="mx-auto max-w-5xl">
        <h1 className="text-4xl font-bold">Support Tickets</h1>

        {tickets.length === 0 ? (
          <p className="mt-6 text-zinc-400">No messages yet.</p>
        ) : (
          <div className="mt-8 space-y-4">
            {tickets.map((ticket) => (
              <div
                key={ticket.id}
                className="rounded-2xl border border-zinc-800 bg-zinc-900 p-5"
              >
                <div className="flex justify-between text-sm text-zinc-400">
                  <span>{ticket.user.email}</span>
                  <span>{new Date(ticket.createdAt).toLocaleString()}</span>
                </div>

                <h2 className="mt-3 text-xl font-semibold">
                  {ticket.subject}
                </h2>

                {/* сообщение клиента */}
                <div className="mt-3 rounded-xl bg-zinc-800 p-3">
                  <p className="text-xs text-zinc-400">User</p>
                  <p className="text-white">{ticket.message}</p>
                </div>

                {/* ответы админа */}
                <div className="mt-4 space-y-2">
                  {ticket.replies.map((reply) => (
                    <div
                      key={reply.id}
                      className="rounded-xl border border-green-500/20 bg-green-500/10 p-3"
                    >
                      <p className="text-xs text-green-400">Admin</p>
                      <p className="text-white">{reply.message}</p>
                    </div>
                  ))}
                </div>

                <AdminSupportReplyForm ticketId={ticket.id} />
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
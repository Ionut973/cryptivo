import SupportForm from "@/components/SupportForm";
import { getServerLang, getTranslations } from "@/lib/i18n";
import CryptoFloating from "@/components/CryptoFloating";
import { cookies } from "next/headers";
import { verifyToken } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export default async function SupportPage() {
  const lang = await getServerLang();
  const text = getTranslations(lang);

  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  let user: { id?: string } | null = null;

  if (token) {
    user = verifyToken(token) as { id?: string } | null;
  }

  let tickets: any[] = [];

  if (user?.id) {
    tickets = await prisma.supportTicket.findMany({
      where: { userId: user.id },
      include: {
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
  }

  return (
    <main className="min-h-screen overflow-hidden bg-zinc-950 px-6 py-20 text-white">
      <section className="relative mx-auto max-w-6xl">
        <CryptoFloating />

        <div className="absolute -left-24 top-10 h-80 w-80 rounded-full bg-green-500/10 blur-3xl" />
        <div className="absolute right-0 top-32 h-80 w-80 rounded-full bg-blue-500/10 blur-3xl" />

        <div className="pointer-events-none absolute left-10 top-10 text-6xl text-green-400/10 animate-pulse">
          ₮
        </div>
        <div className="pointer-events-none absolute right-20 top-20 text-6xl text-blue-400/10 animate-bounce">
          ₿
        </div>
        <div className="pointer-events-none absolute left-1/2 top-20 text-5xl text-purple-400/10 animate-pulse">
          Ξ
        </div>
        <div className="pointer-events-none absolute bottom-10 left-16 text-5xl text-green-400/10 animate-bounce">
          ◎
        </div>
        <div className="pointer-events-none absolute bottom-20 right-20 text-5xl text-blue-400/10 animate-pulse">
          ◈
        </div>
        <div className="pointer-events-none absolute bottom-4 left-1/2 text-5xl text-yellow-400/10 animate-bounce">
          EGLD
        </div>
        <div className="pointer-events-none absolute top-1/2 right-10 text-5xl text-zinc-300/10 animate-pulse">
          FIL
        </div>

        <div className="relative grid gap-8 lg:grid-cols-2">
          {/* LEFT SIDE */}
          <div className="space-y-6">
            <div className="rounded-[2rem] border border-zinc-800 bg-zinc-900/80 p-8 shadow-2xl">
              <p className="text-xs uppercase tracking-[0.35em] text-green-400">
                CRYPTIVO SUPPORT
              </p>

              <h1 className="mt-4 text-5xl font-black">{text.support}</h1>

              <p className="mt-4 leading-7 text-zinc-300">
                {text.supportDescription}
              </p>

              <div className="mt-8 grid gap-4">
                <div className="rounded-2xl border border-zinc-800 bg-black/80 p-5">
                  <p className="text-3xl">🔔</p>
                  <p className="mt-2 font-bold text-white">
                    {text.fastResponse}
                  </p>
                  <p className="mt-1 text-sm text-zinc-400">
                    {text.fastResponseText}
                  </p>
                </div>

                <div className="rounded-2xl border border-zinc-800 bg-black/80 p-5">
                  <p className="text-3xl">🔐</p>
                  <p className="mt-2 font-bold text-white">
                    {text.privateHelp}
                  </p>
                  <p className="mt-1 text-sm text-zinc-400">
                    {text.privateHelpText}
                  </p>
                </div>
              </div>
            </div>

            {/* CLIENT SUPPORT HISTORY */}
            {tickets.length > 0 && (
              <div className="space-y-4">
                <p className="text-xs uppercase tracking-[0.35em] text-green-400">
                  Support chat
                </p>

                {tickets.map((ticket) => (<div
                    key={ticket.id}
                    className="rounded-2xl border border-zinc-800 bg-zinc-900/90 p-5 shadow-xl"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <h2 className="text-xl font-bold">{ticket.subject}</h2>

                      <span className="rounded-full border border-green-500/30 bg-green-500/10 px-3 py-1 text-xs font-bold text-green-400">
                        {ticket.status}
                      </span>
                    </div>

                    <div className="mt-3 rounded-xl border border-zinc-800 bg-black/70 p-3">
                      <p className="text-xs font-bold text-zinc-400">You</p>
                      <p className="mt-1 whitespace-pre-line text-white">
                        {ticket.message}
                      </p>
                    </div>

                    <div className="mt-3 space-y-2">
                      {ticket.replies.length === 0 ? (
                        <p className="rounded-xl border border-zinc-800 bg-black/50 p-3 text-sm text-zinc-500">
                          Admin has not replied yet.
                        </p>
                      ) : (
                        ticket.replies.map((reply: any) => (
                          <div
                            key={reply.id}
                            className="rounded-xl border border-green-500/20 bg-green-500/10 p-3"
                          >
                            <p className="text-xs font-bold text-green-400">
                              Admin
                            </p>
                            <p className="mt-1 whitespace-pre-line text-white">
                              {reply.message}
                            </p>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* RIGHT FORM */}
          <div className="rounded-[2rem] border border-zinc-800 bg-zinc-900/80 p-8 shadow-2xl">
            <SupportForm
              subjectPlaceholder={text.subject}
              messagePlaceholder={text.yourMessage}
              buttonText={text.sendMessage}
            />
          </div>
        </div>
      </section>
    </main>
  );
}
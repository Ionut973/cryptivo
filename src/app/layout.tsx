import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { cookies } from "next/headers";
import { getLang } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "Cryptivo",
  description: "Crypto-powered online store",
  other: {
    google: "notranslate",
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const lang = getLang(cookieStore.get("lang")?.value);

  return (
    <html lang={lang} translate="no" className="notranslate">
      <head>
        <meta name="google" content="notranslate" />
      </head>

      <body translate="no" className="notranslate bg-zinc-950">
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
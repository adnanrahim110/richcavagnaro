import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import LenisProvider from "@/components/layout/LenisProvider";
import type { Metadata } from "next";
import { Caveat, Fredoka, Nunito } from "next/font/google";
import "./globals.css";

const fredoka = Fredoka({
  variable: "--font-fredoka",
  subsets: ["latin"],
  weight: "variable",
});

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
  weight: "variable",
});

const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
  weight: "variable",
});

export const metadata: Metadata = {
  title: "Rory Ruckus – Official Website",
  description:
    "Join Rory Ruckus on a hilarious adventure filled with big imagination, funny mix-ups, and colorful signs!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${fredoka.variable} ${nunito.variable} ${caveat.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col overflow-x-hidden">
        <LenisProvider>
          <Header />
          <main className="pt-18 flex-1">{children}</main>
          <Footer />
        </LenisProvider>
      </body>
    </html>
  );
}

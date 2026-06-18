import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import LenisProvider from "@/components/layout/LenisProvider";
import ToastProvider from "@/components/layout/ToastProvider";
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
  metadataBase: new URL("https://richcavagnarobooks.com"),
  title: {
    template: "%s | Rich Cavagnaro",
    default: "Rich Cavagnaro | Children's Book Author",
  },
  description:
    "The official website of Rich Cavagnaro, author of the hilarious children's book Rory Ruckus. Discover the book, meet the author, and join the fun!",
  keywords: [
    "Rich Cavagnaro",
    "Rory Ruckus",
    "Children's Books",
    "Author",
    "Kids Books",
    "Funny Books for Kids",
    "Picture Books",
  ],
  authors: [{ name: "Rich Cavagnaro" }],
  creator: "Rich Cavagnaro",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://richcavagnarobooks.com",
    title: "Rich Cavagnaro | Children's Book Author",
    description:
      "The official website of Rich Cavagnaro, author of the hilarious children's book Rory Ruckus.",
    siteName: "Rich Cavagnaro",
    images: [
      {
        url: "/imgs/book-mockup.png",
        width: 1200,
        height: 630,
        alt: "Rory Ruckus by Rich Cavagnaro",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Rich Cavagnaro | Children's Book Author",
    description:
      "The official website of Rich Cavagnaro, author of the hilarious children's book Rory Ruckus.",
    images: ["/imgs/book-mockup.png"],
  },
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
          <ToastProvider />
        </LenisProvider>
      </body>
    </html>
  );
}

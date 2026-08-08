import type { Metadata } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";

import Footer from "@/components/Footer/Footer";
import AppToaster from "@/components/AppToaster/AppToaster";
import QueryProvider from "@/components/QueryProvider/QueryProvider";

import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const manrope = Manrope({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "SCAR Tattoo Studio",
  description:
    "Discover professional tattoo artists, explore their work and book a consultation.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${cormorant.variable} ${manrope.variable}`}>
        <QueryProvider>{children}</QueryProvider>

        <Footer />

        <AppToaster />
      </body>
    </html>
  );
}
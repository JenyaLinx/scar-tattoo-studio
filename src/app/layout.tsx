import type { Metadata } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import AppToaster from "@/components/AppToaster/AppToaster";
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

const themeScript = `
  try {
    const savedTheme = localStorage.getItem("scar-theme");
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;

    const theme =
      savedTheme === "light" || savedTheme === "dark"
        ? savedTheme
        : prefersDark
          ? "dark"
          : "light";

    document.documentElement.dataset.theme = theme;
  } catch {}
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>

      <body className={`${cormorant.variable} ${manrope.variable}`}>
        {children}
        <AppToaster />
      </body>
    </html>
  );
}
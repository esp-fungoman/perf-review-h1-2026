import type { Metadata } from "next";
import { DM_Sans, Plus_Jakarta_Sans } from "next/font/google";
import "@xyflow/react/dist/base.css";
import "./globals.css";
import { LenisProvider } from "@/components/lenis-provider";
import { ScrollProgress } from "@/components/scroll-progress";

const heading = Plus_Jakarta_Sans({
  variable: "--font-display",
  subsets: ["latin"],
});
const body = DM_Sans({
  variable: "--font-body",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Half-Year Review",
  description: "A look back at the work, the wins, and the growth — H1 2025.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${heading.variable} ${body.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-background text-foreground">
        <LenisProvider>
          <ScrollProgress />
          {children}
        </LenisProvider>
      </body>
    </html>
  );
}

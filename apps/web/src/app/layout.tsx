import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Duracalc | Advanced EMI & Basic Calculator",
  description: "Calculate your EMI, generate printable repayment schedules, and perform basic math operations with Duracalc.",
  keywords: "EMI calculator, loan calculator, repayment schedule, basic calculator, math calculator, mortgage calculator, Duracalc",
  openGraph: {
    title: "Duracalc | Advanced EMI & Basic Calculator",
    description: "Calculate your EMI, generate printable repayment schedules, and perform basic math operations with Duracalc.",
    type: "website",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-zinc-950 text-zinc-50 font-sans">
        {children}
      </body>
    </html>
  );
}

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Basic Math Calculator | Duracalc",
  description: "Free online basic math calculator with brackets, percentages, and history. Easy to use for everyday calculations.",
  keywords: "basic calculator, math calculator, percentage calculator, online calculator, simple calculator",
};

export default function BasicCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

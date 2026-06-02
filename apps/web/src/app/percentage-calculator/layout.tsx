import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Percentage Calculator | Duracalc",
  description: "Free online percentage calculator. Quickly calculate what is X% of Y, X is what % of Y, and percentage increase or decrease.",
  keywords: "percentage calculator, percent calculator, percentage increase, discount calculator, online calculator",
};

export default function PercentageCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

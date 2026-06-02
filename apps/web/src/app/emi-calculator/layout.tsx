import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "EMI Calculator | Duracalc",
  description: "Calculate your Equated Monthly Installment (EMI) for home loans, car loans, and personal loans. View printable repayment schedules with charts.",
  keywords: "EMI calculator, loan calculator, mortgage calculator, repayment schedule, print emi schedule",
};

export default function EMICalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

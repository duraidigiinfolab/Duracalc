"use client";

import { useSearchParams } from "next/navigation";
import { calculateEmi } from "@calculator/shared";
import { Suspense } from "react";
import Link from "next/link";

function ScheduleContent() {
  const searchParams = useSearchParams();
  const p = parseFloat(searchParams.get("p") || "0");
  const r = parseFloat(searchParams.get("r") || "0");
  const t = parseFloat(searchParams.get("t") || "0");
  const y = searchParams.get("y") === "true";

  const { monthlyEmi, totalInterest, totalPayment, schedule } = calculateEmi({
    principal: p,
    annualInterestRate: r,
    tenure: t,
    isTenureInYears: y,
  });

  const handlePrint = () => {
    window.print();
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "My EMI Repayment Schedule",
          text: `Loan Amount: ₹${p.toLocaleString("en-IN")}\nEMI: ₹${monthlyEmi.toLocaleString("en-IN")}\nTotal Payment: ₹${totalPayment.toLocaleString("en-IN")}`,
          url: window.location.href,
        });
      } catch (err) {
        console.error("Error sharing:", err);
      }
    } else {
      alert("Web Share API is not supported in your browser. You can copy the URL to share.");
    }
  };

  if (p === 0 || r === 0 || t === 0 || !schedule || schedule.length === 0) {
    return (
      <div className="text-center py-12">
        <h2 className="text-xl text-zinc-400">Invalid loan details provided.</h2>
        <Link href="/emi-calculator" className="mt-4 inline-block text-purple-400 hover:text-purple-300">
          Go back to Calculator
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto p-4 md:p-8">
      {/* Non-printable action bar */}
      <div className="flex justify-between items-center mb-8 print:hidden">
        <Link href="/emi-calculator" className="text-zinc-400 hover:text-zinc-200 transition-colors flex items-center">
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
          Back
        </Link>
        <div className="flex space-x-4">
          <button onClick={handleShare} className="flex items-center px-4 py-2 bg-zinc-800 text-white rounded-lg hover:bg-zinc-700 transition-colors">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" /></svg>
            Share
          </button>
          <button onClick={handlePrint} className="flex items-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-500 transition-colors">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" /></svg>
            Print
          </button>
        </div>
      </div>

      {/* Printable Area */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl shadow-xl overflow-hidden print:bg-white print:border-none print:shadow-none print:text-black">
        {/* Header Summary */}
        <div className="p-6 md:p-8 border-b border-zinc-800 print:border-gray-200">
          <h1 className="text-3xl font-bold mb-6 print:text-black text-white">Repayment Schedule</h1>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div>
              <div className="text-sm text-zinc-400 print:text-gray-500 mb-1">Loan Amount</div>
              <div className="font-semibold text-lg print:text-black text-zinc-100">₹{p.toLocaleString("en-IN")}</div>
            </div>
            <div>
              <div className="text-sm text-zinc-400 print:text-gray-500 mb-1">Interest Rate</div>
              <div className="font-semibold text-lg print:text-black text-zinc-100">{r}%</div>
            </div>
            <div>
              <div className="text-sm text-zinc-400 print:text-gray-500 mb-1">Total Interest</div>
              <div className="font-semibold text-lg print:text-black text-zinc-100">₹{totalInterest.toLocaleString("en-IN", { maximumFractionDigits: 2 })}</div>
            </div>
            <div>
              <div className="text-sm text-zinc-400 print:text-gray-500 mb-1">Total Payment</div>
              <div className="font-semibold text-lg print:text-black text-zinc-100">₹{totalPayment.toLocaleString("en-IN", { maximumFractionDigits: 2 })}</div>
            </div>
          </div>
        </div>

        {/* Schedule Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-zinc-950/50 print:bg-gray-50">
                <th className="p-4 font-medium text-zinc-400 print:text-gray-600 border-b border-zinc-800 print:border-gray-200">Month</th>
                <th className="p-4 font-medium text-zinc-400 print:text-gray-600 border-b border-zinc-800 print:border-gray-200 text-right">EMI</th>
                <th className="p-4 font-medium text-zinc-400 print:text-gray-600 border-b border-zinc-800 print:border-gray-200 text-right">Principal</th>
                <th className="p-4 font-medium text-zinc-400 print:text-gray-600 border-b border-zinc-800 print:border-gray-200 text-right">Interest</th>
                <th className="p-4 font-medium text-zinc-400 print:text-gray-600 border-b border-zinc-800 print:border-gray-200 text-right">Balance</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/50 print:divide-gray-100">
              {schedule.map((row) => (
                <tr key={row.month} className="hover:bg-zinc-800/20 print:hover:bg-transparent">
                  <td className="p-4 print:text-black text-zinc-300">{row.month}</td>
                  <td className="p-4 print:text-black text-zinc-300 text-right font-medium">₹{row.emi.toLocaleString("en-IN", { maximumFractionDigits: 2 })}</td>
                  <td className="p-4 print:text-black text-zinc-300 text-right text-green-400/80 print:text-green-700">₹{row.principalPaid.toLocaleString("en-IN", { maximumFractionDigits: 2 })}</td>
                  <td className="p-4 print:text-black text-zinc-300 text-right text-red-400/80 print:text-red-700">₹{row.interestPaid.toLocaleString("en-IN", { maximumFractionDigits: 2 })}</td>
                  <td className="p-4 print:text-black text-zinc-300 text-right">₹{row.remainingBalance.toLocaleString("en-IN", { maximumFractionDigits: 2 })}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default function SchedulePage() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center min-h-screen text-white">Loading schedule...</div>}>
      <div className="min-h-screen bg-zinc-950 print:bg-white text-zinc-50 font-sans">
        <ScheduleContent />
      </div>
    </Suspense>
  );
}

"use client";

import { useState } from "react";
import Link from "next/link";
import { calculateEmi } from "@calculator/shared";

export default function Home() {
  const [principal, setPrincipal] = useState<string>("");
  const [rate, setRate] = useState<string>("");
  const [tenure, setTenure] = useState<string>("");
  const [isYears, setIsYears] = useState<boolean>(true);

  const p = parseFloat(principal) || 0;
  const r = parseFloat(rate) || 0;
  const t = parseFloat(tenure) || 0;

  const { monthlyEmi, totalInterest, totalPayment } = calculateEmi({
    principal: p,
    annualInterestRate: r,
    tenure: t,
    isTenureInYears: isYears,
  });

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-50 flex items-center justify-center p-4 font-sans">
      <div className="max-w-md w-full relative">
        <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl blur opacity-30 animate-pulse"></div>
        <div className="relative bg-zinc-900/80 backdrop-blur-xl border border-zinc-800 p-8 rounded-2xl shadow-2xl">
          <h1 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            EMI Calculator
          </h1>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-zinc-400 mb-2">
                Principal Amount (₹)
              </label>
              <input
                type="number"
                value={principal}
                onChange={(e) => setPrincipal(e.target.value)}
                placeholder="e.g. 500000"
                className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-3 text-zinc-100 placeholder-zinc-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-zinc-400 mb-2">
                Annual Interest Rate (%)
              </label>
              <input
                type="number"
                value={rate}
                onChange={(e) => setRate(e.target.value)}
                placeholder="e.g. 8.5"
                className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-3 text-zinc-100 placeholder-zinc-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-sm font-medium text-zinc-400">
                  Tenure
                </label>
                <div className="flex bg-zinc-950 rounded-lg p-1 border border-zinc-800">
                  <button
                    onClick={() => setIsYears(true)}
                    className={`px-3 py-1 text-xs rounded-md transition-colors ${
                      isYears
                        ? "bg-purple-600 text-white"
                        : "text-zinc-400 hover:text-zinc-200"
                    }`}
                  >
                    Years
                  </button>
                  <button
                    onClick={() => setIsYears(false)}
                    className={`px-3 py-1 text-xs rounded-md transition-colors ${
                      !isYears
                        ? "bg-purple-600 text-white"
                        : "text-zinc-400 hover:text-zinc-200"
                    }`}
                  >
                    Months
                  </button>
                </div>
              </div>
              <input
                type="number"
                value={tenure}
                onChange={(e) => setTenure(e.target.value)}
                placeholder={isYears ? "e.g. 5" : "e.g. 60"}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-3 text-zinc-100 placeholder-zinc-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
              />
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-zinc-800 space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-zinc-400">Monthly EMI</span>
              <span className="text-2xl font-bold text-white">
                ₹{monthlyEmi.toLocaleString("en-IN", { maximumFractionDigits: 2 })}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-zinc-400">Total Interest</span>
              <span className="text-lg font-semibold text-zinc-200">
                ₹{totalInterest.toLocaleString("en-IN", { maximumFractionDigits: 2 })}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-zinc-400">Total Payment</span>
              <span className="text-lg font-semibold text-zinc-200">
                ₹{totalPayment.toLocaleString("en-IN", { maximumFractionDigits: 2 })}
              </span>
            </div>
            
            {p > 0 && r > 0 && t > 0 && (
              <div className="pt-4">
                <Link
                  href={{
                    pathname: "/emi-calculator/schedule",
                    query: { p: p.toString(), r: r.toString(), t: t.toString(), y: isYears.toString() }
                  }}
                  className="w-full block text-center bg-purple-600 hover:bg-purple-500 text-white font-semibold py-3 rounded-lg transition-colors"
                >
                  View Repayment Schedule
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

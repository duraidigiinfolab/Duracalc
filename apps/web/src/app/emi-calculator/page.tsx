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
    <div className="min-h-screen bg-[#FFFFFF] text-gray-900 flex items-center justify-center p-4 md:p-8 font-sans">
      <div className="max-w-4xl w-full relative">
        <div className="absolute -inset-1 bg-[#2563EB]/10 rounded-3xl blur-xl opacity-30 animate-pulse"></div>
        <div className="relative bg-[#FFFFFF] backdrop-blur-xl border border-[#E5E7EB] p-8 md:p-12 rounded-3xl shadow-2xl">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-10 bg-gradient-to-r from-[#2563EB] to-blue-400 bg-clip-text text-transparent">
            EMI Calculator
          </h1>

          <div className="grid md:grid-cols-2 gap-8 md:gap-12">
            <div className="space-y-8">
              <div>
                <label className="block text-base font-medium text-gray-600 mb-3">
                  Principal Amount (₹)
                </label>
                <input
                  type="number"
                  value={principal}
                  onChange={(e) => setPrincipal(e.target.value)}
                  placeholder="e.g. 500000"
                  className="w-full bg-[#FFFFFF] border border-[#E5E7EB] rounded-xl px-5 py-4 text-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-transparent transition-all"
                />
              </div>

              <div>
                <label className="block text-base font-medium text-gray-600 mb-3">
                  Annual Interest Rate (%)
                </label>
                <input
                  type="number"
                  value={rate}
                  onChange={(e) => setRate(e.target.value)}
                  placeholder="e.g. 8.5"
                  className="w-full bg-[#FFFFFF] border border-[#E5E7EB] rounded-xl px-5 py-4 text-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-transparent transition-all"
                />
              </div>

              <div>
                <div className="flex justify-between items-center mb-3">
                  <label className="block text-base font-medium text-gray-600">
                    Tenure
                  </label>
                  <div className="flex bg-gray-50 rounded-lg p-1 border border-[#E5E7EB]">
                    <button
                      onClick={() => setIsYears(true)}
                      className={`px-4 py-2 text-sm rounded-md transition-colors ${
                        isYears
                          ? "bg-[#2563EB] text-white font-medium"
                          : "text-gray-500 hover:text-gray-700"
                      }`}
                    >
                      Years
                    </button>
                    <button
                      onClick={() => setIsYears(false)}
                      className={`px-4 py-2 text-sm rounded-md transition-colors ${
                        !isYears
                          ? "bg-[#2563EB] text-white font-medium"
                          : "text-gray-500 hover:text-gray-700"
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
                  className="w-full bg-[#FFFFFF] border border-[#E5E7EB] rounded-xl px-5 py-4 text-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-transparent transition-all"
                />
              </div>
            </div>

            <div className="flex flex-col justify-center bg-gray-50 p-8 rounded-2xl border border-[#E5E7EB] space-y-6">
              <div>
                <div className="text-gray-500 mb-2">Monthly EMI</div>
                <div className="text-4xl md:text-5xl font-bold text-[#2563EB] break-all">
                  ₹{monthlyEmi.toLocaleString("en-IN", { maximumFractionDigits: 2 })}
                </div>
              </div>
              <div className="pt-6 border-t border-[#E5E7EB] space-y-6">
                <div>
                  <div className="text-gray-500 mb-1">Total Interest</div>
                  <div className="text-2xl font-semibold text-gray-800">
                    ₹{totalInterest.toLocaleString("en-IN", { maximumFractionDigits: 2 })}
                  </div>
                </div>
                <div>
                  <div className="text-gray-500 mb-1">Total Payment</div>
                  <div className="text-2xl font-semibold text-gray-800">
                    ₹{totalPayment.toLocaleString("en-IN", { maximumFractionDigits: 2 })}
                  </div>
                </div>
              </div>
              
              {p > 0 && r > 0 && t > 0 && (
                <div className="pt-6">
                  <Link
                    href={{
                      pathname: "/emi-calculator/schedule",
                      query: { p: p.toString(), r: r.toString(), t: t.toString(), y: isYears.toString() }
                    }}
                    className="w-full block text-center bg-[#2563EB] hover:bg-blue-700 text-white font-bold py-4 rounded-xl transition-colors text-lg"
                  >
                    View Repayment Schedule
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

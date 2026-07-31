"use client";

import { useState } from "react";
import Link from "next/link";
import { calculateEligibility } from "@calculator/shared";

export default function EligibilityCalculator() {
  const [monthlyIncome, setMonthlyIncome] = useState<string>("");
  const [foir, setFoir] = useState<string>("");
  const [existingEmis, setExistingEmis] = useState<string>("");
  const [rate, setRate] = useState<string>("");
  const [tenure, setTenure] = useState<string>("");
  const [isYears, setIsYears] = useState<boolean>(true);

  const mIncome = parseFloat(monthlyIncome) || 0;
  const f = parseFloat(foir) || 0;
  const eEmis = parseFloat(existingEmis) || 0;
  const r = parseFloat(rate) || 0;
  const t = parseFloat(tenure) || 0;

  const { eligibleEmi, eligibleLoanAmount, maxAllowableEmi } = calculateEligibility({
    monthlyIncome: mIncome,
    foir: f,
    existingEmis: eEmis,
    annualInterestRate: r,
    tenure: t,
    isTenureInYears: isYears,
  });

  return (
    <div className="min-h-screen bg-[#FFFFFF] text-gray-900 flex items-center justify-center p-4 md:p-8 font-sans">
      <div className="max-w-5xl w-full relative">
        <div className="absolute -inset-1 bg-[#2563EB]/10 rounded-3xl blur-xl opacity-30 animate-pulse"></div>
        <div className="relative bg-[#FFFFFF] backdrop-blur-xl border border-[#E5E7EB] p-8 md:p-12 rounded-3xl shadow-2xl">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-10 bg-gradient-to-r from-[#2563EB] to-blue-400 bg-clip-text text-transparent">
            Eligibility Calculator
          </h1>

          <div className="grid md:grid-cols-2 gap-8 md:gap-12">
            <div className="space-y-6">
              <div>
                <label className="block text-base font-medium text-gray-600 mb-2">
                  Monthly Income (₹)
                </label>
                <input
                  type="number"
                  value={monthlyIncome}
                  onChange={(e) => setMonthlyIncome(e.target.value)}
                  placeholder="e.g. 100000"
                  className="w-full bg-[#FFFFFF] border border-[#E5E7EB] rounded-xl px-5 py-3 text-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-transparent transition-all"
                />
              </div>

              <div>
                <label className="block text-base font-medium text-gray-600 mb-2">
                  FOIR (%) <span className="text-sm font-normal text-gray-400">- Max allowable deduction</span>
                </label>
                <input
                  type="number"
                  value={foir}
                  onChange={(e) => setFoir(e.target.value)}
                  placeholder="e.g. 50"
                  className="w-full bg-[#FFFFFF] border border-[#E5E7EB] rounded-xl px-5 py-3 text-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-transparent transition-all"
                />
              </div>

              <div>
                <label className="block text-base font-medium text-gray-600 mb-2">
                  Existing Monthly EMIs (₹)
                </label>
                <input
                  type="number"
                  value={existingEmis}
                  onChange={(e) => setExistingEmis(e.target.value)}
                  placeholder="e.g. 15000"
                  className="w-full bg-[#FFFFFF] border border-[#E5E7EB] rounded-xl px-5 py-3 text-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-transparent transition-all"
                />
              </div>

              <div>
                <label className="block text-base font-medium text-gray-600 mb-2">
                  Annual Interest Rate (%)
                </label>
                <input
                  type="number"
                  value={rate}
                  onChange={(e) => setRate(e.target.value)}
                  placeholder="e.g. 8.5"
                  className="w-full bg-[#FFFFFF] border border-[#E5E7EB] rounded-xl px-5 py-3 text-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-transparent transition-all"
                />
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-base font-medium text-gray-600">
                    Tenure
                  </label>
                  <div className="flex bg-gray-50 rounded-lg p-1 border border-[#E5E7EB]">
                    <button
                      onClick={() => setIsYears(true)}
                      className={`px-3 py-1.5 text-sm rounded-md transition-colors ${
                        isYears
                          ? "bg-[#2563EB] text-white font-medium"
                          : "text-gray-500 hover:text-gray-700"
                      }`}
                    >
                      Years
                    </button>
                    <button
                      onClick={() => setIsYears(false)}
                      className={`px-3 py-1.5 text-sm rounded-md transition-colors ${
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
                  className="w-full bg-[#FFFFFF] border border-[#E5E7EB] rounded-xl px-5 py-3 text-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-transparent transition-all"
                />
              </div>
            </div>

            <div className="flex flex-col justify-center bg-gray-50 p-8 rounded-2xl border border-[#E5E7EB] space-y-6">
              <div>
                <div className="text-gray-500 mb-2">Eligible Loan Amount</div>
                <div className="text-4xl md:text-5xl font-bold text-[#2563EB] break-all">
                  ₹{eligibleLoanAmount.toLocaleString("en-IN", { maximumFractionDigits: 2 })}
                </div>
              </div>
              <div className="pt-6 border-t border-[#E5E7EB] space-y-6">
                <div>
                  <div className="text-gray-500 mb-1">Eligible Monthly EMI</div>
                  <div className="text-2xl font-semibold text-gray-800">
                    ₹{eligibleEmi.toLocaleString("en-IN", { maximumFractionDigits: 2 })}
                  </div>
                </div>
                <div>
                  <div className="text-gray-500 mb-1">Max Allowable EMI (Based on FOIR)</div>
                  <div className="text-2xl font-semibold text-gray-800">
                    ₹{maxAllowableEmi.toLocaleString("en-IN", { maximumFractionDigits: 2 })}
                  </div>
                </div>
              </div>

              <div className="pt-6">
                <Link
                  href="/"
                  className="w-full block text-center bg-white border border-[#2563EB] text-[#2563EB] hover:bg-gray-50 font-bold py-4 rounded-xl transition-colors text-lg"
                >
                  Back to Home
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

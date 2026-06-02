"use client";

import { useState } from "react";
import { 
  calculatePercentage, 
  calculatePercentageOf, 
  calculatePercentageChange 
} from "@calculator/shared";

export default function PercentageCalculator() {
  // Mode 1: What is X% of Y?
  const [m1Pct, setM1Pct] = useState<string>("");
  const [m1Val, setM1Val] = useState<string>("");
  const m1Result = calculatePercentage(parseFloat(m1Pct) || 0, parseFloat(m1Val) || 0);

  // Mode 2: X is what % of Y?
  const [m2Part, setM2Part] = useState<string>("");
  const [m2Total, setM2Total] = useState<string>("");
  const m2Result = calculatePercentageOf(parseFloat(m2Part) || 0, parseFloat(m2Total) || 0);

  // Mode 3: Percentage change from X to Y
  const [m3Old, setM3Old] = useState<string>("");
  const [m3New, setM3New] = useState<string>("");
  const m3Result = calculatePercentageChange(parseFloat(m3Old) || 0, parseFloat(m3New) || 0);

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-50 py-12 px-4 font-sans flex justify-center items-start">
      <div className="w-full max-w-4xl space-y-8 mt-8">
        
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-emerald-400 via-violet-400 to-amber-400 bg-clip-text text-transparent">
            Percentage Calculator
          </h1>
          <p className="mt-4 text-zinc-400">Easily calculate percentages across three different scenarios.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          
          {/* Card 1: Emerald */}
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-br from-emerald-600 to-teal-600 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-500"></div>
            <div className="relative bg-zinc-900/80 backdrop-blur-xl border border-zinc-800/50 p-6 rounded-2xl h-full flex flex-col shadow-xl">
              <h2 className="text-xl font-bold text-emerald-400 mb-6">What is X% of Y?</h2>
              <div className="space-y-4 flex-grow">
                <div>
                  <label className="block text-xs font-medium text-zinc-500 mb-1">Percentage (X)</label>
                  <input
                    type="number"
                    value={m1Pct}
                    onChange={(e) => setM1Pct(e.target.value)}
                    placeholder="e.g. 20"
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-zinc-100 placeholder-zinc-700 focus:outline-none focus:ring-1 focus:ring-emerald-500 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-zinc-500 mb-1">Value (Y)</label>
                  <input
                    type="number"
                    value={m1Val}
                    onChange={(e) => setM1Val(e.target.value)}
                    placeholder="e.g. 150"
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-zinc-100 placeholder-zinc-700 focus:outline-none focus:ring-1 focus:ring-emerald-500 transition-all"
                  />
                </div>
              </div>
              <div className="mt-6 pt-4 border-t border-zinc-800/50 text-center">
                <div className="text-sm text-zinc-500 mb-1">Result</div>
                <div className="text-2xl font-bold text-white break-all">
                  {m1Pct && m1Val ? m1Result.toLocaleString("en-US", { maximumFractionDigits: 4 }) : "—"}
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: Violet */}
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-br from-violet-600 to-fuchsia-600 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-500"></div>
            <div className="relative bg-zinc-900/80 backdrop-blur-xl border border-zinc-800/50 p-6 rounded-2xl h-full flex flex-col shadow-xl">
              <h2 className="text-xl font-bold text-violet-400 mb-6">X is what % of Y?</h2>
              <div className="space-y-4 flex-grow">
                <div>
                  <label className="block text-xs font-medium text-zinc-500 mb-1">Part (X)</label>
                  <input
                    type="number"
                    value={m2Part}
                    onChange={(e) => setM2Part(e.target.value)}
                    placeholder="e.g. 30"
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-zinc-100 placeholder-zinc-700 focus:outline-none focus:ring-1 focus:ring-violet-500 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-zinc-500 mb-1">Total (Y)</label>
                  <input
                    type="number"
                    value={m2Total}
                    onChange={(e) => setM2Total(e.target.value)}
                    placeholder="e.g. 150"
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-zinc-100 placeholder-zinc-700 focus:outline-none focus:ring-1 focus:ring-violet-500 transition-all"
                  />
                </div>
              </div>
              <div className="mt-6 pt-4 border-t border-zinc-800/50 text-center">
                <div className="text-sm text-zinc-500 mb-1">Result</div>
                <div className="text-2xl font-bold text-white break-all">
                  {m2Part && m2Total ? m2Result.toLocaleString("en-US", { maximumFractionDigits: 4 }) + "%" : "—"}
                </div>
              </div>
            </div>
          </div>

          {/* Card 3: Amber */}
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-br from-amber-600 to-orange-600 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-500"></div>
            <div className="relative bg-zinc-900/80 backdrop-blur-xl border border-zinc-800/50 p-6 rounded-2xl h-full flex flex-col shadow-xl">
              <h2 className="text-xl font-bold text-amber-400 mb-6">Percentage Change</h2>
              <div className="space-y-4 flex-grow">
                <div>
                  <label className="block text-xs font-medium text-zinc-500 mb-1">Old Value (From)</label>
                  <input
                    type="number"
                    value={m3Old}
                    onChange={(e) => setM3Old(e.target.value)}
                    placeholder="e.g. 100"
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-zinc-100 placeholder-zinc-700 focus:outline-none focus:ring-1 focus:ring-amber-500 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-zinc-500 mb-1">New Value (To)</label>
                  <input
                    type="number"
                    value={m3New}
                    onChange={(e) => setM3New(e.target.value)}
                    placeholder="e.g. 120"
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-zinc-100 placeholder-zinc-700 focus:outline-none focus:ring-1 focus:ring-amber-500 transition-all"
                  />
                </div>
              </div>
              <div className="mt-6 pt-4 border-t border-zinc-800/50 text-center">
                <div className="text-sm text-zinc-500 mb-1">Result</div>
                <div className={`text-2xl font-bold break-all ${m3Result > 0 ? 'text-green-400' : m3Result < 0 ? 'text-red-400' : 'text-white'}`}>
                  {m3Old && m3New 
                    ? (m3Result > 0 ? '+' : '') + m3Result.toLocaleString("en-US", { maximumFractionDigits: 4 }) + "%" 
                    : "—"}
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

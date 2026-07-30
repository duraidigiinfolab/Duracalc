"use client";

import { useState, useEffect } from "react";

export default function PercentageCalculator() {
  const [initial, setInitial] = useState<string>("");
  const [percentage, setPercentage] = useState<string>("");
  const [change, setChange] = useState<string>("");
  const [final, setFinal] = useState<string>("");

  const [lastEdited, setLastEdited] = useState<string[]>([]);

  const handleInput = (field: string, value: string) => {
    let newEdited = lastEdited.filter(f => f !== field);
    newEdited.push(field);
    if (newEdited.length > 2) {
      newEdited.shift();
    }
    setLastEdited(newEdited);

    if (field === "initial") setInitial(value);
    if (field === "percentage") setPercentage(value);
    if (field === "change") setChange(value);
    if (field === "final") setFinal(value);
  };

  useEffect(() => {
    if (lastEdited.length < 2) return;

    const v = parseFloat(initial);
    const p = parseFloat(percentage);
    const c = parseFloat(change);
    const f = parseFloat(final);

    const formatNum = (num: number) => {
      if (isNaN(num) || !isFinite(num)) return "";
      return Number.isInteger(num) ? num.toString() : num.toFixed(4).replace(/\.?0+$/, '');
    };

    if (lastEdited.includes("initial") && lastEdited.includes("percentage")) {
      if (!isNaN(v) && !isNaN(p)) {
        setChange(formatNum(v * (p / 100)));
        setFinal(formatNum(v * (1 + p / 100)));
      }
    } else if (lastEdited.includes("initial") && lastEdited.includes("change")) {
      if (!isNaN(v) && !isNaN(c)) {
        setPercentage(v !== 0 ? formatNum((c / v) * 100) : "");
        setFinal(formatNum(v + c));
      }
    } else if (lastEdited.includes("initial") && lastEdited.includes("final")) {
      if (!isNaN(v) && !isNaN(f)) {
        const computedChange = f - v;
        setChange(formatNum(computedChange));
        setPercentage(v !== 0 ? formatNum((computedChange / v) * 100) : "");
      }
    } else if (lastEdited.includes("percentage") && lastEdited.includes("change")) {
      if (!isNaN(p) && !isNaN(c)) {
        const computedV = p !== 0 ? c / (p / 100) : NaN;
        setInitial(formatNum(computedV));
        setFinal(formatNum(computedV + c));
      }
    } else if (lastEdited.includes("percentage") && lastEdited.includes("final")) {
      if (!isNaN(p) && !isNaN(f)) {
        const computedV = f / (1 + p / 100);
        setInitial(formatNum(computedV));
        setChange(formatNum(f - computedV));
      }
    } else if (lastEdited.includes("change") && lastEdited.includes("final")) {
      if (!isNaN(c) && !isNaN(f)) {
        const computedV = f - c;
        setInitial(formatNum(computedV));
        setPercentage(computedV !== 0 ? formatNum((c / computedV) * 100) : "");
      }
    }
  }, [initial, percentage, change, final, lastEdited]);

  const clearAll = () => {
    setInitial("");
    setPercentage("");
    setChange("");
    setFinal("");
    setLastEdited([]);
  };

  return (
    <div className="min-h-screen bg-[#FFFFFF] text-gray-900 py-12 px-4 md:px-8 font-sans flex justify-center items-center">
      <div className="w-full max-w-3xl relative">
        <div className="absolute -inset-1 bg-[#2563EB]/10 rounded-3xl blur-xl opacity-30 animate-pulse"></div>
        <div className="relative bg-[#FFFFFF] backdrop-blur-xl border border-[#E5E7EB] p-8 md:p-12 rounded-3xl shadow-2xl">
          <div className="text-center mb-10">
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-[#2563EB] to-blue-400 bg-clip-text text-transparent pb-2">
              Percentage Calculator
            </h1>
            <p className="mt-4 text-gray-600">Enter any two values to automatically calculate the rest.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-2">Initial Value</label>
                <input
                  type="number"
                  value={initial}
                  onChange={(e) => handleInput("initial", e.target.value)}
                  placeholder="e.g. 100"
                  className="w-full bg-[#FFFFFF] border border-[#E5E7EB] rounded-xl px-5 py-4 text-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#2563EB] transition-all"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-2">Percentage (%)</label>
                <input
                  type="number"
                  value={percentage}
                  onChange={(e) => handleInput("percentage", e.target.value)}
                  placeholder="e.g. 20"
                  className="w-full bg-[#FFFFFF] border border-[#E5E7EB] rounded-xl px-5 py-4 text-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#2563EB] transition-all"
                />
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-2">Change (Amount)</label>
                <input
                  type="number"
                  value={change}
                  onChange={(e) => handleInput("change", e.target.value)}
                  placeholder="e.g. 20"
                  className="w-full bg-[#FFFFFF] border border-[#E5E7EB] rounded-xl px-5 py-4 text-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#2563EB] transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600 mb-2">Final Value</label>
                <input
                  type="number"
                  value={final}
                  onChange={(e) => handleInput("final", e.target.value)}
                  placeholder="e.g. 120"
                  className="w-full bg-[#FFFFFF] border border-[#E5E7EB] rounded-xl px-5 py-4 text-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#2563EB] transition-all"
                />
              </div>
            </div>
          </div>
          
          <div className="mt-8 text-center">
            <button 
              onClick={clearAll}
              className="px-8 py-3 bg-[#E5E7EB] hover:bg-gray-300 text-gray-700 rounded-xl font-medium transition-colors"
            >
              Clear All
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}

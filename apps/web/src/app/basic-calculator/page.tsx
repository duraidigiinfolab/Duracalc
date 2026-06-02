"use client";

import { useState } from "react";
import { evaluateBasicMath } from "@calculator/shared";

export default function BasicCalculator() {
  const [display, setDisplay] = useState<string>("0");
  const [expression, setExpression] = useState<string>("");

  const handleNumber = (num: string) => {
    setDisplay(display === "0" || display === "Error" ? num : display + num);
  };

  const handleOperator = (op: string) => {
    if (display === "Error") return;
    setExpression(expression + display + op);
    setDisplay("0");
  };

  const calculate = () => {
    if (display === "Error") return;
    const fullExpression = expression + display;
    const result = evaluateBasicMath(fullExpression);
    setDisplay(result);
    setExpression("");
  };

  const clear = () => {
    setDisplay("0");
    setExpression("");
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-50 flex items-center justify-center p-4 font-sans">
      <div className="max-w-xs w-full relative">
        <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-2xl blur opacity-30 animate-pulse"></div>
        <div className="relative bg-zinc-900/90 backdrop-blur-xl border border-zinc-800 p-6 rounded-2xl shadow-2xl">
          <h1 className="text-xl font-bold text-center mb-6 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            Basic Calculator
          </h1>

          <div className="bg-zinc-950 rounded-lg p-4 mb-6 border border-zinc-800 text-right">
            <div className="text-zinc-500 text-sm h-5 overflow-hidden">{expression}</div>
            <div className="text-4xl font-semibold text-white tracking-wider truncate">{display}</div>
          </div>

          <div className="grid grid-cols-4 gap-3">
            <button onClick={clear} className="col-span-3 bg-red-900/30 text-red-400 hover:bg-red-900/50 p-4 rounded-xl font-bold transition-colors">AC</button>
            <button onClick={() => handleOperator("/")} className="bg-zinc-800 text-blue-400 hover:bg-zinc-700 p-4 rounded-xl font-bold transition-colors">÷</button>

            <button onClick={() => handleNumber("7")} className="bg-zinc-800/50 hover:bg-zinc-700/50 p-4 rounded-xl font-semibold transition-colors">7</button>
            <button onClick={() => handleNumber("8")} className="bg-zinc-800/50 hover:bg-zinc-700/50 p-4 rounded-xl font-semibold transition-colors">8</button>
            <button onClick={() => handleNumber("9")} className="bg-zinc-800/50 hover:bg-zinc-700/50 p-4 rounded-xl font-semibold transition-colors">9</button>
            <button onClick={() => handleOperator("*")} className="bg-zinc-800 text-blue-400 hover:bg-zinc-700 p-4 rounded-xl font-bold transition-colors">×</button>

            <button onClick={() => handleNumber("4")} className="bg-zinc-800/50 hover:bg-zinc-700/50 p-4 rounded-xl font-semibold transition-colors">4</button>
            <button onClick={() => handleNumber("5")} className="bg-zinc-800/50 hover:bg-zinc-700/50 p-4 rounded-xl font-semibold transition-colors">5</button>
            <button onClick={() => handleNumber("6")} className="bg-zinc-800/50 hover:bg-zinc-700/50 p-4 rounded-xl font-semibold transition-colors">6</button>
            <button onClick={() => handleOperator("-")} className="bg-zinc-800 text-blue-400 hover:bg-zinc-700 p-4 rounded-xl font-bold transition-colors">−</button>

            <button onClick={() => handleNumber("1")} className="bg-zinc-800/50 hover:bg-zinc-700/50 p-4 rounded-xl font-semibold transition-colors">1</button>
            <button onClick={() => handleNumber("2")} className="bg-zinc-800/50 hover:bg-zinc-700/50 p-4 rounded-xl font-semibold transition-colors">2</button>
            <button onClick={() => handleNumber("3")} className="bg-zinc-800/50 hover:bg-zinc-700/50 p-4 rounded-xl font-semibold transition-colors">3</button>
            <button onClick={() => handleOperator("+")} className="bg-zinc-800 text-blue-400 hover:bg-zinc-700 p-4 rounded-xl font-bold transition-colors">+</button>

            <button onClick={() => handleNumber("0")} className="col-span-2 bg-zinc-800/50 hover:bg-zinc-700/50 p-4 rounded-xl font-semibold transition-colors">0</button>
            <button onClick={() => handleNumber(".")} className="bg-zinc-800/50 hover:bg-zinc-700/50 p-4 rounded-xl font-semibold transition-colors">.</button>
            <button onClick={calculate} className="bg-blue-600 text-white hover:bg-blue-500 p-4 rounded-xl font-bold transition-colors shadow-lg shadow-blue-500/20">=</button>
          </div>
        </div>
      </div>
    </div>
  );
}

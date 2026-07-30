"use client";

import { useState, useEffect, useCallback } from "react";
import { evaluateBasicMath } from "@calculator/shared";

export default function BasicCalculator() {
  const [display, setDisplay] = useState<string>("0");
  const [expression, setExpression] = useState<string>("");
  const [history, setHistory] = useState<{expr: string, res: string}[]>([]);

  const handleInput = (val: string) => {
    setDisplay(display === "0" || display === "Error" ? val : display + val);
  };

  const handleFunction = (func: string) => {
    if (display === "Error") setDisplay("0");
    const current = display === "0" ? "" : display;
    setDisplay(current + func + "(");
  };

  const handleOperator = (op: string) => {
    if (display === "Error") return;
    setExpression(expression + display + op);
    setDisplay("0");
  };

  const calculate = () => {
    if (display === "Error" && !expression) return;
    const fullExpression = expression + display;
    const result = evaluateBasicMath(fullExpression);
    
    if (result !== "Error") {
      setHistory(prev => [{expr: fullExpression, res: result}, ...prev].slice(0, 5));
    }
    
    setDisplay(result);
    setExpression("");
  };

  const clear = () => {
    setDisplay("0");
    setExpression("");
  };

  const deleteLast = useCallback(() => {
    if (display === "Error") {
      setDisplay("0");
      return;
    }
    if (display.length > 1) {
      setDisplay(display.slice(0, -1));
    } else {
      setDisplay("0");
    }
  }, [display]);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    const key = e.key;
    if (/[0-9]/.test(key)) {
      handleInput(key);
    } else if (['+', '-', '*', '/'].includes(key)) {
      handleOperator(key);
    } else if (key === '.' || key === '(' || key === ')' || key === '%' || key === '^') {
      handleInput(key);
    } else if (key === 'Enter' || key === '=') {
      e.preventDefault();
      calculate();
    } else if (key === 'Backspace' || key === 'Delete') {
      deleteLast();
    } else if (key === 'Escape') {
      clear();
    }
  }, [display, expression, calculate, handleInput, handleOperator, deleteLast, clear]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  return (
    <div className="min-h-screen bg-[#FFFFFF] text-gray-900 flex items-center justify-center p-4 md:p-8 font-sans">
      <div className="max-w-5xl w-full relative">
        <div className="absolute -inset-1 bg-[#2563EB]/10 rounded-3xl blur-xl opacity-30 animate-pulse"></div>
        <div className="relative bg-[#FFFFFF] backdrop-blur-xl border border-[#E5E7EB] p-8 rounded-3xl shadow-2xl">
          <h1 className="text-3xl font-bold mb-8 bg-gradient-to-r from-[#2563EB] to-blue-400 bg-clip-text text-transparent">
            Scientific Calculator
          </h1>

          <div className="grid md:grid-cols-12 gap-8">
            {/* Display / History Side */}
            <div className="md:col-span-5 flex flex-col justify-between bg-gray-50 rounded-2xl border border-[#E5E7EB] p-6 shadow-inner">
              <div className="flex-1 overflow-hidden flex flex-col justify-end space-y-4 mb-8">
                {history.map((item, idx) => (
                  <div key={idx} className={`text-right ${idx === 0 ? 'opacity-70' : 'opacity-40'}`}>
                    <div className="text-gray-500 text-sm">{item.expr}</div>
                    <div className="text-gray-900 text-lg font-medium">={item.res}</div>
                  </div>
                ))}
              </div>
              
              <div className="text-right">
                <div className="text-gray-500 text-lg h-7 overflow-hidden mb-2 break-all">{expression}</div>
                <div className="text-4xl md:text-5xl font-semibold text-[#2563EB] tracking-wide break-all">{display}</div>
              </div>
            </div>

            {/* Keypad Side */}
            <div className="md:col-span-7">
              <div className="grid grid-cols-5 gap-3 h-full">
                {/* Row 1 */}
                <button onClick={() => handleFunction("sin")} className="bg-[#E5E7EB] text-[#2563EB] hover:bg-gray-300 py-3 rounded-lg font-medium transition-colors">sin</button>
                <button onClick={() => handleFunction("cos")} className="bg-[#E5E7EB] text-[#2563EB] hover:bg-gray-300 py-3 rounded-lg font-medium transition-colors">cos</button>
                <button onClick={() => handleFunction("tan")} className="bg-[#E5E7EB] text-[#2563EB] hover:bg-gray-300 py-3 rounded-lg font-medium transition-colors">tan</button>
                <button onClick={clear} className="bg-red-100 text-red-600 hover:bg-red-200 py-3 rounded-lg font-bold transition-colors">AC</button>
                <button onClick={deleteLast} className="bg-orange-100 text-orange-600 hover:bg-orange-200 py-3 rounded-lg font-bold transition-colors">DEL</button>

                {/* Row 2 */}
                <button onClick={() => handleFunction("log")} className="bg-[#E5E7EB] text-[#2563EB] hover:bg-gray-300 py-3 rounded-lg font-medium transition-colors">log</button>
                <button onClick={() => handleFunction("ln")} className="bg-[#E5E7EB] text-[#2563EB] hover:bg-gray-300 py-3 rounded-lg font-medium transition-colors">ln</button>
                <button onClick={() => handleInput("(")} className="bg-gray-100 text-gray-700 hover:bg-[#E5E7EB] py-3 rounded-lg font-medium transition-colors">(</button>
                <button onClick={() => handleInput(")")} className="bg-gray-100 text-gray-700 hover:bg-[#E5E7EB] py-3 rounded-lg font-medium transition-colors">)</button>
                <button onClick={() => handleOperator("/")} className="bg-[#E5E7EB] text-[#2563EB] hover:bg-gray-300 py-3 rounded-lg font-bold text-xl transition-colors">÷</button>

                {/* Row 3 */}
                <button onClick={() => handleFunction("sqrt")} className="bg-[#E5E7EB] text-[#2563EB] hover:bg-gray-300 py-3 rounded-lg font-medium transition-colors">√</button>
                <button onClick={() => handleInput("7")} className="bg-gray-50 border border-[#E5E7EB] hover:bg-gray-100 py-3 rounded-lg font-medium transition-colors text-lg text-gray-900">7</button>
                <button onClick={() => handleInput("8")} className="bg-gray-50 border border-[#E5E7EB] hover:bg-gray-100 py-3 rounded-lg font-medium transition-colors text-lg text-gray-900">8</button>
                <button onClick={() => handleInput("9")} className="bg-gray-50 border border-[#E5E7EB] hover:bg-gray-100 py-3 rounded-lg font-medium transition-colors text-lg text-gray-900">9</button>
                <button onClick={() => handleOperator("*")} className="bg-[#E5E7EB] text-[#2563EB] hover:bg-gray-300 py-3 rounded-lg font-bold text-xl transition-colors">×</button>

                {/* Row 4 */}
                <button onClick={() => handleInput("^")} className="bg-[#E5E7EB] text-[#2563EB] hover:bg-gray-300 py-3 rounded-lg font-medium transition-colors">x^y</button>
                <button onClick={() => handleInput("4")} className="bg-gray-50 border border-[#E5E7EB] hover:bg-gray-100 py-3 rounded-lg font-medium transition-colors text-lg text-gray-900">4</button>
                <button onClick={() => handleInput("5")} className="bg-gray-50 border border-[#E5E7EB] hover:bg-gray-100 py-3 rounded-lg font-medium transition-colors text-lg text-gray-900">5</button>
                <button onClick={() => handleInput("6")} className="bg-gray-50 border border-[#E5E7EB] hover:bg-gray-100 py-3 rounded-lg font-medium transition-colors text-lg text-gray-900">6</button>
                <button onClick={() => handleOperator("-")} className="bg-[#E5E7EB] text-[#2563EB] hover:bg-gray-300 py-3 rounded-lg font-bold text-xl transition-colors">−</button>

                {/* Row 5 */}
                <button onClick={() => handleInput("pi")} className="bg-[#E5E7EB] text-[#2563EB] hover:bg-gray-300 py-3 rounded-lg font-medium transition-colors">π</button>
                <button onClick={() => handleInput("1")} className="bg-gray-50 border border-[#E5E7EB] hover:bg-gray-100 py-3 rounded-lg font-medium transition-colors text-lg text-gray-900">1</button>
                <button onClick={() => handleInput("2")} className="bg-gray-50 border border-[#E5E7EB] hover:bg-gray-100 py-3 rounded-lg font-medium transition-colors text-lg text-gray-900">2</button>
                <button onClick={() => handleInput("3")} className="bg-gray-50 border border-[#E5E7EB] hover:bg-gray-100 py-3 rounded-lg font-medium transition-colors text-lg text-gray-900">3</button>
                <button onClick={() => handleOperator("+")} className="bg-[#E5E7EB] text-[#2563EB] hover:bg-gray-300 py-3 rounded-lg font-bold text-xl transition-colors">+</button>

                {/* Row 6 */}
                <button onClick={() => handleInput("e")} className="bg-[#E5E7EB] text-[#2563EB] hover:bg-gray-300 py-3 rounded-lg font-medium transition-colors">e</button>
                <button onClick={() => handleInput("%")} className="bg-gray-100 hover:bg-[#E5E7EB] py-3 rounded-lg font-medium transition-colors text-gray-900">%</button>
                <button onClick={() => handleInput("0")} className="bg-gray-50 border border-[#E5E7EB] hover:bg-gray-100 py-3 rounded-lg font-medium transition-colors text-lg text-gray-900">0</button>
                <button onClick={() => handleInput(".")} className="bg-gray-100 hover:bg-[#E5E7EB] py-3 rounded-lg font-medium transition-colors text-xl text-gray-900">.</button>
                <button onClick={calculate} className="bg-[#2563EB] text-white hover:bg-blue-700 py-3 rounded-lg font-bold transition-colors shadow-lg shadow-blue-500/20 text-2xl">=</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

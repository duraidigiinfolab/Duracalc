"use client";

import { useSearchParams } from "next/navigation";
import { calculateEmi } from "@calculator/shared";
import { Suspense, useState, useMemo } from "react";
import Link from "next/link";
import { PieChart, Pie, Cell, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer } from 'recharts';

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

  const [viewMode, setViewMode] = useState<'monthly' | 'yearly'>('yearly');

  const yearlySchedule = useMemo(() => {
    const grouped = schedule.reduce((acc, row) => {
      const year = Math.ceil(row.month / 12);
      if (!acc[year]) {
        acc[year] = { year, emi: 0, principalPaid: 0, interestPaid: 0, remainingBalance: row.remainingBalance };
      }
      acc[year].emi += row.emi;
      acc[year].principalPaid += row.principalPaid;
      acc[year].interestPaid += row.interestPaid;
      acc[year].remainingBalance = row.remainingBalance;
      return acc;
    }, {} as Record<number, any>);
    return Object.values(grouped);
  }, [schedule]);

  const displaySchedule = viewMode === 'monthly' ? schedule : yearlySchedule;

  const pieData = [
    { name: 'Principal Amount', value: p },
    { name: 'Total Interest', value: totalInterest },
  ];
  const PIE_COLORS = ['#34d399', '#f43f5e']; // Emerald and Rose

  const areaData = useMemo(() => {
    if (schedule.length > 60) {
       return yearlySchedule.map(s => ({ time: `Year ${s.year}`, balance: s.remainingBalance }));
    }
    return schedule.map(s => ({ time: `Month ${s.month}`, balance: s.remainingBalance }));
  }, [schedule, yearlySchedule]);

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
    <div className="w-full max-w-5xl mx-auto p-4 md:p-8 pt-16">
      {/* Non-printable action bar */}
      <div className="flex justify-between items-center mb-8 print:hidden">
        <Link href="/emi-calculator" className="text-zinc-400 hover:text-zinc-200 transition-colors flex items-center">
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
          Back
        </Link>
        <div className="flex space-x-4">
          <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-1 flex">
            <button onClick={() => setViewMode('yearly')} className={`px-4 py-1.5 text-sm rounded-md transition-colors ${viewMode === 'yearly' ? 'bg-purple-600 text-white' : 'text-zinc-400 hover:text-zinc-200'}`}>Yearly Summary</button>
            <button onClick={() => setViewMode('monthly')} className={`px-4 py-1.5 text-sm rounded-md transition-colors ${viewMode === 'monthly' ? 'bg-purple-600 text-white' : 'text-zinc-400 hover:text-zinc-200'}`}>Monthly</button>
          </div>
          <button onClick={handleShare} className="flex items-center px-4 py-2 bg-zinc-800 text-white rounded-lg hover:bg-zinc-700 transition-colors">
            Share
          </button>
          <button onClick={handlePrint} className="flex items-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-500 transition-colors">
            Print
          </button>
        </div>
      </div>

      {/* Printable Area */}
      <div className="bg-zinc-900/80 backdrop-blur-xl border border-zinc-800 rounded-2xl shadow-xl overflow-hidden print:bg-white print:border-none print:shadow-none print:text-black">
        {/* Header Summary */}
        <div className="p-6 md:p-8 border-b border-zinc-800/50 print:border-gray-200">
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
              <div className="font-semibold text-lg print:text-black text-zinc-100 text-rose-400 print:text-rose-700">₹{totalInterest.toLocaleString("en-IN", { maximumFractionDigits: 2 })}</div>
            </div>
            <div>
              <div className="text-sm text-zinc-400 print:text-gray-500 mb-1">Total Payment</div>
              <div className="font-semibold text-lg print:text-black text-zinc-100">₹{totalPayment.toLocaleString("en-IN", { maximumFractionDigits: 2 })}</div>
            </div>
          </div>
        </div>

        {/* Charts Section (Hidden in print to save space, or can be included) */}
        <div className="p-6 md:p-8 grid md:grid-cols-3 gap-8 border-b border-zinc-800/50 print:hidden">
          <div className="col-span-1 h-64 flex flex-col items-center">
            <h3 className="text-zinc-400 text-sm mb-2">Principal vs Interest</h3>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={pieData} cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                  ))}
                </Pie>
                <RechartsTooltip formatter={(value: any) => `₹${Number(value).toLocaleString("en-IN")}`} contentStyle={{ backgroundColor: '#18181b', borderColor: '#27272a' }} />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex gap-4 text-xs mt-2">
              <div className="flex items-center"><div className="w-3 h-3 bg-emerald-400 rounded-full mr-1"></div>Principal</div>
              <div className="flex items-center"><div className="w-3 h-3 bg-rose-400 rounded-full mr-1"></div>Interest</div>
            </div>
          </div>
          
          <div className="col-span-2 h-64 flex flex-col items-center">
            <h3 className="text-zinc-400 text-sm mb-2">Balance Over Time</h3>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={areaData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorBalance" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#a855f7" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#a855f7" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
                <XAxis dataKey="time" stroke="#52525b" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#52525b" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(val) => `₹${(val/100000).toFixed(1)}L`} />
                <RechartsTooltip formatter={(value: any) => `₹${Number(value).toLocaleString("en-IN")}`} contentStyle={{ backgroundColor: '#18181b', borderColor: '#27272a' }} />
                <Area type="monotone" dataKey="balance" stroke="#a855f7" strokeWidth={2} fillOpacity={1} fill="url(#colorBalance)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Schedule Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-zinc-950/80 print:bg-gray-100">
                <th className="p-4 font-medium text-zinc-400 print:text-gray-700 border-b border-zinc-800 print:border-gray-300">{viewMode === 'monthly' ? 'Month' : 'Year'}</th>
                <th className="p-4 font-medium text-zinc-400 print:text-gray-700 border-b border-zinc-800 print:border-gray-300 text-right">EMI Total</th>
                <th className="p-4 font-medium text-zinc-400 print:text-gray-700 border-b border-zinc-800 print:border-gray-300 text-right">Principal Paid</th>
                <th className="p-4 font-medium text-zinc-400 print:text-gray-700 border-b border-zinc-800 print:border-gray-300 text-right">Interest Paid</th>
                <th className="p-4 font-medium text-zinc-400 print:text-gray-700 border-b border-zinc-800 print:border-gray-300 text-right">Balance</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/50 print:divide-gray-200">
              {displaySchedule.map((row) => (
                <tr key={viewMode === 'monthly' ? row.month : row.year} className="hover:bg-zinc-800/40 print:hover:bg-transparent transition-colors">
                  <td className="p-4 print:text-black text-zinc-300">{viewMode === 'monthly' ? row.month : row.year}</td>
                  <td className="p-4 print:text-black text-zinc-300 text-right font-medium">₹{row.emi.toLocaleString("en-IN", { maximumFractionDigits: 2 })}</td>
                  <td className="p-4 print:text-black text-zinc-300 text-right text-emerald-400/90 print:text-emerald-700">₹{row.principalPaid.toLocaleString("en-IN", { maximumFractionDigits: 2 })}</td>
                  <td className="p-4 print:text-black text-zinc-300 text-right text-rose-400/90 print:text-rose-700">₹{row.interestPaid.toLocaleString("en-IN", { maximumFractionDigits: 2 })}</td>
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

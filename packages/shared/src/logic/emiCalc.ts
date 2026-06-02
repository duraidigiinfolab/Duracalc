export interface EmiInput {
  principal: number;
  annualInterestRate: number;
  tenure: number;
  isTenureInYears: boolean;
}

export interface RepaymentScheduleRow {
  month: number;
  emi: number;
  principalPaid: number;
  interestPaid: number;
  remainingBalance: number;
}

export interface EmiOutput {
  monthlyEmi: number;
  totalInterest: number;
  totalPayment: number;
  schedule: RepaymentScheduleRow[];
}

export function calculateEmi({
  principal,
  annualInterestRate,
  tenure,
  isTenureInYears
}: EmiInput): EmiOutput {
  if (principal <= 0 || annualInterestRate < 0 || tenure <= 0) {
    return { monthlyEmi: 0, totalInterest: 0, totalPayment: 0, schedule: [] };
  }

  const monthlyInterestRate = (annualInterestRate / 12) / 100;
  const totalMonths = isTenureInYears ? tenure * 12 : tenure;

  let monthlyEmi = 0;
  if (monthlyInterestRate === 0) {
    monthlyEmi = principal / totalMonths;
  } else {
    monthlyEmi =
      (principal * monthlyInterestRate * Math.pow(1 + monthlyInterestRate, totalMonths)) /
      (Math.pow(1 + monthlyInterestRate, totalMonths) - 1);
  }

  const totalPayment = monthlyEmi * totalMonths;
  const totalInterest = totalPayment - principal;

  let balance = principal;
  const schedule: RepaymentScheduleRow[] = [];

  for (let month = 1; month <= totalMonths; month++) {
    const interestForMonth = balance * monthlyInterestRate;
    let principalForMonth = monthlyEmi - interestForMonth;

    // Handle last month precision
    if (month === totalMonths) {
      principalForMonth = balance;
      monthlyEmi = principalForMonth + interestForMonth;
    }

    balance -= principalForMonth;

    schedule.push({
      month,
      emi: Math.round(monthlyEmi * 100) / 100,
      principalPaid: Math.round(principalForMonth * 100) / 100,
      interestPaid: Math.round(interestForMonth * 100) / 100,
      remainingBalance: Math.max(0, Math.round(balance * 100) / 100),
    });
  }

  return {
    monthlyEmi: Math.round(monthlyEmi * 100) / 100,
    totalInterest: Math.round(totalInterest * 100) / 100,
    totalPayment: Math.round(totalPayment * 100) / 100,
    schedule,
  };
}

export interface EmiInput {
  principal: number;
  annualInterestRate: number;
  tenure: number;
  isTenureInYears: boolean;
}

export interface EmiOutput {
  monthlyEmi: number;
  totalInterest: number;
  totalPayment: number;
}

export function calculateEmi({
  principal,
  annualInterestRate,
  tenure,
  isTenureInYears
}: EmiInput): EmiOutput {
  if (principal <= 0 || annualInterestRate < 0 || tenure <= 0) {
    return { monthlyEmi: 0, totalInterest: 0, totalPayment: 0 };
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

  return {
    monthlyEmi: Math.round(monthlyEmi * 100) / 100,
    totalInterest: Math.round(totalInterest * 100) / 100,
    totalPayment: Math.round(totalPayment * 100) / 100,
  };
}

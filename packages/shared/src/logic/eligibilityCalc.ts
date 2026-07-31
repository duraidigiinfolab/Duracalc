export interface EligibilityInput {
  monthlyIncome: number;
  foir: number;
  existingEmis: number;
  annualInterestRate: number;
  tenure: number;
  isTenureInYears: boolean;
}

export interface EligibilityOutput {
  eligibleEmi: number;
  eligibleLoanAmount: number;
  maxAllowableEmi: number;
}

export function calculateEligibility({
  monthlyIncome,
  foir,
  existingEmis,
  annualInterestRate,
  tenure,
  isTenureInYears
}: EligibilityInput): EligibilityOutput {
  if (monthlyIncome <= 0 || foir <= 0 || annualInterestRate < 0 || tenure <= 0) {
    return { eligibleEmi: 0, eligibleLoanAmount: 0, maxAllowableEmi: 0 };
  }

  const maxAllowableEmi = monthlyIncome * (foir / 100);
  const eligibleEmi = Math.max(0, maxAllowableEmi - existingEmis);

  if (eligibleEmi === 0) {
    return { 
      eligibleEmi: 0, 
      eligibleLoanAmount: 0, 
      maxAllowableEmi: Math.round(maxAllowableEmi * 100) / 100 
    };
  }

  const monthlyInterestRate = (annualInterestRate / 12) / 100;
  const totalMonths = isTenureInYears ? tenure * 12 : tenure;
  let eligibleLoanAmount = 0;

  if (monthlyInterestRate === 0) {
    eligibleLoanAmount = eligibleEmi * totalMonths;
  } else {
    // P = (E * ((1 + r)^n - 1)) / (r * (1 + r)^n)
    const factor = Math.pow(1 + monthlyInterestRate, totalMonths);
    eligibleLoanAmount = (eligibleEmi * (factor - 1)) / (monthlyInterestRate * factor);
  }

  return {
    eligibleEmi: Math.round(eligibleEmi * 100) / 100,
    eligibleLoanAmount: Math.round(eligibleLoanAmount * 100) / 100,
    maxAllowableEmi: Math.round(maxAllowableEmi * 100) / 100
  };
}

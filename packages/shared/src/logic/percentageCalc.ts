export function calculatePercentage(percentage: number, value: number): number {
  return (percentage / 100) * value;
}

export function calculatePercentageOf(part: number, total: number): number {
  if (total === 0) return 0;
  return (part / total) * 100;
}

export function calculatePercentageChange(oldValue: number, newValue: number): number {
  if (oldValue === 0) return 0;
  return ((newValue - oldValue) / Math.abs(oldValue)) * 100;
}

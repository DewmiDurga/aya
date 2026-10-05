export function daysBetween(date1: string, date2: string): number {
  const d1 = new Date(date1).getTime();
  const d2 = new Date(date2).getTime();
  const diffMs = Math.abs(d2 - d1);
  return Math.round(diffMs / (1000 * 60 * 60 * 24));
}

export function addDays(dateStr: string, days: number): string {
  const d = new Date(dateStr);
  d.setDate(d.getDate() + days);
  return d.toISOString().split("T")[0];
}

export function mean(numbers: number[]): number {
  if (numbers.length === 0) return 0;
  return numbers.reduce((sum, val) => sum + val, 0) / numbers.length;
}

export function stdDev(numbers: number[]): number {
  if (numbers.length <= 1) return 0;
  const avg = mean(numbers);
  const variance =
    numbers.reduce((acc, val) => acc + Math.pow(val - avg, 2), 0) /
    (numbers.length - 1);
  return Math.sqrt(variance);
}

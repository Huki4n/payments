export function parseGoalAmount(raw: string): number | null {
  const value = Number.parseFloat(raw.replace(",", "."));
  if (!Number.isFinite(value) || value <= 0) return null;
  return value;
}

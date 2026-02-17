export type Subject = {
  id: string;
  grade: number;
  units: number;
};

export type AcademicDistinction = "PRESIDENT'S LISTER" | "DEAN'S LISTER" | null;

export function calculateGWA(subjects: Subject[]): number {
  const totalUnits = subjects.reduce((sum, s) => sum + s.units, 0);
  const weightedSum = subjects.reduce((sum, s) => sum + s.grade * s.units, 0);
  if (totalUnits === 0) return 0;
  return parseFloat((weightedSum / totalUnits).toFixed(4));
}

export function getDistinction(gwa: number): AcademicDistinction {
  if (gwa >= 1.0 && gwa <= 1.5) return "PRESIDENT'S LISTER";
  if (gwa > 1.5 && gwa <= 1.75) return "DEAN'S LISTER";
  return null;
}

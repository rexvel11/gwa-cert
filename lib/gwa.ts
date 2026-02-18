export type Subject = {
  id: string;
  grade: number;
  units: number;
};

export type AcademicDistinction = "PRESIDENT'S LISTER" | "DEAN'S LISTER" | null;

export type Program = {
  code: string;
  name: string;
  department: string;
  isHeader?: boolean; // true for department headers
};

// All available programs
export const PROGRAMS: Program[] = [
  // ICT Department
  {
    code: "ICT_HEADER",
    name: "ICT DEPARTMENT",
    department: "ICT",
    isHeader: true,
  },
  {
    code: "BSIT",
    name: "Bachelor of Science in Information Technology",
    department: "ICT",
  },
  {
    code: "BSIS",
    name: "Bachelor of Science in Information System",
    department: "ICT",
  },
  {
    code: "BSCS",
    name: "Bachelor of Science in Computer Science",
    department: "ICT",
  },
  {
    code: "BTVTED",
    name: "Bachelor in Technical-Vocational Teacher Education",
    department: "ICT",
  },

  // BME Department
  {
    code: "BME_HEADER",
    name: "BME DEPARTMENT",
    department: "BME",
    isHeader: true,
  },
  {
    code: "BSA",
    name: "Bachelor of Science in Accountancy",
    department: "BME",
  },
  {
    code: "BSAIS",
    name: "Bachelor of Science in Accounting Information System",
    department: "BME",
  },
  { code: "BPA", name: "Bachelor of Public Administration", department: "BME" },
];

export function calculateGWA(subjects: Subject[]): number {
  const totalUnits = subjects.reduce((sum, s) => sum + s.units, 0);
  const weightedSum = subjects.reduce((sum, s) => sum + s.grade * s.units, 0);
  if (totalUnits === 0) return 0;
  return parseFloat((weightedSum / totalUnits).toFixed(2)); // Changed to 2 decimals
}

export function getDistinction(gwa: number): AcademicDistinction {
  if (gwa >= 1.0 && gwa <= 1.5) return "PRESIDENT'S LISTER";
  if (gwa > 1.5 && gwa <= 1.75) return "DEAN'S LISTER";
  return null;
}

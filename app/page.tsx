"use client";
import { useState } from "react";
import { Plus, Calculator, BookOpen, ChevronDown } from "lucide-react";
import { v4 as uuidv4 } from "uuid";
import Header from "@/components/Header";
import SubjectRow from "@/components/SubjectRow";
import ResultModal from "@/components/ResultModal";
import { Subject, calculateGWA, getDistinction } from "@/lib/gwa";

const SEMESTERS = ["1st Semester", "2nd Semester"];
const SCHOOL_YEARS = [
  "2021–2022",
  "2022–2023",
  "2023–2024",
  "2024–2025",
  "2025–2026",
];

const labelStyle: React.CSSProperties = {
  display: "block",
  fontSize: "11px",
  fontWeight: 700,
  letterSpacing: "0.14em",
  textTransform: "uppercase" as const,
  color: "rgba(255,255,255,0.32)",
  marginBottom: "8px",
};

const sectionTag: React.CSSProperties = {
  fontSize: "10px",
  fontWeight: 700,
  letterSpacing: "0.20em",
  textTransform: "uppercase" as const,
  color: "rgba(212,175,55,0.62)",
  marginBottom: "16px",
};

export default function Home() {
  const [subjects, setSubjects] = useState<Subject[]>([
    { id: uuidv4(), grade: 0, units: 0 },
    { id: uuidv4(), grade: 0, units: 0 },
    { id: uuidv4(), grade: 0, units: 0 },
  ]);
  const [semester, setSemester] = useState(SEMESTERS[0]);
  const [schoolYear, setSchoolYear] = useState(SCHOOL_YEARS[3]);
  const [modalOpen, setModalOpen] = useState(false);
  const [gwa, setGwa] = useState(0);

  const addSubject = () =>
    setSubjects((p) => [...p, { id: uuidv4(), grade: 0, units: 0 }]);
  const removeSubject = (id: string) =>
    setSubjects((p) => p.filter((s) => s.id !== id));
  const updateSubject = (id: string, field: keyof Subject, value: number) =>
    setSubjects((p) =>
      p.map((s) => (s.id === id ? { ...s, [field]: value } : s)),
    );

  const handleCalculate = () => {
    const valid = subjects.filter((s) => s.grade > 0 && s.units > 0);
    if (!valid.length) {
      alert("Please enter at least one subject with a grade and units.");
      return;
    }
    setGwa(calculateGWA(valid));
    setModalOpen(true);
  };

  return (
    <main style={{ minHeight: "100vh", padding: "40px 16px 24px" }}>
      <div style={{ maxWidth: "560px", margin: "0 auto" }}>
        <Header />

        {/* ── Academic Period ── */}
        <div
          className="glass-card anim-fade-up d-1"
          style={{ padding: "26px", marginBottom: "14px" }}
        >
          <p style={sectionTag}>Academic Period</p>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "14px",
            }}
          >
            <div>
              <label style={labelStyle}>Semester</label>
              <div style={{ position: "relative" }}>
                <select
                  value={semester}
                  onChange={(e) => setSemester(e.target.value)}
                  className="glass-select"
                >
                  {SEMESTERS.map((s) => (
                    <option key={s}>{s}</option>
                  ))}
                </select>
                <ChevronDown
                  size={13}
                  color="rgba(212,175,55,0.55)"
                  strokeWidth={2.5}
                  style={{
                    position: "absolute",
                    right: "14px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    pointerEvents: "none",
                  }}
                />
              </div>
            </div>

            <div>
              <label style={labelStyle}>School Year</label>
              <div style={{ position: "relative" }}>
                <select
                  value={schoolYear}
                  onChange={(e) => setSchoolYear(e.target.value)}
                  className="glass-select"
                >
                  {SCHOOL_YEARS.map((y) => (
                    <option key={y}>{y}</option>
                  ))}
                </select>
                <ChevronDown
                  size={13}
                  color="rgba(212,175,55,0.55)"
                  strokeWidth={2.5}
                  style={{
                    position: "absolute",
                    right: "14px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    pointerEvents: "none",
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* ── Subjects ── */}
        <div
          className="glass-card anim-fade-up d-2"
          style={{ padding: "26px", marginBottom: "14px" }}
        >
          {/* Header row */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: "18px",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <div
                style={{
                  width: "32px",
                  height: "32px",
                  borderRadius: "10px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: "rgba(212,175,55,0.13)",
                  border: "1px solid rgba(212,175,55,0.24)",
                }}
              >
                <BookOpen size={15} color="#D4AF37" strokeWidth={2} />
              </div>
              <span
                style={{
                  fontSize: "15px",
                  fontWeight: 700,
                  color: "rgba(255,255,255,0.90)",
                }}
              >
                Subjects
              </span>
            </div>
            <span
              style={{
                fontSize: "11px",
                fontWeight: 600,
                padding: "5px 13px",
                borderRadius: "99px",
                background: "rgba(255,255,255,0.07)",
                border: "1px solid rgba(255,255,255,0.11)",
                color: "rgba(255,255,255,0.38)",
              }}
            >
              {subjects.length} added
            </span>
          </div>

          {/* Column labels */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "30px 1fr 90px 36px",
              gap: "10px",
              marginBottom: "10px",
            }}
          >
            <span />
            <span
              style={{
                fontSize: "10px",
                fontWeight: 700,
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.24)",
              }}
            >
              Grade
            </span>
            <span
              style={{
                fontSize: "10px",
                fontWeight: 700,
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.24)",
              }}
            >
              Units
            </span>
            <span />
          </div>

          {/* Rows */}
          <div
            style={{ display: "flex", flexDirection: "column", gap: "10px" }}
          >
            {subjects.map((s, i) => (
              <SubjectRow
                key={s.id}
                subject={s}
                index={i}
                onChange={updateSubject}
                onRemove={removeSubject}
              />
            ))}
          </div>

          {/* Add subject */}
          <button
            onClick={addSubject}
            style={{
              marginTop: "14px",
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
              padding: "12px",
              borderRadius: "16px",
              fontSize: "13px",
              fontWeight: 600,
              color: "rgba(255,255,255,0.32)",
              background: "transparent",
              border: "1.5px dashed rgba(255,255,255,0.16)",
              cursor: "pointer",
              transition: "all 0.20s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "rgba(212,175,55,0.42)";
              e.currentTarget.style.color = "rgba(212,175,55,0.80)";
              e.currentTarget.style.background = "rgba(212,175,55,0.05)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.16)";
              e.currentTarget.style.color = "rgba(255,255,255,0.32)";
              e.currentTarget.style.background = "transparent";
            }}
          >
            <Plus size={14} strokeWidth={2.5} />
            Add Subject
          </button>
        </div>

        {/* ── Calculate Button ── */}
        <button
          onClick={handleCalculate}
          className="btn-maroon anim-fade-up d-3"
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "10px",
            padding: "17px",
            fontSize: "14px",
            letterSpacing: "0.07em",
            marginBottom: "14px",
          }}
        >
          <Calculator size={17} strokeWidth={2.5} />
          Calculate GWA
        </button>

        <p
          className="anim-fade-up d-4"
          style={{
            textAlign: "center",
            fontSize: "11px",
            color: "rgba(255,255,255,0.20)",
            letterSpacing: "0.06em",
          }}
        >
          Grade scale: 1.0 (Highest) — 5.0 (Lowest)
        </p>
      </div>

      <ResultModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        gwa={gwa}
        distinction={getDistinction(gwa)}
        semester={semester}
        schoolYear={schoolYear}
      />
    </main>
  );
}

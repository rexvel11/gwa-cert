"use client";
import {
  useState,
  useRef,
  useEffect,
  useLayoutEffect,
  useCallback,
} from "react";
import { createPortal } from "react-dom";
import { Plus, Calculator, BookOpen, ChevronDown, Check } from "lucide-react";
import { v4 as uuidv4 } from "uuid";
import Header from "@/components/Header";
import SubjectRow from "@/components/SubjectRow";
import ResultModal from "@/components/ResultModal";
import {
  Subject,
  calculateGWA,
  getDistinction,
  Program,
  PROGRAMS,
} from "@/lib/gwa";

const SEMESTERS = ["1st Sem", "2nd Sem"];
const SCHOOL_YEARS = [
  "2021–2022",
  "2022–2023",
  "2023–2024",
  "2024–2025",
  "2025–2026",
];

const freshSubjects = () => [
  { id: uuidv4(), grade: 0, units: 0 },
  { id: uuidv4(), grade: 0, units: 0 },
  { id: uuidv4(), grade: 0, units: 0 },
];

// ─── Portal dropdown — renders into document.body to escape backdrop-filter ──
function GlassSelect({
  value,
  options,
  onChange,
}: {
  value: string;
  options: string[];
  onChange: (v: string) => void;
  label: string;
}) {
  const [open, setOpen] = useState(false);
  const [rect, setRect] = useState<DOMRect | null>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const calcRect = useCallback(() => {
    if (triggerRef.current) setRect(triggerRef.current.getBoundingClientRect());
  }, []);

  useLayoutEffect(() => {
    if (open) calcRect();
  }, [open, calcRect]);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (
        triggerRef.current?.contains(e.target as Node) ||
        dropdownRef.current?.contains(e.target as Node)
      )
        return;
      setOpen(false);
    };
    const onScroll = () => {
      calcRect();
    };
    document.addEventListener("mousedown", onDown);
    window.addEventListener("scroll", onScroll, true);
    window.addEventListener("resize", calcRect);
    return () => {
      document.removeEventListener("mousedown", onDown);
      window.removeEventListener("scroll", onScroll, true);
      window.removeEventListener("resize", calcRect);
    };
  }, [open, calcRect]);

  const portalContent = open && rect && (
    <div
      ref={dropdownRef}
      style={{
        position: "fixed",
        top: rect.bottom + 6,
        left: rect.left,
        width: rect.width,
        zIndex: 99999,
        borderRadius: "16px",
        overflow: "hidden",
        background:
          "linear-gradient(160deg, rgba(28,14,15,0.98) 0%, rgba(18,8,9,0.99) 100%)",
        backdropFilter: "blur(32px) saturate(180%)",
        WebkitBackdropFilter: "blur(32px) saturate(180%)",
        border: "1px solid rgba(255,255,255,0.13)",
        borderTopColor: "rgba(255,255,255,0.22)",
        boxShadow:
          "0 16px 48px rgba(0,0,0,0.65), inset 0 1px 0 rgba(255,255,255,0.09)",
      }}
    >
      {options.map((opt) => {
        const selected = opt === value;
        return (
          <button
            key={opt}
            onMouseDown={(e) => {
              e.preventDefault();
              onChange(opt);
              setOpen(false);
            }}
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "11px 16px",
              fontSize: "13px",
              fontWeight: selected ? 700 : 500,
              fontFamily: "inherit",
              color: selected ? "#D4AF37" : "rgba(255,255,255,0.75)",
              background: selected ? "rgba(212,175,55,0.10)" : "transparent",
              border: "none",
              borderBottom: "1px solid rgba(255,255,255,0.06)",
              cursor: "pointer",
              textAlign: "left",
              transition: "all 0.15s ease",
            }}
            onMouseEnter={(e) => {
              if (!selected) {
                e.currentTarget.style.background = "rgba(255,255,255,0.06)";
                e.currentTarget.style.color = "#fff";
              }
            }}
            onMouseLeave={(e) => {
              if (!selected) {
                e.currentTarget.style.background = "transparent";
                e.currentTarget.style.color = "rgba(255,255,255,0.75)";
              }
            }}
          >
            {opt}
            {selected && <Check size={13} color="#D4AF37" strokeWidth={2.5} />}
          </button>
        );
      })}
    </div>
  );

  return (
    <div style={{ position: "relative" }}>
      <button
        ref={triggerRef}
        onClick={() => {
          calcRect();
          setOpen((o) => !o);
        }}
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "12px 16px",
          borderRadius: "16px",
          fontSize: "13px",
          fontWeight: 500,
          fontFamily: "inherit",
          color: "#fff",
          textAlign: "left",
          cursor: "pointer",
          transition: "all 0.20s ease",
          background: open
            ? "linear-gradient(135deg, rgba(255,255,255,0.13) 0%, rgba(255,255,255,0.08) 100%)"
            : "linear-gradient(135deg, rgba(255,255,255,0.09) 0%, rgba(255,255,255,0.05) 100%)",
          border: open
            ? "1px solid rgba(212,175,55,0.60)"
            : "1px solid rgba(255,255,255,0.14)",
          borderTopColor: open
            ? "rgba(212,175,55,0.80)"
            : "rgba(255,255,255,0.22)",
          boxShadow: open
            ? "0 0 0 3px rgba(212,175,55,0.12), 0 1px 0 rgba(255,255,255,0.08) inset"
            : "0 1px 0 rgba(255,255,255,0.06) inset, 0 2px 8px rgba(0,0,0,0.20)",
        }}
      >
        <span>{value}</span>
        <ChevronDown
          size={14}
          color="rgba(212,175,55,0.65)"
          strokeWidth={2.5}
          style={{
            transition: "transform 0.20s ease",
            transform: open ? "rotate(180deg)" : "rotate(0deg)",
            flexShrink: 0,
          }}
        />
      </button>

      {typeof window !== "undefined" &&
        createPortal(portalContent, document.body)}
    </div>
  );
}

// ─── Program dropdown with disabled department headers ────────────────────
function ProgramSelect({
  value,
  onChange,
}: {
  value: Program | null;
  onChange: (p: Program) => void;
}) {
  const [open, setOpen] = useState(false);
  const [rect, setRect] = useState<DOMRect | null>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const calcRect = useCallback(() => {
    if (triggerRef.current) setRect(triggerRef.current.getBoundingClientRect());
  }, []);

  useLayoutEffect(() => {
    if (open) calcRect();
  }, [open, calcRect]);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (
        triggerRef.current?.contains(e.target as Node) ||
        dropdownRef.current?.contains(e.target as Node)
      )
        return;
      setOpen(false);
    };
    const onScroll = () => calcRect();
    document.addEventListener("mousedown", onDown);
    window.addEventListener("scroll", onScroll, true);
    window.addEventListener("resize", calcRect);
    return () => {
      document.removeEventListener("mousedown", onDown);
      window.removeEventListener("scroll", onScroll, true);
      window.removeEventListener("resize", calcRect);
    };
  }, [open, calcRect]);

  const displayText = value
    ? `${value.code} - ${value.name}`
    : "Select your program";

  const portalContent = open && rect && (
    <div
      ref={dropdownRef}
      style={{
        position: "fixed",
        top: rect.bottom + 6,
        left: rect.left,
        width: rect.width,
        zIndex: 99999,
        borderRadius: "16px",
        overflow: "hidden",
        maxHeight: "320px",
        overflowY: "auto",
        background:
          "linear-gradient(160deg, rgba(28,14,15,0.98) 0%, rgba(18,8,9,0.99) 100%)",
        backdropFilter: "blur(32px) saturate(180%)",
        WebkitBackdropFilter: "blur(32px) saturate(180%)",
        border: "1px solid rgba(255,255,255,0.13)",
        borderTopColor: "rgba(255,255,255,0.22)",
        boxShadow:
          "0 16px 48px rgba(0,0,0,0.65), inset 0 1px 0 rgba(255,255,255,0.09)",
      }}
    >
      {PROGRAMS.map((prog) => {
        const selected = value?.code === prog.code;
        const isHeader = prog.isHeader;

        return (
          <button
            key={prog.code}
            disabled={isHeader}
            onMouseDown={(e) => {
              if (isHeader) return;
              e.preventDefault();
              onChange(prog);
              setOpen(false);
            }}
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: isHeader ? "9px 16px" : "11px 16px 11px 28px",
              fontSize: isHeader ? "10px" : "12px",
              fontWeight: isHeader ? 800 : selected ? 700 : 500,
              fontFamily: "inherit",
              color: isHeader
                ? "rgba(212,175,55,0.70)"
                : selected
                  ? "#D4AF37"
                  : "rgba(255,255,255,0.75)",
              background: isHeader
                ? "rgba(212,175,55,0.08)"
                : selected
                  ? "rgba(212,175,55,0.10)"
                  : "transparent",
              border: "none",
              borderBottom: "1px solid rgba(255,255,255,0.06)",
              cursor: isHeader ? "default" : "pointer",
              textAlign: "left",
              transition: "all 0.15s ease",
              letterSpacing: isHeader ? "0.18em" : "normal",
              textTransform: isHeader
                ? ("uppercase" as const)
                : ("none" as const),
              opacity: isHeader ? 1 : undefined,
            }}
            onMouseEnter={(e) => {
              if (!selected && !isHeader) {
                e.currentTarget.style.background = "rgba(255,255,255,0.06)";
                e.currentTarget.style.color = "#fff";
              }
            }}
            onMouseLeave={(e) => {
              if (!selected && !isHeader) {
                e.currentTarget.style.background = "transparent";
                e.currentTarget.style.color = "rgba(255,255,255,0.75)";
              }
            }}
          >
            <span
              style={{
                flex: 1,
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {isHeader ? prog.name : `${prog.code} - ${prog.name}`}
            </span>
            {selected && !isHeader && (
              <Check size={13} color="#D4AF37" strokeWidth={2.5} />
            )}
          </button>
        );
      })}
    </div>
  );

  return (
    <div style={{ position: "relative" }}>
      <button
        ref={triggerRef}
        onClick={() => {
          calcRect();
          setOpen((o) => !o);
        }}
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "12px 16px",
          borderRadius: "16px",
          fontSize: "13px",
          fontWeight: 500,
          fontFamily: "inherit",
          color: value ? "#fff" : "rgba(255,255,255,0.40)",
          textAlign: "left",
          cursor: "pointer",
          transition: "all 0.20s ease",
          background: open
            ? "linear-gradient(135deg, rgba(255,255,255,0.13) 0%, rgba(255,255,255,0.08) 100%)"
            : "linear-gradient(135deg, rgba(255,255,255,0.09) 0%, rgba(255,255,255,0.05) 100%)",
          border: open
            ? "1px solid rgba(212,175,55,0.60)"
            : "1px solid rgba(255,255,255,0.14)",
          borderTopColor: open
            ? "rgba(212,175,55,0.80)"
            : "rgba(255,255,255,0.22)",
          boxShadow: open
            ? "0 0 0 3px rgba(212,175,55,0.12), 0 1px 0 rgba(255,255,255,0.08) inset"
            : "0 1px 0 rgba(255,255,255,0.06) inset, 0 2px 8px rgba(0,0,0,0.20)",
        }}
      >
        <span
          style={{
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {displayText}
        </span>
        <ChevronDown
          size={14}
          color="rgba(212,175,55,0.65)"
          strokeWidth={2.5}
          style={{
            transition: "transform 0.20s ease",
            transform: open ? "rotate(180deg)" : "rotate(0deg)",
            flexShrink: 0,
          }}
        />
      </button>

      {typeof window !== "undefined" &&
        createPortal(portalContent, document.body)}
    </div>
  );
}
// ─────────────────────────────────────────────────────────────────────────────

const labelStyle: React.CSSProperties = {
  display: "block",
  fontSize: "11px",
  fontWeight: 700,
  letterSpacing: "0.14em",
  textTransform: "uppercase" as const,
  color: "rgba(255,255,255,0.32)",
  marginBottom: "8px",
};

export default function Home() {
  const [subjects, setSubjects] = useState<Subject[]>(freshSubjects());
  const [semester, setSemester] = useState(SEMESTERS[0]);
  const [schoolYear, setSchoolYear] = useState(SCHOOL_YEARS[3]);
  const [program, setProgram] = useState<Program | null>(null);
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
    if (!program) {
      alert("Please select your program.");
      return;
    }
    setGwa(calculateGWA(valid));
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
    setTimeout(() => {
      setSubjects(freshSubjects());
      setProgram(null); // ← Reset program dropdown to default
      setGwa(0);
    }, 300);
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
          <p
            style={{
              fontSize: "10px",
              fontWeight: 700,
              letterSpacing: "0.20em",
              textTransform: "uppercase" as const,
              color: "rgba(212,175,55,0.62)",
              marginBottom: "16px",
            }}
          >
            Academic Period
          </p>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "14px",
              marginBottom: "14px",
            }}
          >
            <div>
              <label style={labelStyle}>Semester</label>
              <GlassSelect
                value={semester}
                options={SEMESTERS}
                onChange={setSemester}
                label="Semester"
              />
            </div>
            <div>
              <label style={labelStyle}>School Year</label>
              <GlassSelect
                value={schoolYear}
                options={SCHOOL_YEARS}
                onChange={setSchoolYear}
                label="School Year"
              />
            </div>
          </div>

          {/* Program dropdown — full width */}
          <div>
            <label style={labelStyle}>Program</label>
            <ProgramSelect value={program} onChange={setProgram} />
          </div>
        </div>

        {/* ── Subjects ── */}
        <div
          className="glass-card anim-fade-up d-2"
          style={{ padding: "26px", marginBottom: "14px" }}
        >
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
                textTransform: "uppercase" as const,
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
                textTransform: "uppercase" as const,
                color: "rgba(255,255,255,0.24)",
              }}
            >
              Units
            </span>
            <span />
          </div>

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

        {/* ── Calculate ── */}
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
        onClose={handleModalClose}
        gwa={gwa}
        distinction={getDistinction(gwa)}
        semester={semester}
        schoolYear={schoolYear}
        program={program}
      />
    </main>
  );
}

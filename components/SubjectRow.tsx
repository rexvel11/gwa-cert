"use client";
import { Trash2 } from "lucide-react";
import { Subject } from "@/lib/gwa";

type Props = {
  subject: Subject;
  index: number;
  onChange: (id: string, field: keyof Subject, value: number) => void;
  onRemove: (id: string) => void;
};

export default function SubjectRow({
  subject,
  index,
  onChange,
  onRemove,
}: Props) {
  return (
    <div
      className="anim-fade-up"
      style={{
        display: "flex",
        alignItems: "center",
        gap: "10px",
        animationDelay: `${index * 0.05}s`,
      }}
    >
      {/* Row number badge */}
      <div
        style={{
          width: "30px",
          height: "30px",
          borderRadius: "9px",
          flexShrink: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "11px",
          fontWeight: 800,
          background: "rgba(212,175,55,0.10)",
          border: "1px solid rgba(212,175,55,0.20)",
          color: "rgba(212,175,55,0.60)",
        }}
      >
        {index + 1}
      </div>

      {/* Grade */}
      <input
        type="number"
        step="0.01"
        min="1"
        max="5"
        placeholder="Grade (1.0 – 5.0)"
        value={subject.grade || ""}
        onChange={(e) =>
          onChange(subject.id, "grade", parseFloat(e.target.value))
        }
        className="glass-input"
        style={{ flex: 1 }}
      />

      {/* Units */}
      <input
        type="number"
        min="1"
        placeholder="Units"
        value={subject.units || ""}
        onChange={(e) =>
          onChange(subject.id, "units", parseInt(e.target.value))
        }
        className="glass-input"
        style={{ width: "90px", flex: "none" }}
      />

      {/* Delete */}
      <button
        onClick={() => onRemove(subject.id)}
        style={{
          width: "36px",
          height: "36px",
          borderRadius: "11px",
          flexShrink: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "rgba(255,60,60,0.08)",
          border: "1px solid rgba(255,60,60,0.15)",
          color: "rgba(255,100,100,0.40)",
          cursor: "pointer",
          transition: "all 0.18s ease",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = "rgba(255,60,60,0.20)";
          e.currentTarget.style.borderColor = "rgba(255,60,60,0.38)";
          e.currentTarget.style.color = "rgba(255,110,110,0.95)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = "rgba(255,60,60,0.08)";
          e.currentTarget.style.borderColor = "rgba(255,60,60,0.15)";
          e.currentTarget.style.color = "rgba(255,100,100,0.40)";
        }}
      >
        <Trash2 size={14} strokeWidth={2} />
      </button>
    </div>
  );
}

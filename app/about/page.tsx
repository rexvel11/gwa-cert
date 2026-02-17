import { Info, ShieldAlert, Code2, Calculator, BookOpen } from "lucide-react";

const cardStyle: React.CSSProperties = {
  background:
    "linear-gradient(145deg, rgba(255,255,255,0.09) 0%, rgba(255,255,255,0.04) 55%, rgba(255,255,255,0.07) 100%)",
  backdropFilter: "blur(24px) saturate(160%)",
  WebkitBackdropFilter: "blur(24px) saturate(160%)",
  border: "1px solid rgba(255,255,255,0.12)",
  borderTopColor: "rgba(255,255,255,0.20)",
  borderRadius: "24px",
  boxShadow:
    "0 8px 32px rgba(0,0,0,0.32), inset 0 1px 0 rgba(255,255,255,0.08)",
  padding: "24px",
  marginBottom: "14px",
};

const iconBox = (
  color: string,
  bg: string,
  borderColor: string,
): React.CSSProperties => ({
  width: "32px",
  height: "32px",
  borderRadius: "10px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexShrink: 0,
  background: bg,
  border: `1px solid ${borderColor}`,
});

const features = [
  {
    Icon: Calculator,
    label: "Accurate GWA Computation",
    desc: "Weighted average using the Philippine grading scale (1.0–5.0).",
  },
  {
    Icon: BookOpen,
    label: "Dynamic Subject Management",
    desc: "Add or remove subjects freely, all computed in real-time.",
  },
  {
    Icon: Info,
    label: "Academic Distinction Check",
    desc: "Auto-detects President's Lister and Dean's Lister eligibility.",
  },
];

export default function AboutPage() {
  return (
    <main style={{ minHeight: "100vh", padding: "48px 16px 24px" }}>
      <div style={{ maxWidth: "560px", margin: "0 auto" }}>
        {/* Page heading */}
        <div
          className="anim-fade-up"
          style={{ textAlign: "center", marginBottom: "36px" }}
        >
          <h1
            className="text-gold-shimmer"
            style={{
              fontSize: "40px",
              fontWeight: 800,
              letterSpacing: "-1px",
              margin: 0,
            }}
          >
            About
          </h1>
          <p
            style={{
              fontSize: "11px",
              letterSpacing: "0.20em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.28)",
              fontWeight: 500,
              marginTop: "6px",
            }}
          >
            SSU–Bulan GWA Calculator
          </p>
        </div>

        {/* Purpose */}
        <div style={cardStyle} className="anim-fade-up d-1">
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              marginBottom: "14px",
            }}
          >
            <div
              style={iconBox(
                "#D4AF37",
                "rgba(212,175,55,0.12)",
                "rgba(212,175,55,0.22)",
              )}
            >
              <Info size={15} color="#D4AF37" strokeWidth={2} />
            </div>
            <span
              style={{
                fontSize: "14px",
                fontWeight: 700,
                color: "rgba(255,255,255,0.88)",
              }}
            >
              Purpose
            </span>
          </div>
          <p
            style={{
              fontSize: "13px",
              color: "rgba(255,255,255,0.52)",
              lineHeight: 1.7,
              margin: 0,
            }}
          >
            This tool helps students of Sorsogon State University – Bulan Campus
            compute their General Weighted Average and determine academic
            distinctions. It also generates a downloadable certificate image
            matching the official template.
          </p>
        </div>

        {/* Features */}
        <div style={cardStyle} className="anim-fade-up d-2">
          <p
            style={{
              fontSize: "10px",
              fontWeight: 700,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "rgba(212,175,55,0.58)",
              marginBottom: "16px",
            }}
          >
            Features
          </p>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "16px" }}
          >
            {features.map(({ Icon, label, desc }) => (
              <div
                key={label}
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "12px",
                }}
              >
                <div
                  style={iconBox(
                    "rgba(212,175,55,0.70)",
                    "rgba(255,255,255,0.06)",
                    "rgba(255,255,255,0.10)",
                  )}
                >
                  <Icon
                    size={13}
                    color="rgba(212,175,55,0.70)"
                    strokeWidth={2}
                  />
                </div>
                <div>
                  <p
                    style={{
                      fontSize: "13px",
                      fontWeight: 700,
                      color: "rgba(255,255,255,0.82)",
                      margin: "0 0 3px",
                    }}
                  >
                    {label}
                  </p>
                  <p
                    style={{
                      fontSize: "12px",
                      color: "rgba(255,255,255,0.38)",
                      margin: 0,
                      lineHeight: 1.5,
                    }}
                  >
                    {desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Disclaimer */}
        <div
          className="anim-fade-up d-3"
          style={{
            ...cardStyle,
            background:
              "linear-gradient(145deg, rgba(123,17,19,0.22) 0%, rgba(80,12,14,0.15) 100%)",
            borderColor: "rgba(123,17,19,0.38)",
            borderTopColor: "rgba(212,175,55,0.20)",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              marginBottom: "14px",
            }}
          >
            <div
              style={iconBox(
                "rgba(255,100,100,0.80)",
                "rgba(255,70,70,0.12)",
                "rgba(255,70,70,0.22)",
              )}
            >
              <ShieldAlert
                size={15}
                color="rgba(255,110,110,0.85)"
                strokeWidth={2}
              />
            </div>
            <span
              style={{
                fontSize: "14px",
                fontWeight: 700,
                color: "rgba(255,255,255,0.88)",
              }}
            >
              Disclaimer
            </span>
          </div>
          <p
            style={{
              fontSize: "13px",
              color: "rgba(255,255,255,0.48)",
              lineHeight: 1.7,
              margin: 0,
            }}
          >
            This website is{" "}
            <span style={{ color: "rgba(255,255,255,0.78)", fontWeight: 700 }}>
              not officially affiliated
            </span>{" "}
            with Sorsogon State University. It is created for personal and
            educational use only. GWA results and certificates generated here
            are not official academic documents.
          </p>
        </div>

        {/* Developer */}
        <div style={cardStyle} className="anim-fade-up d-4">
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              marginBottom: "12px",
            }}
          >
            <div
              style={iconBox(
                "rgba(100,160,255,0.80)",
                "rgba(100,160,255,0.10)",
                "rgba(100,160,255,0.20)",
              )}
            >
              <Code2 size={15} color="rgba(100,160,255,0.85)" strokeWidth={2} />
            </div>
            <span
              style={{
                fontSize: "14px",
                fontWeight: 700,
                color: "rgba(255,255,255,0.88)",
              }}
            >
              Developer
            </span>
          </div>
          <p
            style={{
              fontSize: "13px",
              color: "rgba(255,255,255,0.48)",
              lineHeight: 1.7,
              margin: 0,
            }}
          >
            Developed by{" "}
            <span style={{ color: "#fff", fontWeight: 800 }}>pagodnapogi</span>.
            Built with Next.js 14 App Router, TypeScript, and TailwindCSS.
          </p>
        </div>
      </div>
    </main>
  );
}

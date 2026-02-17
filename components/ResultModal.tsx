"use client";
import { useState, useRef } from "react";
import { X, Download, Trophy, Star, Sparkles, AlertCircle } from "lucide-react";
import { AcademicDistinction } from "@/lib/gwa";
import Certificate from "./Certificate";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  gwa: number;
  distinction: AcademicDistinction;
  semester: string;
  schoolYear: string;
};

export default function ResultModal({
  isOpen,
  onClose,
  gwa,
  distinction,
  semester,
  schoolYear,
}: Props) {
  const [name, setName] = useState("");
  const [showCert, setShowCert] = useState(false);
  const [loading, setLoading] = useState(false);
  const certRef = useRef<HTMLDivElement>(null);

  if (!isOpen) return null;

  const isPL = distinction === "PRESIDENT'S LISTER";

  const handleDownload = async () => {
    if (!name.trim()) {
      alert("Please enter your full name first.");
      return;
    }
    if (!distinction) return;
    setLoading(true);
    setShowCert(true);
    setTimeout(async () => {
      try {
        const { toPng } = await import("html-to-image");
        if (certRef.current) {
          const url = await toPng(certRef.current, { pixelRatio: 2 });
          const link = document.createElement("a");
          link.download = `${name.replace(/\s+/g, "-")}-certificate.png`;
          link.href = url;
          link.click();
        }
      } finally {
        setShowCert(false);
        setLoading(false);
      }
    }, 350);
  };

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={(e) => e.target === e.currentTarget && onClose()}
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 100,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "16px",
          background: "rgba(0,0,0,0.80)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
        }}
      >
        {/* Panel */}
        <div
          className="anim-scale-in"
          style={{
            width: "100%",
            maxWidth: "390px",
            borderRadius: "32px",
            overflow: "hidden",
            background:
              "linear-gradient(160deg, rgba(24,12,13,0.97) 0%, rgba(14,7,8,0.99) 100%)",
            backdropFilter: "blur(40px) saturate(180%)",
            WebkitBackdropFilter: "blur(40px) saturate(180%)",
            border: "1px solid rgba(255,255,255,0.12)",
            borderTopColor: "rgba(255,255,255,0.22)",
            boxShadow:
              "0 40px 100px rgba(0,0,0,0.75), inset 0 1px 0 rgba(255,255,255,0.10)",
          }}
        >
          {/* Header */}
          <div
            style={{
              position: "relative",
              padding: "20px 22px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              background:
                "linear-gradient(135deg, rgba(123,17,19,0.88) 0%, rgba(80,12,14,0.72) 100%)",
              borderBottom: "1px solid rgba(212,175,55,0.20)",
            }}
          >
            {/* Top shimmer line */}
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: "1px",
                background:
                  "linear-gradient(90deg, transparent 0%, rgba(212,175,55,0.60) 50%, transparent 100%)",
              }}
            />

            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <div
                style={{
                  width: "36px",
                  height: "36px",
                  borderRadius: "12px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: "rgba(212,175,55,0.20)",
                  border: "1px solid rgba(212,175,55,0.35)",
                }}
              >
                <Trophy size={17} color="#D4AF37" strokeWidth={2} />
              </div>
              <div>
                <p
                  style={{
                    margin: 0,
                    fontSize: "14px",
                    fontWeight: 700,
                    color: "#fff",
                    lineHeight: 1.2,
                  }}
                >
                  GWA Result
                </p>
                <p
                  style={{
                    margin: 0,
                    fontSize: "10px",
                    color: "rgba(255,255,255,0.42)",
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                  }}
                >
                  {semester} · {schoolYear}
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              style={{
                width: "30px",
                height: "30px",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "rgba(255,255,255,0.10)",
                border: "1px solid rgba(255,255,255,0.16)",
                color: "rgba(255,255,255,0.55)",
                cursor: "pointer",
                transition: "all 0.18s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(255,255,255,0.22)";
                e.currentTarget.style.color = "#fff";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(255,255,255,0.10)";
                e.currentTarget.style.color = "rgba(255,255,255,0.55)";
              }}
            >
              <X size={13} strokeWidth={2.5} />
            </button>
          </div>

          {/* Body */}
          <div style={{ padding: "30px 26px" }}>
            {/* GWA display */}
            <div style={{ textAlign: "center", marginBottom: "22px" }}>
              <p
                style={{
                  margin: "0 0 6px",
                  fontSize: "10px",
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,0.30)",
                  fontWeight: 600,
                }}
              >
                General Weighted Average
              </p>
              <div
                className="text-gold-shimmer"
                style={{
                  fontSize: "68px",
                  fontWeight: 900,
                  lineHeight: 1,
                  letterSpacing: "-2px",
                }}
              >
                {gwa.toFixed(4)}
              </div>
            </div>

            {distinction ? (
              <>
                {/* Distinction badge */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    marginBottom: "24px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "9px",
                      padding: "11px 22px",
                      borderRadius: "99px",
                      background: isPL
                        ? "linear-gradient(135deg, rgba(212,175,55,0.22) 0%, rgba(212,175,55,0.09) 100%)"
                        : "linear-gradient(135deg, rgba(100,160,255,0.22) 0%, rgba(100,160,255,0.09) 100%)",
                      border: isPL
                        ? "1px solid rgba(212,175,55,0.40)"
                        : "1px solid rgba(100,160,255,0.35)",
                      boxShadow: isPL
                        ? "0 0 28px rgba(212,175,55,0.20)"
                        : "0 0 28px rgba(100,160,255,0.20)",
                    }}
                  >
                    {isPL ? (
                      <Star size={13} color="#D4AF37" fill="#D4AF37" />
                    ) : (
                      <Sparkles size={13} color="#64a0ff" />
                    )}
                    <span
                      style={{
                        fontSize: "11px",
                        fontWeight: 800,
                        letterSpacing: "0.18em",
                        textTransform: "uppercase",
                        color: isPL ? "#D4AF37" : "#64a0ff",
                      }}
                    >
                      {distinction}
                    </span>
                    {isPL && <Star size={13} color="#D4AF37" fill="#D4AF37" />}
                  </div>
                </div>

                {/* Name input */}
                <input
                  type="text"
                  placeholder="Enter your full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="glass-input"
                  style={{ marginBottom: "12px" }}
                />

                {/* Download button */}
                <button
                  onClick={handleDownload}
                  disabled={loading}
                  className="btn-maroon"
                  style={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "10px",
                    padding: "15px",
                    fontSize: "13px",
                    letterSpacing: "0.06em",
                  }}
                >
                  <Download size={15} strokeWidth={2.5} />
                  {loading ? "Generating Certificate…" : "Download Certificate"}
                </button>
              </>
            ) : (
              <div
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "12px",
                  padding: "18px",
                  borderRadius: "18px",
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.09)",
                }}
              >
                <AlertCircle
                  size={16}
                  color="rgba(255,255,255,0.28)"
                  style={{ flexShrink: 0, marginTop: "2px" }}
                />
                <p
                  style={{
                    fontSize: "13px",
                    color: "rgba(255,255,255,0.45)",
                    fontStyle: "italic",
                    lineHeight: 1.65,
                    margin: 0,
                  }}
                >
                  Keep striving for excellence. You&apos;re closer than you
                  think.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Off-screen certificate render */}
      {showCert && distinction && (
        <div style={{ position: "fixed", top: -9999, left: -9999 }}>
          <Certificate
            ref={certRef}
            name={name}
            gwa={gwa}
            distinction={distinction}
            semester={semester}
            schoolYear={schoolYear}
          />
        </div>
      )}
    </>
  );
}

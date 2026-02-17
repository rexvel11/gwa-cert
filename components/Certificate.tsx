"use client";
import { forwardRef } from "react";
import { AcademicDistinction } from "@/lib/gwa";

type Props = {
  name: string;
  gwa: number;
  distinction: AcademicDistinction;
  semester: string;
  schoolYear: string;
};

// ─────────────────────────────────────────────────────────────────────────────
// Certificate component — renders an exact replica of the official SSU Bulan
// President's Lister / Dean's Lister certificate templates.
//
// IMPORTANT: All styles are inline because this is rendered via html-to-image.
// Tailwind classes will NOT work here.
//
// To swap in the real university logo, replace the <LogoPlaceholder /> with:
//   <img src="/logo.png" style={{ width:"100px", height:"100px" }} />
//
// Logo image must be placed in /public/logo.png
// ─────────────────────────────────────────────────────────────────────────────

const Certificate = forwardRef<HTMLDivElement, Props>(
  ({ name, gwa, distinction, semester, schoolYear }, ref) => {
    const isPL = distinction === "PRESIDENT'S LISTER";

    // ── Derived text values ────────────────────────────────────────────────
    const distinctionLabel = isPL ? "President's Lister" : "Dean's Lister";

    // Parse semester ordinal for display: "1st Semester" → "First Semester"
    const semesterDisplay = semester; // e.g. "1st Semester" or "2nd Semester"

    // Award date — dynamic based on current date
    const now = new Date();
    const day = now.getDate();
    const ordinal = (d: number) => {
      if (d > 3 && d < 21) return `${d}th`;
      switch (d % 10) {
        case 1:
          return `${d}st`;
        case 2:
          return `${d}nd`;
        case 3:
          return `${d}rd`;
        default:
          return `${d}th`;
      }
    };
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const awardDate = `${ordinal(day)} day of ${monthNames[now.getMonth()]}, ${now.getFullYear()}`;

    // ── Shared color tokens ────────────────────────────────────────────────
    const MAROON = "#7B1113";
    const GRAY = "#6B6B6B";
    const BLACK = "#111111";
    const WHITE = "#FFFFFF";

    // Canvas size — landscape A4-ish proportions, high-res friendly
    const W = 1080;
    const H = 760;

    return (
      <div
        ref={ref}
        style={{
          width: `${W}px`,
          height: `${H}px`,
          position: "relative",
          overflow: "hidden",
          backgroundColor: WHITE,
          fontFamily: "Georgia, 'Times New Roman', serif",
          boxSizing: "border-box",
        }}
      >
        {/* ══════════════════════════════════════════════════════════════
            CORNER TRIANGLE DECORATIONS
            Exact match: maroon (top-left, bottom-left) + gray (top-right, bottom-right)
        ══════════════════════════════════════════════════════════════ */}

        {/* Top-left maroon filled triangle */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: 0,
            height: 0,
            borderStyle: "solid",
            borderWidth: "160px 160px 0 0",
            borderColor: `${MAROON} transparent transparent transparent`,
          }}
        />

        {/* Top-left inner lighter maroon (creates the layered look) */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: 0,
            height: 0,
            borderStyle: "solid",
            borderWidth: "120px 120px 0 0",
            borderColor: `#9b1a1c transparent transparent transparent`,
          }}
        />

        {/* Bottom-left maroon triangle */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            width: 0,
            height: 0,
            borderStyle: "solid",
            borderWidth: "0 0 140px 140px",
            borderColor: `transparent transparent ${MAROON} transparent`,
          }}
        />

        {/* Top-right gray triangle */}
        <div
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            width: 0,
            height: 0,
            borderStyle: "solid",
            borderWidth: "0 150px 150px 0",
            borderColor: `transparent ${GRAY} transparent transparent`,
          }}
        />

        {/* Top-right lighter gray inner */}
        <div
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            width: 0,
            height: 0,
            borderStyle: "solid",
            borderWidth: "0 100px 100px 0",
            borderColor: `transparent #999 transparent transparent`,
          }}
        />

        {/* Bottom-right maroon triangle */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            right: 0,
            width: 0,
            height: 0,
            borderStyle: "solid",
            borderWidth: "0 160px 160px 0",
            borderColor: `transparent transparent transparent ${MAROON}`,
          }}
        />

        {/* Bottom-right gray inner */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            right: 0,
            width: 0,
            height: 0,
            borderStyle: "solid",
            borderWidth: "0 110px 110px 0",
            borderColor: `transparent transparent transparent ${GRAY}`,
          }}
        />

        {/* ══════════════════════════════════════════════════════════════
            OUTER BORDER — thin black line inset from edge
        ══════════════════════════════════════════════════════════════ */}
        <div
          style={{
            position: "absolute",
            top: "10px",
            left: "10px",
            right: "10px",
            bottom: "10px",
            border: `2px solid ${BLACK}`,
            pointerEvents: "none",
            zIndex: 2,
          }}
        />

        {/* ══════════════════════════════════════════════════════════════
            HEADER SECTION — logo + title text + medal
        ══════════════════════════════════════════════════════════════ */}
        <div
          style={{
            position: "absolute",
            top: "30px",
            left: "30px",
            right: "30px",
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            zIndex: 10,
            padding: "0 10px",
          }}
        >
          {/* University logo — left */}
          <div
            style={{
              width: "100px",
              height: "100px",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              overflow: "hidden",
              flexShrink: 0,
            }}
          >
            {/*
              REPLACE THIS with the actual logo image:
              <img src="/logo.png" alt="SSU Logo" style={{ width:"100px", height:"100px", borderRadius:"50%" }} />

              Placeholder shown below:
            */}
            <div
              style={{
                width: "100px",
                height: "100px",
                borderRadius: "50%",
                background:
                  "radial-gradient(circle, #9b1a1c 0%, #560c0e 60%, #3a0809 100%)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                border: "3px solid #7B1113",
              }}
            >
              <span
                style={{
                  color: "#D4AF37",
                  fontSize: "9px",
                  fontWeight: 700,
                  textAlign: "center",
                  lineHeight: 1.2,
                  padding: "0 4px",
                }}
              >
                SSU
              </span>
              <span
                style={{
                  color: "rgba(255,255,255,0.60)",
                  fontSize: "7px",
                  textAlign: "center",
                  lineHeight: 1.2,
                  padding: "0 4px",
                }}
              >
                BULAN
              </span>
            </div>
          </div>

          {/* Center header text */}
          <div style={{ flex: 1, textAlign: "center", paddingTop: "10px" }}>
            <p
              style={{
                margin: "0 0 2px",
                fontSize: "14px",
                color: BLACK,
                fontFamily: "Arial, sans-serif",
              }}
            >
              Republic of the Philippines
            </p>
            <p
              style={{
                margin: "0 0 1px",
                fontSize: "15px",
                fontWeight: 700,
                color: BLACK,
                fontFamily: "Arial, sans-serif",
              }}
            >
              SORSOGON STATE UNIVERSITY
            </p>
            <p
              style={{
                margin: "0 0 1px",
                fontSize: "14px",
                fontWeight: 700,
                color: BLACK,
                fontFamily: "Arial, sans-serif",
              }}
            >
              BULAN CAMPUS
            </p>
            <p
              style={{
                margin: 0,
                fontSize: "13px",
                color: BLACK,
                fontFamily: "Arial, sans-serif",
              }}
            >
              Bulan, Sorsogon
            </p>
          </div>

          {/* Gold medal — right */}
          <div
            style={{
              width: "90px",
              height: "110px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              flexShrink: 0,
            }}
          >
            {/* Medal circle */}
            <div
              style={{
                width: "70px",
                height: "70px",
                borderRadius: "50%",
                background:
                  "radial-gradient(circle at 35% 35%, #f5e06a 0%, #D4AF37 40%, #a88420 70%, #7a5e10 100%)",
                border: "3px solid #c9991f",
                boxShadow: "0 4px 12px rgba(180,140,20,0.50)",
                flexShrink: 0,
              }}
            />
            {/* Red ribbon */}
            <div
              style={{
                display: "flex",
                gap: "4px",
                marginTop: "4px",
              }}
            >
              <div
                style={{
                  width: "24px",
                  height: "44px",
                  background:
                    "linear-gradient(180deg, #c0101a 0%, #8b0000 100%)",
                  clipPath: "polygon(0 0, 100% 0, 100% 85%, 50% 100%, 0 85%)",
                }}
              />
              <div
                style={{
                  width: "24px",
                  height: "44px",
                  background:
                    "linear-gradient(180deg, #c0101a 0%, #8b0000 100%)",
                  clipPath: "polygon(0 0, 100% 0, 100% 85%, 50% 100%, 0 85%)",
                }}
              />
            </div>
          </div>
        </div>

        {/* ══════════════════════════════════════════════════════════════
            CERTIFICATE BODY
        ══════════════════════════════════════════════════════════════ */}
        <div
          style={{
            position: "absolute",
            top: "150px",
            left: "80px",
            right: "80px",
            bottom: isPL ? "100px" : "110px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            zIndex: 5,
          }}
        >
          {/* "award this" italic script */}
          <p
            style={{
              margin: "0 0 4px",
              fontSize: "20px",
              fontStyle: "italic",
              color: "#333",
              fontFamily: "Georgia, serif",
            }}
          >
            award this
          </p>

          {/* Certificate of Merit — large italic script */}
          <h1
            style={{
              margin: "0 0 10px",
              fontSize: "58px",
              fontStyle: "italic",
              fontWeight: 400,
              color: BLACK,
              fontFamily: "Georgia, 'Times New Roman', serif",
              lineHeight: 1.1,
            }}
          >
            Certificate of Merit
          </h1>

          {/* "to" */}
          <p
            style={{
              margin: "0 0 10px",
              fontSize: "17px",
              color: "#444",
              fontFamily: "Georgia, serif",
            }}
          >
            to
          </p>

          {/* Recipient name */}
          <h2
            style={{
              margin: "0 0 14px",
              fontSize: "58px",
              fontWeight: 900,
              fontStyle: "italic",
              textTransform: "uppercase",
              color: BLACK,
              fontFamily: "Arial Black, Arial, sans-serif",
              lineHeight: 1.0,
              letterSpacing: "2px",
              wordBreak: "break-word",
              maxWidth: "860px",
            }}
          >
            {name || "NAME HERE"}
          </h2>

          {/* Distinction label */}
          <p
            style={{
              margin: "0 0 4px",
              fontSize: "24px",
              fontWeight: 700,
              color: BLACK,
              fontFamily: "Georgia, serif",
            }}
          >
            {distinctionLabel}
          </p>

          {/* Semester + School Year */}
          <p
            style={{
              margin: "0 0 18px",
              fontSize: "18px",
              fontWeight: 700,
              color: BLACK,
              fontFamily: "Georgia, serif",
            }}
          >
            {semesterDisplay} A.Y. {schoolYear}
          </p>

          {/* Body text */}
          <p
            style={{
              margin: "0 0 4px",
              fontSize: "13px",
              color: "#222",
              fontFamily: "Arial, sans-serif",
              lineHeight: 1.55,
              maxWidth: "700px",
              textAlign: "center",
            }}
          >
            For His/Her exemplary performance in his/her academic endeavors in
            the course Bachelor of Science in Information Technology (BSIT).
          </p>
          <p
            style={{
              margin: 0,
              fontSize: "13px",
              color: "#222",
              fontFamily: "Arial, sans-serif",
              lineHeight: 1.55,
              maxWidth: "700px",
              textAlign: "center",
            }}
          >
            Awarded this {awardDate} at Sorsogon State University, Bulan Campus,
            Bulan Sorsogon.
          </p>
        </div>

        {/* ══════════════════════════════════════════════════════════════
            SIGNATORIES
            PL  → 1 signatory, centered  (University President)
            DL  → 2 signatories, left + right (Dean CICT + Campus Admin)
        ══════════════════════════════════════════════════════════════ */}

        {isPL ? (
          /* ── President's Lister: single centered signatory ── */
          <div
            style={{
              position: "absolute",
              bottom: "36px",
              left: 0,
              right: 0,
              display: "flex",
              justifyContent: "center",
              zIndex: 10,
            }}
          >
            <div style={{ textAlign: "center" }}>
              {/* Signature line */}
              <div
                style={{
                  width: "220px",
                  borderTop: `1.5px solid ${BLACK}`,
                  margin: "0 auto 4px",
                }}
              />
              <p
                style={{
                  margin: "0 0 1px",
                  fontSize: "13px",
                  fontWeight: 700,
                  color: BLACK,
                  fontFamily: "Arial, sans-serif",
                  letterSpacing: "0.5px",
                }}
              >
                DR. GERALDINE F. DE JESUS
              </p>
              <p
                style={{
                  margin: 0,
                  fontSize: "12px",
                  color: "#333",
                  fontFamily: "Arial, sans-serif",
                }}
              >
                University President
              </p>
            </div>
          </div>
        ) : (
          /* ── Dean's Lister: two signatories ── */
          <div
            style={{
              position: "absolute",
              bottom: "30px",
              left: "60px",
              right: "60px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-end",
              zIndex: 10,
            }}
          >
            {/* Left — Dean, CICT */}
            <div style={{ textAlign: "center" }}>
              <div
                style={{
                  width: "210px",
                  borderTop: `1.5px solid ${BLACK}`,
                  margin: "0 auto 4px",
                }}
              />
              <p
                style={{
                  margin: "0 0 1px",
                  fontSize: "13px",
                  fontWeight: 700,
                  color: BLACK,
                  fontFamily: "Arial, sans-serif",
                  letterSpacing: "0.4px",
                }}
              >
                ENGR. REY C. RODRIGEZA, MIT
              </p>
              <p
                style={{
                  margin: 0,
                  fontSize: "12px",
                  color: "#333",
                  fontFamily: "Arial, sans-serif",
                }}
              >
                Dean, CICT
              </p>
            </div>

            {/* Right — Campus Administrator */}
            <div style={{ textAlign: "center" }}>
              <div
                style={{
                  width: "210px",
                  borderTop: `1.5px solid ${BLACK}`,
                  margin: "0 auto 4px",
                }}
              />
              <p
                style={{
                  margin: "0 0 1px",
                  fontSize: "13px",
                  fontWeight: 700,
                  color: BLACK,
                  fontFamily: "Arial, sans-serif",
                  letterSpacing: "0.4px",
                }}
              >
                MA. ELENA C. DEMDAM, RGC
              </p>
              <p
                style={{
                  margin: 0,
                  fontSize: "12px",
                  color: "#333",
                  fontFamily: "Arial, sans-serif",
                }}
              >
                Campus Administrator
              </p>
            </div>
          </div>
        )}
      </div>
    );
  },
);

Certificate.displayName = "Certificate";
export default Certificate;

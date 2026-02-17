"use client";
import React, { forwardRef } from "react";
import { AcademicDistinction } from "@/lib/gwa";

type Props = {
  name: string;
  gwa: number;
  distinction: AcademicDistinction;
  semester: string;
  schoolYear: string;
};

// The background image (cert-bg.png) is 2000×1414px.
// We render at 1000×707px (exactly half) so every pixel lines up perfectly.
// All absolute positions below are calibrated to this 1000×707 canvas.

const Certificate = forwardRef<HTMLDivElement, Props>(
  ({ name, gwa, distinction, semester, schoolYear }, ref) => {
    const today = new Date();
    const dateStr = today.toLocaleDateString("en-US", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });

    const isPL = distinction === "PRESIDENT'S LISTER";
    const certSubtitle = isPL ? "OF MERIT" : "OF ACADEMIC DISTINCTION";

    // The usable text area is the right portion — after the diagonal stripe.
    // Stripe ends around x=310 at the bottom, x=210 at the top.
    // We center all text in the region from ~x=260 to x=980 → center ≈ x=620
    const centerX = 620;
    const centerW = 720; // width of the text column

    return (
      <div
        ref={ref}
        style={{
          position: "relative",
          width: "1000px",
          height: "707px",
          overflow: "hidden",
          fontFamily: "'Georgia', 'Times New Roman', serif",
          // Prevent any inherited styles from leaking in
          lineHeight: "normal",
          letterSpacing: "normal",
        }}
      >
        {/* ── Background image ── */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/cert-bg.png"
          alt=""
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
          }}
        />

        {/* ── All text layers sit on top ── */}

        {/* REPUBLIC OF THE PHILIPPINES */}
        <div
          style={{
            position: "absolute",
            top: "148px",
            left: `${centerX - centerW / 2}px`,
            width: `${centerW}px`,
            textAlign: "center",
            fontSize: "11px",
            fontFamily: "Arial, Helvetica, sans-serif",
            fontWeight: 400,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.72)",
          }}
        >
          Republic of the Philippines
        </div>

        {/* SORSOGON STATE UNIVERSITY – BULAN CAMPUS */}
        <div
          style={{
            position: "absolute",
            top: "164px",
            left: `${centerX - centerW / 2}px`,
            width: `${centerW}px`,
            textAlign: "center",
            fontSize: "12px",
            fontFamily: "Arial, Helvetica, sans-serif",
            fontWeight: 700,
            letterSpacing: "0.16em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.88)",
          }}
        >
          Sorsogon State University – Bulan Campus
        </div>

        {/* CERTIFICATE */}
        <div
          style={{
            position: "absolute",
            top: "192px",
            left: `${centerX - centerW / 2}px`,
            width: `${centerW}px`,
            textAlign: "center",
            fontSize: "78px",
            fontFamily: "'Arial Black', 'Arial', sans-serif",
            fontWeight: 900,
            letterSpacing: "0.10em",
            textTransform: "uppercase",
            color: "#ffffff",
            lineHeight: 1,
            textShadow: "0 2px 18px rgba(0,0,0,0.35)",
          }}
        >
          CERTIFICATE
        </div>

        {/* OF MERIT / OF ACADEMIC DISTINCTION */}
        <div
          style={{
            position: "absolute",
            top: "284px",
            left: `${centerX - centerW / 2}px`,
            width: `${centerW}px`,
            textAlign: "center",
            fontSize: "14px",
            fontFamily: "Arial, Helvetica, sans-serif",
            fontWeight: 700,
            letterSpacing: "0.32em",
            textTransform: "uppercase",
            color: "#D4AF37",
          }}
        >
          {certSubtitle}
        </div>

        {/* This certificate is proudly presented to */}
        <div
          style={{
            position: "absolute",
            top: "308px",
            left: `${centerX - centerW / 2}px`,
            width: `${centerW}px`,
            textAlign: "center",
            fontSize: "13.5px",
            fontFamily: "Georgia, serif",
            fontStyle: "italic",
            fontWeight: 400,
            color: "rgba(255,255,255,0.78)",
          }}
        >
          This certificate is proudly presented to
        </div>

        {/* ── NAME ── */}
        <div
          style={{
            position: "absolute",
            top: "328px",
            left: `${centerX - centerW / 2}px`,
            width: `${centerW}px`,
            textAlign: "center",
            fontSize: "62px",
            fontFamily: "Georgia, 'Palatino Linotype', serif",
            fontStyle: "italic",
            fontWeight: 400,
            color: "#ffffff",
            lineHeight: 1.15,
            textShadow: "0 2px 10px rgba(0,0,0,0.3)",
            // Scale down long names
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {name}
        </div>

        {/* Gold rule under name */}
        <div
          style={{
            position: "absolute",
            top: "408px",
            left: `${centerX - 200}px`,
            width: "400px",
            height: "1.5px",
            background:
              "linear-gradient(90deg, transparent, rgba(212,175,55,0.75), transparent)",
          }}
        />

        {/* DISTINCTION badge — PRESIDENT'S LISTER / DEAN'S LISTER */}
        <div
          style={{
            position: "absolute",
            top: "416px",
            left: `${centerX - centerW / 2}px`,
            width: `${centerW}px`,
            textAlign: "center",
            fontSize: "13.5px",
            fontFamily: "Arial, Helvetica, sans-serif",
            fontWeight: 800,
            letterSpacing: "0.26em",
            textTransform: "uppercase",
            color: "#D4AF37",
          }}
        >
          {distinction}
        </div>

        {/* Semester + AY */}
        <div
          style={{
            position: "absolute",
            top: "438px",
            left: `${centerX - centerW / 2}px`,
            width: `${centerW}px`,
            textAlign: "center",
            fontSize: "13.5px",
            fontFamily: "Arial, Helvetica, sans-serif",
            fontWeight: 700,
            color: "rgba(255,255,255,0.90)",
          }}
        >
          {semester} A.Y. {schoolYear}
        </div>

        {/* Body paragraph */}
        <div
          style={{
            position: "absolute",
            top: "466px",
            left: `${centerX - 270}px`,
            width: "540px",
            textAlign: "center",
            fontSize: "11.5px",
            fontFamily: "Arial, Helvetica, sans-serif",
            fontWeight: 400,
            color: "rgba(255,255,255,0.72)",
            lineHeight: 1.65,
          }}
        >
          For his/her exemplary performance in academic endeavors in the course
          Bachelor of Science in Information Technology (BSIT). Awarded this{" "}
          {dateStr} at Sorsogon State University, Bulan Campus, Bulan, Sorsogon.
        </div>

        {/* ── GWA — bottom right ── */}
        <div
          style={{
            position: "absolute",
            bottom: "38px",
            right: "46px",
            textAlign: "right",
          }}
        >
          <div
            style={{
              fontSize: "9px",
              fontFamily: "Arial, Helvetica, sans-serif",
              fontWeight: 400,
              letterSpacing: "0.30em",
              textTransform: "uppercase",
              color: "rgba(212,175,55,0.65)",
              marginBottom: "2px",
            }}
          >
            GWA
          </div>
          <div
            style={{
              fontSize: "34px",
              fontFamily: "'Arial Black', Arial, sans-serif",
              fontWeight: 900,
              color: "rgba(255,255,255,0.92)",
              letterSpacing: "0.02em",
              lineHeight: 1,
            }}
          >
            {gwa.toFixed(4)}
          </div>
        </div>
      </div>
    );
  },
);

Certificate.displayName = "Certificate";
export default Certificate;

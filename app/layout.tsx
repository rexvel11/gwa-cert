import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "SSU-Bulan GWA Calculator",
  description: "GWA Calculator — Sorsogon State University Bulan Campus",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={jakarta.className}>
        {/* ── Ambient background orbs (JSX-rendered, not CSS bg) ── */}
        <div
          aria-hidden
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 0,
            pointerEvents: "none",
            overflow: "hidden",
          }}
        >
          {/* Top-left maroon orb */}
          <div
            className="anim-orb"
            style={{
              position: "absolute",
              top: "-120px",
              left: "-120px",
              width: "520px",
              height: "520px",
              borderRadius: "50%",
              background:
                "radial-gradient(circle, rgba(123,17,19,0.70) 0%, transparent 70%)",
              filter: "blur(55px)",
              opacity: 0.6,
            }}
          />
          {/* Top-right gold orb */}
          <div
            className="anim-orb"
            style={{
              position: "absolute",
              top: "-60px",
              right: "-80px",
              width: "380px",
              height: "380px",
              borderRadius: "50%",
              background:
                "radial-gradient(circle, rgba(212,175,55,0.50) 0%, transparent 70%)",
              filter: "blur(70px)",
              opacity: 0.3,
              animationDelay: "-5s",
              animationDuration: "18s",
            }}
          />
          {/* Bottom-right maroon orb */}
          <div
            className="anim-orb"
            style={{
              position: "absolute",
              bottom: "-100px",
              right: "-100px",
              width: "460px",
              height: "460px",
              borderRadius: "50%",
              background:
                "radial-gradient(circle, rgba(123,17,19,0.60) 0%, transparent 70%)",
              filter: "blur(60px)",
              opacity: 0.5,
              animationDelay: "-9s",
              animationDuration: "20s",
            }}
          />
          {/* Center subtle maroon wash */}
          <div
            style={{
              position: "absolute",
              top: "40%",
              left: "50%",
              transform: "translate(-50%,-50%)",
              width: "600px",
              height: "300px",
              borderRadius: "50%",
              background:
                "radial-gradient(ellipse, rgba(100,14,16,0.25) 0%, transparent 70%)",
              filter: "blur(80px)",
              opacity: 0.5,
            }}
          />
        </div>

        {/* ── App shell ── */}
        <div style={{ position: "relative", zIndex: 1 }}>
          <Navbar />
          {children}
          <footer
            style={{
              textAlign: "center",
              fontSize: "11px",
              letterSpacing: "0.20em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.22)",
              fontWeight: 500,
              padding: "32px 0 24px",
            }}
          >
            Developed by pagodnapogi
          </footer>
        </div>
      </body>
    </html>
  );
}

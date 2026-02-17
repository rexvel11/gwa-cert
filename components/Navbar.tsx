"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { GraduationCap, Home, Info } from "lucide-react";

const links = [
  { href: "/", label: "Home", Icon: Home },
  { href: "/about", label: "About", Icon: Info },
];

export default function Navbar() {
  const path = usePathname();

  return (
    <>
      {/* ── Top bar ── */}
      <header
        className="glass-nav"
        style={{
          position: "sticky",
          top: 0,
          zIndex: 50,
          width: "100%",
        }}
      >
        <div
          style={{
            maxWidth: "640px",
            margin: "0 auto",
            padding: "12px 20px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {/* Logo mark */}
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div
              style={{
                width: "32px",
                height: "32px",
                borderRadius: "10px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background:
                  "linear-gradient(135deg, rgba(212,175,55,0.28) 0%, rgba(212,175,55,0.10) 100%)",
                border: "1px solid rgba(212,175,55,0.38)",
                boxShadow: "inset 0 1px 0 rgba(255,255,255,0.18)",
                flexShrink: 0,
              }}
            >
              <GraduationCap size={16} color="#D4AF37" strokeWidth={2} />
            </div>
            <span
              style={{
                fontSize: "14px",
                fontWeight: 600,
                color: "rgba(255,255,255,0.90)",
              }}
            >
              SSU–Bulan{" "}
              <span style={{ color: "#D4AF37", fontWeight: 700 }}>GWA</span>
            </span>
          </div>

          {/* Desktop nav links (md and up) */}
          <nav
            style={{
              display: "flex",
              alignItems: "center",
              gap: "4px",
            }}
            className="desktop-nav"
          >
            {links.map(({ href, label, Icon }) => {
              const active = path === href;
              return (
                <Link
                  key={href}
                  href={href}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    padding: "7px 16px",
                    borderRadius: "99px",
                    fontSize: "13px",
                    fontWeight: 500,
                    textDecoration: "none",
                    transition: "all 0.2s ease",
                    background: active
                      ? "rgba(255,255,255,0.12)"
                      : "transparent",
                    color: active ? "#fff" : "rgba(255,255,255,0.50)",
                    border: active
                      ? "1px solid rgba(255,255,255,0.14)"
                      : "1px solid transparent",
                  }}
                >
                  <Icon
                    size={13}
                    color={active ? "#D4AF37" : "rgba(255,255,255,0.40)"}
                    strokeWidth={active ? 2.5 : 2}
                  />
                  {label}
                </Link>
              );
            })}
          </nav>
        </div>
      </header>

      {/* ── Mobile bottom glass pill ── */}
      <div
        className="mobile-nav-wrap"
        style={{
          position: "fixed",
          bottom: "20px",
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          zIndex: 50,
          pointerEvents: "none",
        }}
      >
        <nav
          style={{
            pointerEvents: "auto",
            display: "flex",
            alignItems: "center",
            gap: "8px",
            padding: "6px",
            borderRadius: "999px",
            background:
              "linear-gradient(160deg, rgba(255,255,255,0.16) 0%, rgba(255,255,255,0.07) 100%)",
            backdropFilter: "blur(32px) saturate(200%)",
            WebkitBackdropFilter: "blur(32px) saturate(200%)",
            border: "1px solid rgba(255,255,255,0.20)",
            borderTopColor: "rgba(255,255,255,0.30)",
            boxShadow:
              "0 8px 40px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.15), inset 0 -1px 0 rgba(0,0,0,0.20)",
          }}
        >
          {links.map(({ href, label, Icon }) => {
            const active = path === href;
            return (
              <Link
                key={href}
                href={href}
                style={{
                  position: "relative",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "10px 22px",
                  borderRadius: "999px",
                  fontSize: "13px",
                  fontWeight: 700,
                  textDecoration: "none",
                  letterSpacing: "0.04em",
                  transition: "all 0.28s cubic-bezier(0.22,1,0.36,1)",
                  ...(active
                    ? {
                        background:
                          "linear-gradient(135deg, rgba(123,17,19,0.88) 0%, rgba(80,12,14,0.75) 100%)",
                        border: "1px solid rgba(212,175,55,0.32)",
                        boxShadow:
                          "0 4px 20px rgba(123,17,19,0.65), inset 0 1px 0 rgba(255,255,255,0.16), inset 0 -1px 0 rgba(0,0,0,0.22)",
                        color: "#fff",
                        transform: "scale(1.04)",
                      }
                    : {
                        color: "rgba(255,255,255,0.42)",
                        border: "1px solid transparent",
                      }),
                }}
              >
                {/* Active gold dot */}
                {active && (
                  <span
                    style={{
                      position: "absolute",
                      top: "-2px",
                      left: "50%",
                      transform: "translateX(-50%)",
                      width: "4px",
                      height: "4px",
                      borderRadius: "50%",
                      background: "#D4AF37",
                      boxShadow: "0 0 8px 3px rgba(212,175,55,0.70)",
                    }}
                  />
                )}
                <Icon
                  size={15}
                  color={active ? "#D4AF37" : "rgba(255,255,255,0.38)"}
                  strokeWidth={active ? 2.5 : 1.8}
                />
                {label}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Responsive visibility via injected style */}
      <style>{`
        @media (min-width: 768px) {
          .mobile-nav-wrap { display: none !important; }
          .desktop-nav     { display: flex !important; }
        }
        @media (max-width: 767px) {
          .mobile-nav-wrap { display: flex !important; }
          .desktop-nav     { display: none !important; }
        }
      `}</style>

      {/* Bottom spacer on mobile so content clears pill */}
      <div className="mobile-spacer" style={{ height: "80px" }}>
        <style>{`@media (min-width: 768px) { .mobile-spacer { display: none; } }`}</style>
      </div>
    </>
  );
}

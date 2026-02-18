import Image from "next/image";

export default function Header() {
  return (
    <div
      className="anim-fade-up"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        gap: "20px",
        marginBottom: "36px",
      }}
    >
      {/* Logo orb */}
      <div className="anim-float" style={{ position: "relative" }}>
        {/* Glow ring behind orb */}
        <div
          style={{
            position: "absolute",
            inset: "-10px",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(212,175,55,0.22) 0%, transparent 70%)",
            filter: "blur(8px)",
            animation: "pulse-ring 2.8s ease-in-out infinite",
          }}
        />
        {/* Glass circle with logo */}
        <div
          style={{
            position: "relative",
            width: "88px",
            height: "88px",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background:
              "linear-gradient(145deg, rgba(123,17,19,0.80) 0%, rgba(80,12,14,0.65) 100%)",
            backdropFilter: "blur(16px)",
            WebkitBackdropFilter: "blur(16px)",
            border: "1px solid rgba(212,175,55,0.40)",
            borderTopColor: "rgba(212,175,55,0.60)",
            boxShadow:
              "0 12px 40px rgba(123,17,19,0.60), inset 0 1px 0 rgba(255,255,255,0.20), inset 0 -1px 0 rgba(0,0,0,0.28)",
            overflow: "hidden",
          }}
        >
          <Image
            src="/logo.png"
            alt="SSU Bulan Logo"
            width={68}
            height={68}
            style={{ objectFit: "contain" }}
            priority
          />
        </div>
      </div>

      {/* Text block */}
      <div
        className="anim-fade-up d-2"
        style={{ display: "flex", flexDirection: "column", gap: "6px" }}
      >
        <p
          style={{
            fontSize: "11px",
            letterSpacing: "0.20em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.35)",
            fontWeight: 500,
            margin: 0,
          }}
        >
          Republic of the Philippines
        </p>

        <h1
          style={{
            fontSize: "clamp(18px, 4vw, 22px)",
            fontWeight: 700,
            color: "rgba(255,255,255,0.92)",
            letterSpacing: "-0.3px",
            lineHeight: 1.2,
            margin: 0,
          }}
        >
          Sorsogon State University
          <span style={{ color: "rgba(255,255,255,0.45)", fontWeight: 400 }}>
            {" "}
            – Bulan Campus
          </span>
        </h1>

        <h2
          className="text-gold-shimmer anim-fade-up d-3"
          style={{
            fontSize: "clamp(28px, 7vw, 38px)",
            fontWeight: 800,
            letterSpacing: "-1px",
            margin: "2px 0 0",
          }}
        >
          GWA Calculator
        </h2>

        <p
          className="anim-fade-up d-4"
          style={{
            fontSize: "10px",
            letterSpacing: "0.24em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.22)",
            fontWeight: 500,
            margin: 0,
          }}
        >
          not affiliated with SorSU–Bulan, for educational purposes only
        </p>
      </div>

      <style>{`
        @keyframes pulse-ring {
          0%,100% { opacity: 0.0; transform: scale(1.00); }
          50%      { opacity: 1.0; transform: scale(1.20); }
        }
      `}</style>
    </div>
  );
}

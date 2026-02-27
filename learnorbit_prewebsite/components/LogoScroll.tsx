"use client";

import React from "react";
import Image from "next/image";

// ── Real company logos ────────────────────────────────────────────────────────
// scale: multiplier to adjust individual logo sizes perfectly to match visual weight.
const logos = [
  { name: "Vantixio", src: "/assets/vantixio.jpg", scale: 1 },
  { name: "ShyvnTech", src: "/assets/shyvntech_logo.jpg", scale: 0.9 },
  { name: "FreshGrade Prep", src: "/assets/freshgradeprep.png", scale: 1.35 },
];

// Repeat 8× so the strip looks full and the loop is seamless
const REPEAT = 8;
const marqueeItems = Array.from({ length: REPEAT }, () => logos).flat();

export const LogoScroll: React.FC = () => {
  return (
    <section
      style={{
        background: "linear-gradient(to bottom, #ffffff, #f8fafc)",
        padding: "64px 0 64px",
        overflow: "hidden",
      }}
    >
      {/* ── Eyebrow ── */}
      <div style={{ textAlign: "center", marginBottom: "40px" }}>
        <span
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "14px",
            fontSize: "12px",
            fontWeight: 600,
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            color: "#64748b",
          }}
        >
          <span style={{ display: "block", width: "48px", height: "1px", background: "#cbd5e1" }} />
          Trusted By Teams At
          <span style={{ display: "block", width: "48px", height: "1px", background: "#cbd5e1" }} />
        </span>
      </div>

      {/* ── Marquee wrapper with fade edges ── */}
      <div style={{ position: "relative", width: "100%" }}>
        {/* Left fade */}
        <div
          style={{
            position: "absolute", top: 0, left: 0, bottom: 0,
            width: "140px", zIndex: 10, pointerEvents: "none",
            background: "linear-gradient(to right, #ffffff, transparent)",
          }}
        />

        {/* Scrolling track */}
        <div style={{ overflow: "hidden" }}>
          <div className="lo-marquee-inner">
            {marqueeItems.map((logo, i) => (
              <div key={`${logo.name}-${i}`} className="lo-logo-item">
                <Image
                  src={logo.src}
                  alt={logo.name}
                  width={300}
                  height={120}
                  className="lo-logo-img"
                  style={{ width: "auto", height: `${52 * (logo.scale || 1)}px`, maxWidth: "240px", objectFit: "contain" }}
                  priority={i < 4}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Right fade */}
        <div
          style={{
            position: "absolute", top: 0, right: 0, bottom: 0,
            width: "140px", zIndex: 10, pointerEvents: "none",
            background: "linear-gradient(to left, #f8fafc, transparent)",
          }}
        />
      </div>

      <style jsx global>{`
        .lo-marquee-inner {
          display: flex;
          align-items: center;
          width: max-content;
          animation: loScroll 30s linear infinite;
        }
        .lo-marquee-inner:hover {
          animation-play-state: paused;
        }

        .lo-logo-item {
          flex-shrink: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0 48px;
        }

        .lo-logo-img {
          display: block;
          object-fit: contain;
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
          filter: grayscale(10%) drop-shadow(0px 1px 2px rgba(0,0,0,0.03));
          opacity: 0.9;
        }

        .lo-logo-item:hover .lo-logo-img {
          transform: scale(1.04) translateY(-1px);
          filter: grayscale(0%) drop-shadow(0px 6px 16px rgba(0,0,0,0.08));
          opacity: 1;
        }

        @keyframes loScroll {
          0%   { transform: translateX(0); }
          100% { transform: translateX(calc(-100% / ${REPEAT} * 2)); }
        }

        @media (prefers-reduced-motion: reduce) {
          .lo-marquee-inner {
            animation: none;
            flex-wrap: wrap;
            justify-content: center;
            gap: 48px;
          }
        }
      `}</style>
    </section>
  );
};

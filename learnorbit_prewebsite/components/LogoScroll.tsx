"use client";

import React from "react";
import Image from "next/image";

// ── Real company logos ────────────────────────────────────────────────────────
// Add more entries here as new partners join.
// imgHeight: visual height in px — tune per logo to compensate for internal whitespace
const logos = [
  { name: "Vantixio", src: "/assets/vantixio.jpg", imgHeight: "110px", maxWidth: "280px" },
  { name: "ShyvnTech", src: "/assets/shyvntech_logo.jpg", imgHeight: "72px", maxWidth: "200px" },
];

// Repeat 8× so the strip looks full and the loop is seamless
const REPEAT = 8;
const marqueeItems = Array.from({ length: REPEAT }, () => logos).flat();

export const LogoScroll: React.FC = () => {
  return (
    <section
      style={{
        background: "#ffffff",
        padding: "52px 0 48px",
        borderTop: "1px solid #e2e8f0",
        borderBottom: "1px solid #e2e8f0",
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
            fontSize: "11px",
            fontWeight: 700,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "#94a3b8",
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
                  style={{ width: "auto", height: logo.imgHeight, maxWidth: logo.maxWidth, objectFit: "contain" }}
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
            background: "linear-gradient(to left, #ffffff, transparent)",
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
          padding: 0 56px;
          border-right: 1px solid #f1f5f9;
        }

        .lo-logo-img {
          display: block;
          object-fit: contain;
          transition: transform 0.3s ease, opacity 0.3s ease;
        }

        .lo-logo-item:hover .lo-logo-img {
          transform: scale(1.06) translateY(-2px);
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

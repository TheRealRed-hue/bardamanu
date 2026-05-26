"use client"

import { useEffect, useState } from "react"

// CSS-only particles — zero JS per frame, GPU-accelerated via transform
const particles = [
  { delay: "0s",   duration: "5s",   size: 120, left: "8%",  top: "15%", color: "oklch(0.68 0.26 335 / 0.25)" },
  { delay: "1.2s", duration: "6s",   size: 160, left: "78%", top: "8%",  color: "oklch(0.52 0.22 285 / 0.22)" },
  { delay: "2s",   duration: "7s",   size: 90,  left: "18%", top: "55%", color: "oklch(0.68 0.26 335 / 0.18)" },
  { delay: "0.5s", duration: "5.5s", size: 130, left: "68%", top: "65%", color: "oklch(0.52 0.22 285 / 0.2)"  },
  { delay: "1.8s", duration: "6.5s", size: 80,  left: "48%", top: "38%", color: "oklch(0.83 0.16 88 / 0.12)"  },
]

const sparkles = [
  { left: "22%", top: "30%", delay: "0s"   },
  { left: "75%", top: "22%", delay: "0.8s" },
  { left: "60%", top: "55%", delay: "1.6s" },
  { left: "35%", top: "70%", delay: "2.4s" },
]

export function FloatingParticles() {
  const [mounted, setMounted] = useState(false)
  useEffect(() => { setMounted(true) }, [])
  if (!mounted) return null

  return (
    <>
      <style>{`
        @keyframes float-particle {
          0%, 100% { transform: translateY(0) translateX(0); opacity: 0.3; }
          50%       { transform: translateY(-30px) translateX(8px); opacity: 0.6; }
        }
        @keyframes sparkle {
          0%, 100% { opacity: 0; transform: scale(0.5); }
          50%       { opacity: 0.9; transform: scale(1.2); }
        }
        .fp { animation: float-particle var(--dur) var(--delay) ease-in-out infinite; will-change: transform; }
        .sp { animation: sparkle 2.5s var(--delay) ease-in-out infinite; will-change: opacity; }
      `}</style>
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0" aria-hidden="true">
        {particles.map((p, i) => (
          <div
            key={i}
            className="fp absolute rounded-full"
            style={{
              width: p.size, height: p.size, left: p.left, top: p.top,
              background: `radial-gradient(circle, ${p.color} 0%, transparent 70%)`,
              filter: "blur(1px)",
              ["--dur" as string]: p.duration,
              ["--delay" as string]: p.delay,
            }}
          />
        ))}
        {sparkles.map((s, i) => (
          <div
            key={i}
            className="sp absolute w-1 h-1 rounded-full"
            style={{
              left: s.left, top: s.top,
              background: "oklch(0.83 0.16 88 / 0.8)",
              ["--delay" as string]: s.delay,
            }}
          />
        ))}
      </div>
    </>
  )
}

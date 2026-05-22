"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"

interface ParticleProps {
  delay: number
  duration: number
  size: number
  left: string
  top: string
  color: string
}

function FloatingParticle({ delay, duration, size, left, top, color }: ParticleProps) {
  return (
    <motion.div
      className="absolute rounded-full pointer-events-none"
      style={{
        width: size,
        height: size,
        left,
        top,
        background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
        filter: "blur(1px)",
      }}
      animate={{
        y: [0, -40, 0],
        x: [0, 10, 0],
        opacity: [0.2, 0.7, 0.2],
        scale: [1, 1.15, 1],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  )
}

// Tiny sparkle dots for depth
function Sparkle({ left, top, delay }: { left: string; top: string; delay: number }) {
  return (
    <motion.div
      className="absolute w-1 h-1 rounded-full pointer-events-none"
      style={{ left, top, background: "oklch(0.83 0.16 88 / 0.8)" }}
      animate={{ opacity: [0, 1, 0], scale: [0.5, 1.2, 0.5] }}
      transition={{ duration: 2.5, delay, repeat: Infinity, ease: "easeInOut" }}
    />
  )
}

export function FloatingParticles() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const particles = [
    { delay: 0,   duration: 5,   size: 120, left: "8%",  top: "15%", color: "oklch(0.68 0.26 335 / 0.35)" },
    { delay: 1.2, duration: 6,   size: 180, left: "78%", top: "8%",  color: "oklch(0.52 0.22 285 / 0.3)"  },
    { delay: 2,   duration: 7,   size: 90,  left: "18%", top: "55%", color: "oklch(0.68 0.26 335 / 0.25)" },
    { delay: 0.5, duration: 5.5, size: 150, left: "68%", top: "65%", color: "oklch(0.52 0.22 285 / 0.28)" },
    { delay: 1.8, duration: 6.5, size: 100, left: "48%", top: "38%", color: "oklch(0.83 0.16 88 / 0.18)"  },
    { delay: 3,   duration: 4.5, size: 130, left: "28%", top: "78%", color: "oklch(0.68 0.26 335 / 0.22)" },
    { delay: 2.5, duration: 5.8, size: 80,  left: "88%", top: "45%", color: "oklch(0.52 0.22 285 / 0.2)"  },
    { delay: 0.8, duration: 6.2, size: 60,  left: "55%", top: "85%", color: "oklch(0.83 0.16 88 / 0.2)"   },
  ]

  const sparkles = [
    { left: "22%", top: "30%", delay: 0   },
    { left: "75%", top: "22%", delay: 0.8 },
    { left: "60%", top: "55%", delay: 1.6 },
    { left: "35%", top: "70%", delay: 2.4 },
    { left: "85%", top: "78%", delay: 0.4 },
    { left: "12%", top: "88%", delay: 1.2 },
  ]

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0" aria-hidden="true">
      {particles.map((p, i) => (
        <FloatingParticle key={i} {...p} />
      ))}
      {sparkles.map((s, i) => (
        <Sparkle key={i} {...s} />
      ))}
    </div>
  )
}

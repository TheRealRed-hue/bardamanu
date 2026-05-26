"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { ChevronDown, MapPin, CalendarDays } from "lucide-react"
import Link from "next/link"
import { useRef } from "react"

export function HeroSection() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] })

  // Parallax: image moves slower than scroll
  const bgY   = useTransform(scrollYProgress, [0, 1], ["0%",   "30%"])
  const textY = useTransform(scrollYProgress, [0, 1], ["0%",   "18%"])
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0])

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      aria-label="Seção principal"
    >
      {/* Parallax background */}
      <motion.div
        className="absolute inset-0 z-0"
        style={{ y: bgY, willChange: "transform" }}
      >
        <div
          className="absolute inset-[-10%] bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1566417713940-fe7c737a9ef2?q=80&w=2029&auto=format&fit=crop')`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/95 via-background/55 to-background" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/60 via-transparent to-background/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-neon-purple/15 via-transparent to-neon-pink/10" />
      </motion.div>

      {/* Atmospheric orbs — CSS-only, GPU-composited */}
      <style>{`
        @keyframes orb-pulse-1 { 0%,100%{opacity:.4;transform:scale(1)} 50%{opacity:.65;transform:scale(1.12)} }
        @keyframes orb-pulse-2 { 0%,100%{opacity:.5;transform:scale(1.12)} 50%{opacity:.3;transform:scale(1)} }
        @keyframes orb-pulse-3 { 0%,100%{opacity:.2;transform:scale(1)} 50%{opacity:.4;transform:scale(1.25)} }
        .orb1 { animation: orb-pulse-1 5s ease-in-out infinite; will-change: transform,opacity; }
        .orb2 { animation: orb-pulse-2 6s ease-in-out infinite; will-change: transform,opacity; }
        .orb3 { animation: orb-pulse-3 7s ease-in-out infinite; will-change: transform,opacity; }
      `}</style>
      <div className="orb1 absolute top-1/4 left-[15%] w-[500px] h-[500px] rounded-full blur-[80px] pointer-events-none"
        style={{ background: "radial-gradient(circle, oklch(0.68 0.26 335 / 0.22), transparent)" }} />
      <div className="orb2 absolute bottom-1/4 right-[10%] w-[400px] h-[400px] rounded-full blur-[70px] pointer-events-none"
        style={{ background: "radial-gradient(circle, oklch(0.52 0.22 285 / 0.22), transparent)" }} />
      <div className="orb3 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full blur-[60px] pointer-events-none"
        style={{ background: "radial-gradient(circle, oklch(0.83 0.16 88 / 0.08), transparent)" }} />

      {/* Main content — parallax wrapper */}
      <motion.div
        style={{ y: textY, opacity, willChange: "transform,opacity" }}
        className="relative z-10 container mx-auto px-5 sm:px-6 text-center"
      >
        {/* Eyebrow label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0  }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mb-6"
        >
          <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full glassmorphism text-sm text-glow-gold font-medium tracking-widest uppercase" style={{ color: "oklch(0.83 0.16 88)" }}>
            <span className="w-1.5 h-1.5 rounded-full bg-yellow-400 animate-pulse" />
            Premium Nightlife Experience
          </span>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0  }}
          transition={{ duration: 0.85, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="font-display text-[clamp(3.5rem,12vw,9rem)] font-bold tracking-tight leading-none mb-4"
        >
          <span className="text-glow-pink bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
            BAR DA MANU
          </span>
        </motion.h1>

        {/* Divider line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.7, delay: 0.65 }}
          className="section-divider max-w-sm mx-auto mb-7"
        />

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0  }}
          transition={{ duration: 0.7, delay: 0.7 }}
          className="text-base sm:text-lg md:text-xl text-foreground/65 max-w-xl mx-auto mb-10 leading-relaxed"
        >
          Funcionando em mais um ambiente para melhor atender você com novos horários.
          Venha viver experiências inesquecíveis.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0  }}
          transition={{ duration: 0.7, delay: 0.85 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link
            href="#localizacoes"
            className="group w-full sm:w-auto flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-full glassmorphism gradient-border hover:box-glow-purple transition-all duration-300 font-medium focus-visible:ring-2 focus-visible:ring-secondary/60"
          >
            <MapPin size={18} className="text-secondary shrink-0" aria-hidden="true" />
            <span>Ver Localizações</span>
          </Link>
          <Link
            href="#reservar"
            className="group w-full sm:w-auto flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-full bg-primary text-primary-foreground font-semibold hover:box-glow-pink transition-all duration-300 focus-visible:ring-2 focus-visible:ring-primary/60"
          >
            <CalendarDays size={18} aria-hidden="true" />
            <span>Reservar Mesa</span>
          </Link>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        aria-hidden="true"
      >
        <Link href="#sobre">
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            className="flex flex-col items-center gap-1.5 text-foreground/40 hover:text-foreground/70 transition-colors"
          >
            <span className="text-[10px] tracking-[0.3em] uppercase">Rolar</span>
            <ChevronDown size={18} />
          </motion.div>
        </Link>
      </motion.div>
    </section>
  )
}

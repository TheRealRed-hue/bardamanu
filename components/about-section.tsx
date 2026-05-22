"use client"

import { motion } from "framer-motion"
import { Music, Wine, Users, Sparkles } from "lucide-react"

const features = [
  {
    icon: Wine,
    title: "Drinks Exclusivos",
    description: "Carta de drinks autorais e clássicos preparados por bartenders experientes.",
    color: "text-primary",
    bg: "bg-primary/15",
    glow: "hover:box-glow-pink",
  },
  {
    icon: Music,
    title: "Música de Qualidade",
    description: "DJs renomados e música ao vivo para animar sua noite.",
    color: "text-secondary",
    bg: "bg-secondary/15",
    glow: "hover:box-glow-purple",
  },
  {
    icon: Users,
    title: "Ambiente Social",
    description: "O lugar perfeito para encontros, comemorações e momentos especiais.",
    color: "text-accent",
    bg: "bg-accent/15",
    glow: "hover:box-glow-gold",
  },
  {
    icon: Sparkles,
    title: "Experiência Premium",
    description: "Atendimento VIP e ambientes exclusivos para uma noite inesquecível.",
    color: "text-primary",
    bg: "bg-primary/15",
    glow: "hover:box-glow-pink",
  },
]

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
}

const item = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
}

export function AboutSection() {
  return (
    <section id="sobre" className="relative py-24 md:py-36 overflow-hidden">
      {/* Background orb */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full blur-[100px] pointer-events-none"
        style={{ background: "radial-gradient(circle, oklch(0.52 0.22 285 / 0.12), transparent)" }}
        aria-hidden="true"
      />

      <div className="container mx-auto px-5 sm:px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.65 }}
          className="text-center mb-16 md:mb-20"
        >
          <span className="inline-block px-4 py-1.5 rounded-full glassmorphism text-sm text-accent font-medium tracking-widest uppercase mb-5">
            Sobre Nós
          </span>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            <span className="text-glow-pink">Uma experiência</span>{" "}
            <span className="text-accent">única</span>
          </h2>
          <p className="text-foreground/65 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            O Bar da Manu é mais do que um bar. É um destino para quem busca
            diversão, bons drinks e momentos memoráveis com amigos.
          </p>
        </motion.div>

        {/* Feature cards */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
        >
          {features.map((f) => (
            <motion.div
              key={f.title}
              variants={item}
              className={`group relative p-7 rounded-2xl glassmorphism gradient-border ${f.glow} transition-all duration-500 cursor-default`}
            >
              {/* Icon */}
              <div
                className={`w-14 h-14 rounded-xl ${f.bg} flex items-center justify-center mb-5 transition-all duration-300 group-hover:scale-110`}
                aria-hidden="true"
              >
                <f.icon className={`w-7 h-7 ${f.color}`} />
              </div>

              <h3 className="text-lg font-bold text-foreground mb-3 leading-snug">
                {f.title}
              </h3>
              <p className="text-foreground/55 text-sm leading-relaxed">
                {f.description}
              </p>

              {/* Subtle corner accent */}
              <div
                className={`absolute top-4 right-4 w-2 h-2 rounded-full ${f.bg} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                aria-hidden="true"
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

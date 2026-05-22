"use client"

import { motion } from "framer-motion"
import { MapPin, Clock, Navigation, ExternalLink } from "lucide-react"

const locations = [
  {
    id: 1,
    name: "Novo Juazeiro",
    address: "Avenida Castelo Branco, 4330",
    neighborhood: "Novo Juazeiro",
    hours: "Segunda a Sábado",
    time: "20:00 às 04:00",
    mapUrl: "https://maps.google.com/?q=Avenida+Castelo+Branco+4330+Novo+Juazeiro",
    accentColor: "primary" as const,
  },
  {
    id: 2,
    name: "Betolândia",
    address: "Rua Manoel Piraca de Souza, 10",
    neighborhood: "Betolândia",
    hours: "Terça a Domingo",
    time: "16:00 às 01:00",
    mapUrl: "https://maps.google.com/?q=Rua+Manoel+Piraca+de+Souza+10+Betolandia",
    accentColor: "accent" as const,
  },
]

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.18 } },
}

const card = {
  hidden: { opacity: 0, y: 36 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
}

const glowMap = {
  primary: "hover:box-glow-pink",
  accent:  "hover:box-glow-gold",
}

const colorMap = {
  primary: { text: "text-primary", bg: "bg-primary/15", btn: "text-primary hover:bg-primary hover:text-primary-foreground" },
  accent:  { text: "text-accent",  bg: "bg-accent/15",  btn: "text-accent  hover:bg-accent  hover:text-accent-foreground"  },
}

export function LocationsSection() {
  return (
    <section id="localizacoes" className="relative py-24 md:py-36 overflow-hidden">
      {/* Background orbs */}
      <div
        className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full blur-[90px] pointer-events-none"
        style={{ background: "radial-gradient(circle, oklch(0.68 0.26 335 / 0.08), transparent)" }}
        aria-hidden="true"
      />
      <div
        className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full blur-[80px] pointer-events-none"
        style={{ background: "radial-gradient(circle, oklch(0.83 0.16 88 / 0.08), transparent)" }}
        aria-hidden="true"
      />

      <div className="container mx-auto px-5 sm:px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.65 }}
          className="text-center mb-14 md:mb-18"
        >
          <span className="inline-block px-4 py-1.5 rounded-full glassmorphism text-sm text-accent font-medium tracking-widest uppercase mb-5">
            Onde Estamos
          </span>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            <span className="text-glow-pink">Nossas</span>{" "}
            <span className="text-accent">Localizações</span>
          </h2>
          <p className="text-foreground/65 text-base sm:text-lg max-w-2xl mx-auto">
            Dois ambientes únicos pensados para sua diversão. Escolha o mais próximo e venha nos visitar.
          </p>
        </motion.div>

        {/* Cards */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-7 max-w-4xl mx-auto"
        >
          {locations.map((loc) => {
            const c = colorMap[loc.accentColor]
            const glow = glowMap[loc.accentColor]

            return (
              <motion.div
                key={loc.id}
                variants={card}
                className={`group relative rounded-3xl glassmorphism gradient-border p-8 ${glow} transition-all duration-500`}
              >
                {/* Unit badge */}
                <div className="absolute -top-3.5 left-7">
                  <span className={`px-4 py-1.5 rounded-full text-sm font-semibold ${c.bg} ${c.text} border border-current/20`}>
                    Unidade {loc.id}
                  </span>
                </div>

                <div className="mt-3">
                  <h3 className="text-2xl sm:text-3xl font-bold text-foreground mb-7 font-display">
                    {loc.name}
                  </h3>

                  <div className="space-y-4 mb-8">
                    {/* Address */}
                    <div className="flex items-start gap-4">
                      <div className={`w-10 h-10 rounded-xl ${c.bg} flex items-center justify-center shrink-0`}>
                        <MapPin className={`w-5 h-5 ${c.text}`} aria-hidden="true" />
                      </div>
                      <div>
                        <p className="text-foreground font-medium leading-snug">{loc.address}</p>
                        <p className="text-foreground/50 text-sm mt-0.5">{loc.neighborhood}</p>
                      </div>
                    </div>

                    {/* Hours */}
                    <div className="flex items-start gap-4">
                      <div className={`w-10 h-10 rounded-xl ${c.bg} flex items-center justify-center shrink-0`}>
                        <Clock className={`w-5 h-5 ${c.text}`} aria-hidden="true" />
                      </div>
                      <div>
                        <p className="text-foreground font-medium leading-snug">{loc.hours}</p>
                        <p className="text-foreground/50 text-sm mt-0.5">{loc.time}</p>
                      </div>
                    </div>
                  </div>

                  {/* Map link */}
                  <a
                    href={loc.mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex items-center gap-2 px-6 py-3 rounded-full border border-current/20 ${c.btn} transition-all duration-300 font-medium text-sm group/link`}
                    aria-label={`Abrir localização ${loc.name} no Google Maps`}
                  >
                    <Navigation className="w-4 h-4" aria-hidden="true" />
                    <span>Ver no Google Maps</span>
                    <ExternalLink className="w-3.5 h-3.5 opacity-0 -translate-x-1 group-hover/link:opacity-100 group-hover/link:translate-x-0 transition-all duration-200" aria-hidden="true" />
                  </a>
                </div>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}

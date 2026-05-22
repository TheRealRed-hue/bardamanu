"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { useState } from "react"

const drinks = [
  {
    id: 1,
    name: "Neon Nights",
    description: "Vodka, licor de Blue Curaçao, suco de limão e energético",
    image: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=800&auto=format&fit=crop",
    category: "Especial da Casa",
    tag: "Casa",
  },
  {
    id: 2,
    name: "Tropical Sunset",
    description: "Rum, suco de maracujá, grenadine e espuma de coco",
    image: "https://images.unsplash.com/photo-1536935338788-846bb9981813?q=80&w=800&auto=format&fit=crop",
    category: "Tropical",
    tag: "Tropical",
  },
  {
    id: 3,
    name: "Purple Rain",
    description: "Gin, xarope de lavanda, limão siciliano e tônica",
    image: "https://images.unsplash.com/photo-1551538827-9c037cb4f32a?q=80&w=800&auto=format&fit=crop",
    category: "Premium",
    tag: "Premium",
  },
  {
    id: 4,
    name: "Golden Hour",
    description: "Whisky, mel, limão e um toque de canela",
    image: "https://images.unsplash.com/photo-1470337458703-46ad1756a187?q=80&w=800&auto=format&fit=crop",
    category: "Clássico",
    tag: "Clássico",
  },
  {
    id: 5,
    name: "Midnight Rose",
    description: "Espumante rosé, licor de rosas, morango e hortelã",
    image: "https://images.unsplash.com/photo-1582056615449-b74b5e461c03?q=80&w=800&auto=format&fit=crop",
    category: "Especial da Casa",
    tag: "Casa",
  },
  {
    id: 6,
    name: "Electric Mojito",
    description: "Rum, hortelã fresca, limão, açúcar e um toque neon",
    image: "https://images.unsplash.com/photo-1546171753-97d7676e4602?q=80&w=800&auto=format&fit=crop",
    category: "Tropical",
    tag: "Tropical",
  },
]

const categories = ["Todos", "Casa", "Tropical", "Premium", "Clássico"]

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
}

const card = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
}

export function DrinksSection() {
  const [activeFilter, setActiveFilter] = useState("Todos")

  const filtered = activeFilter === "Todos"
    ? drinks
    : drinks.filter(d => d.tag === activeFilter)

  return (
    <section id="drinks" className="relative py-24 md:py-36 overflow-hidden">
      {/* Background orb */}
      <div
        className="absolute top-1/3 left-0 w-[600px] h-[600px] rounded-full blur-[90px] pointer-events-none"
        style={{ background: "radial-gradient(circle, oklch(0.58 0.18 255 / 0.12), transparent)" }}
        aria-hidden="true"
      />

      <div className="container mx-auto px-5 sm:px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.65 }}
          className="text-center mb-10 md:mb-14"
        >
          <span className="inline-block px-4 py-1.5 rounded-full glassmorphism text-sm text-accent font-medium tracking-widest uppercase mb-5">
            Carta de Drinks
          </span>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            <span className="text-glow-pink">Drinks</span>{" "}
            <span className="text-accent">Exclusivos</span>
          </h2>
          <p className="text-foreground/65 text-base sm:text-lg max-w-2xl mx-auto">
            Criações únicas dos nossos bartenders para tornar sua noite ainda mais especial.
          </p>
        </motion.div>

        {/* Filter pills */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex flex-wrap items-center justify-center gap-2 mb-10"
          role="group"
          aria-label="Filtrar drinks por categoria"
        >
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-300 ${
                activeFilter === cat
                  ? "bg-primary text-primary-foreground box-glow-pink"
                  : "glassmorphism text-foreground/60 hover:text-foreground"
              }`}
              aria-pressed={activeFilter === cat}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Cards grid */}
        <motion.div
          key={activeFilter}
          variants={container}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filtered.map((drink) => (
            <motion.article
              key={drink.id}
              variants={card}
              className="group relative rounded-2xl overflow-hidden glassmorphism hover:box-glow-pink transition-all duration-500"
            >
              {/* Image */}
              <div className="aspect-[4/5] relative overflow-hidden">
                <Image
                  src={drink.image}
                  alt={drink.name}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-108"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />

                {/* Category badge */}
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 rounded-full bg-primary/80 text-primary-foreground text-xs font-semibold backdrop-blur-sm tracking-wide">
                    {drink.category}
                  </span>
                </div>
              </div>

              {/* Text */}
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <h3 className="text-lg font-bold text-foreground mb-1.5 group-hover:text-primary transition-colors duration-300">
                  {drink.name}
                </h3>
                <p className="text-foreground/55 text-sm leading-relaxed">
                  {drink.description}
                </p>
              </div>

              {/* Hover radial glow */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{ background: "radial-gradient(circle at center, oklch(0.68 0.26 335 / 0.08), transparent 70%)" }}
                aria-hidden="true"
              />
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

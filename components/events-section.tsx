"use client"

import { motion } from "framer-motion"
import { Calendar, Clock, Music, ArrowRight } from "lucide-react"
import Image from "next/image"

const events = [
  {
    id: 1,
    title: "Noite do DJ Alex",
    date: "Sexta, 24 Jan",
    time: "22:00h",
    description: "Uma noite de house e eletrônica com DJ Alex comandando as pickups.",
    image: "https://images.unsplash.com/photo-1571266028243-3c67e8c78e41?q=80&w=800&auto=format&fit=crop",
    featured: true,
    genre: "House / Eletrônica",
  },
  {
    id: 2,
    title: "Pagode ao Vivo",
    date: "Sábado, 25 Jan",
    time: "20:00h",
    description: "O melhor do pagode com banda ao vivo e muito samba no pé.",
    image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?q=80&w=800&auto=format&fit=crop",
    featured: false,
    genre: "Pagode",
  },
  {
    id: 3,
    title: "Ladies Night",
    date: "Quinta, 30 Jan",
    time: "21:00h",
    description: "Drinks em dobro para elas até meia-noite. Venha com as amigas!",
    image: "https://images.unsplash.com/photo-1545224144-b38cd309ef69?q=80&w=800&auto=format&fit=crop",
    featured: false,
    genre: "Especial",
  },
  {
    id: 4,
    title: "Trap Night",
    date: "Sexta, 31 Jan",
    time: "23:00h",
    description: "Os melhores beats de trap e hip-hop com DJs convidados.",
    image: "https://images.unsplash.com/photo-1598387993281-cecf8b71a8f8?q=80&w=800&auto=format&fit=crop",
    featured: true,
    genre: "Trap / Hip-Hop",
  },
]

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
}

const card = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
}

export function EventsSection() {
  return (
    <section id="eventos" className="relative py-24 md:py-36 overflow-hidden">
      {/* Background orb */}
      <div
        className="absolute top-1/4 right-0 w-[500px] h-[500px] rounded-full blur-[80px] pointer-events-none"
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
            Agenda
          </span>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            <span className="text-glow-pink">Próximos</span>{" "}
            <span className="text-accent">Eventos</span>
          </h2>
          <p className="text-foreground/65 text-base sm:text-lg max-w-2xl mx-auto">
            Confira nossa programação e não perca nenhuma festa especial.
          </p>
        </motion.div>

        {/* Cards */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-5xl mx-auto"
        >
          {events.map((event) => (
            <motion.article
              key={event.id}
              variants={card}
              className="group relative rounded-2xl overflow-hidden glassmorphism hover:box-glow-purple transition-all duration-500"
            >
              <div className="flex flex-col sm:flex-row h-full">
                {/* Image */}
                <div className="relative w-full sm:w-44 shrink-0 aspect-video sm:aspect-auto overflow-hidden">
                  <Image
                    src={event.image}
                    alt={event.title}
                    fill
                    sizes="(max-width: 640px) 100vw, 176px"
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t sm:bg-gradient-to-r from-background/70 via-transparent to-transparent" />

                  {event.featured && (
                    <div className="absolute top-3 left-3">
                      <span className="px-2.5 py-1 rounded-full bg-accent text-accent-foreground text-xs font-bold tracking-wide">
                        Destaque
                      </span>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 p-5 flex flex-col justify-between">
                  <div>
                    {/* Meta */}
                    <div className="flex items-center flex-wrap gap-3 mb-3">
                      <div className="flex items-center gap-1.5 text-primary text-xs font-medium">
                        <Calendar className="w-3.5 h-3.5" aria-hidden="true" />
                        <span>{event.date}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-foreground/50 text-xs">
                        <Clock className="w-3.5 h-3.5" aria-hidden="true" />
                        <span>{event.time}</span>
                      </div>
                      <span className="px-2 py-0.5 rounded-full bg-secondary/20 text-secondary text-xs">
                        {event.genre}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors duration-300">
                      {event.title}
                    </h3>
                    <p className="text-foreground/55 text-sm leading-relaxed">
                      {event.description}
                    </p>
                  </div>

                  <button
                    className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:text-accent transition-colors group/btn"
                    aria-label={`Ver detalhes de ${event.title}`}
                  >
                    <Music className="w-3.5 h-3.5" aria-hidden="true" />
                    <span>Ver detalhes</span>
                    <ArrowRight className="w-3.5 h-3.5 -translate-x-1 opacity-0 group-hover/btn:translate-x-0 group-hover/btn:opacity-100 transition-all duration-200" aria-hidden="true" />
                  </button>
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

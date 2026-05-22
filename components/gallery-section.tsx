"use client"

import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { useState, useCallback, useEffect } from "react"
import { X, ChevronLeft, ChevronRight, ZoomIn } from "lucide-react"

const galleryImages = [
  {
    id: 1,
    src: "https://images.unsplash.com/photo-1566417713940-fe7c737a9ef2?q=80&w=1200&auto=format&fit=crop",
    alt: "Ambiente do bar com iluminação neon",
    span: "col-span-2 row-span-2",
    mobileSpan: "col-span-2 row-span-2",
  },
  {
    id: 2,
    src: "https://images.unsplash.com/photo-1575444758702-4a6b9222336e?q=80&w=800&auto=format&fit=crop",
    alt: "Drinks coloridos no balcão",
    span: "col-span-1 row-span-1",
    mobileSpan: "col-span-1 row-span-1",
  },
  {
    id: 3,
    src: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=800&auto=format&fit=crop",
    alt: "Pista de dança lotada",
    span: "col-span-1 row-span-1",
    mobileSpan: "col-span-1 row-span-1",
  },
  {
    id: 4,
    src: "https://images.unsplash.com/photo-1571266028243-3c67e8c78e41?q=80&w=800&auto=format&fit=crop",
    alt: "DJ tocando na festa",
    span: "col-span-1 row-span-2",
    mobileSpan: "col-span-1 row-span-1",
  },
  {
    id: 5,
    src: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=800&auto=format&fit=crop",
    alt: "Show ao vivo",
    span: "col-span-1 row-span-1",
    mobileSpan: "col-span-1 row-span-1",
  },
  {
    id: 6,
    src: "https://images.unsplash.com/photo-1572116469696-31de0f17cc34?q=80&w=800&auto=format&fit=crop",
    alt: "Bartender preparando drink",
    span: "col-span-1 row-span-1",
    mobileSpan: "col-span-1 row-span-1",
  },
  {
    id: 7,
    src: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=1200&auto=format&fit=crop",
    alt: "Vista panorâmica da festa",
    span: "col-span-2 row-span-1",
    mobileSpan: "col-span-2 row-span-1",
  },
]

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07 } },
}

const imgVariant = {
  hidden: { opacity: 0, scale: 0.93 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
}

export function GallerySection() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)

  const goNext = useCallback(() => {
    if (selectedIndex === null) return
    setSelectedIndex((selectedIndex + 1) % galleryImages.length)
  }, [selectedIndex])

  const goPrev = useCallback(() => {
    if (selectedIndex === null) return
    setSelectedIndex((selectedIndex - 1 + galleryImages.length) % galleryImages.length)
  }, [selectedIndex])

  const close = () => setSelectedIndex(null)

  // Keyboard navigation in lightbox
  useEffect(() => {
    if (selectedIndex === null) return
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape")     close()
      if (e.key === "ArrowRight") goNext()
      if (e.key === "ArrowLeft")  goPrev()
    }
    window.addEventListener("keydown", handler)
    return () => window.removeEventListener("keydown", handler)
  }, [selectedIndex, goNext, goPrev])

  const selectedImage = selectedIndex !== null ? galleryImages[selectedIndex] : null

  return (
    <section id="galeria" className="relative py-24 md:py-36 overflow-hidden">
      {/* Background orb */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full blur-[100px] pointer-events-none"
        style={{ background: "radial-gradient(circle, oklch(0.68 0.26 335 / 0.06), transparent)" }}
        aria-hidden="true"
      />

      <div className="container mx-auto px-5 sm:px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.65 }}
          className="text-center mb-14"
        >
          <span className="inline-block px-4 py-1.5 rounded-full glassmorphism text-sm text-accent font-medium tracking-widest uppercase mb-5">
            Galeria
          </span>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            <span className="text-glow-pink">Momentos</span>{" "}
            <span className="text-accent">Inesquecíveis</span>
          </h2>
          <p className="text-foreground/65 text-base sm:text-lg max-w-2xl mx-auto">
            Confira alguns registros das melhores noites no Bar da Manu.
          </p>
        </motion.div>

        {/* Masonry grid */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-2 md:grid-cols-4 gap-3 auto-rows-[160px] md:auto-rows-[190px]"
        >
          {galleryImages.map((image, idx) => (
            <motion.button
              key={image.id}
              variants={imgVariant}
              onClick={() => setSelectedIndex(idx)}
              className={`group relative rounded-xl md:rounded-2xl overflow-hidden ${image.span} cursor-pointer focus-visible:ring-2 focus-visible:ring-primary/60`}
              aria-label={`Abrir imagem: ${image.alt}`}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes="(max-width: 768px) 50vw, 25vw"
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-background/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <ZoomIn className="w-7 h-7 text-white drop-shadow-lg" aria-hidden="true" />
              </div>
              <div className="absolute inset-0 border border-primary/0 group-hover:border-primary/40 rounded-xl md:rounded-2xl transition-colors duration-300" />
            </motion.button>
          ))}
        </motion.div>
      </div>

      {/* ─── Lightbox ──────────────────────────────────── */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            key="lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{  opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-background/97 backdrop-blur-2xl"
            onClick={close}
            role="dialog"
            aria-modal="true"
            aria-label={`Lightbox: ${selectedImage.alt}`}
          >
            {/* Close */}
            <button
              onClick={close}
              className="absolute top-5 right-5 p-2.5 rounded-full glassmorphism hover:bg-primary/20 transition-colors z-10"
              aria-label="Fechar lightbox"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Prev */}
            <button
              onClick={(e) => { e.stopPropagation(); goPrev() }}
              className="absolute left-4 sm:left-8 p-3 rounded-full glassmorphism hover:bg-primary/20 transition-colors z-10"
              aria-label="Imagem anterior"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Image */}
            <motion.div
              key={selectedIndex}
              initial={{ scale: 0.93, opacity: 0 }}
              animate={{ scale: 1,    opacity: 1 }}
              exit={{   scale: 0.93,  opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-full max-w-5xl max-h-[80vh] aspect-video mx-14 sm:mx-20 rounded-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={selectedImage.src}
                alt={selectedImage.alt}
                fill
                className="object-contain"
                priority
              />
            </motion.div>

            {/* Next */}
            <button
              onClick={(e) => { e.stopPropagation(); goNext() }}
              className="absolute right-4 sm:right-8 p-3 rounded-full glassmorphism hover:bg-primary/20 transition-colors z-10"
              aria-label="Próxima imagem"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            {/* Counter */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2">
              {galleryImages.map((_, i) => (
                <button
                  key={i}
                  onClick={(e) => { e.stopPropagation(); setSelectedIndex(i) }}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    i === selectedIndex ? "w-6 bg-primary" : "w-1.5 bg-foreground/30"
                  }`}
                  aria-label={`Imagem ${i + 1}`}
                />
              ))}
            </div>

            {/* Caption */}
            <p className="absolute bottom-14 left-1/2 -translate-x-1/2 text-sm text-foreground/50 whitespace-nowrap">
              {selectedImage.alt}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

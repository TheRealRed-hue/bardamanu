"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"

const navLinks = [
  { href: "#sobre",       label: "Sobre"       },
  { href: "#localizacoes",label: "Localizações" },
  { href: "#drinks",      label: "Drinks"       },
  { href: "#eventos",     label: "Eventos"      },
  { href: "#galeria",     label: "Galeria"      },
  { href: "#contato",     label: "Contato"      },
]

export function Header() {
  const [isScrolled,        setIsScrolled]        = useState(false)
  const [isMobileMenuOpen,  setIsMobileMenuOpen]  = useState(false)
  const [activeSection,     setActiveSection]     = useState("")

  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 60)

      // Highlight active nav link
      const sections = navLinks.map(l => l.href.slice(1))
      for (const id of sections.reverse()) {
        const el = document.getElementById(id)
        if (el && window.scrollY >= el.offsetTop - 120) {
          setActiveSection(id)
          break
        }
      }
    }
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : ""
    return () => { document.body.style.overflow = "" }
  }, [isMobileMenuOpen])

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0,   opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "glassmorphism py-3 shadow-lg shadow-black/30"
          : "bg-transparent py-6"
      }`}
    >
      <div className="container mx-auto px-5 sm:px-6 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="relative z-10 group" aria-label="Bar da Manu — Página inicial">
          <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
            <span className="text-xl sm:text-2xl font-bold tracking-widest text-glow-pink font-display">
              BAR DA MANU
            </span>
          </motion.div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-7" aria-label="Navegação principal">
          {navLinks.map((link) => {
            const id = link.href.slice(1)
            const isActive = activeSection === id
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors relative group ${
                  isActive ? "text-primary" : "text-foreground/75 hover:text-foreground"
                }`}
              >
                {link.label}
                <span
                  className={`absolute -bottom-1 left-0 h-px bg-primary transition-all duration-300 ${
                    isActive ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                />
              </Link>
            )
          })}
          <Link
            href="#reservar"
            className="px-5 py-2 rounded-full bg-primary text-primary-foreground font-semibold text-sm hover:box-glow-pink transition-all duration-300 focus-visible:ring-2 focus-visible:ring-primary/60"
          >
            Reservar Mesa
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden relative z-[60] p-2 rounded-lg glassmorphism"
          aria-label={isMobileMenuOpen ? "Fechar menu" : "Abrir menu"}
          aria-expanded={isMobileMenuOpen}
          aria-controls="mobile-menu"
        >
          <motion.div
            animate={{ rotate: isMobileMenuOpen ? 90 : 0 }}
            transition={{ duration: 0.25 }}
          >
            {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </motion.div>
        </button>
      </div>

      {/* Mobile Navigation — full-screen overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            id="mobile-menu"
            key="mobile-menu"
            initial={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
            animate={{ opacity: 1, clipPath: "inset(0 0 0% 0)"   }}
            exit={{    opacity: 0, clipPath: "inset(0 0 100% 0)"  }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="md:hidden fixed inset-0 z-50 bg-background/98 backdrop-blur-2xl flex flex-col"
            aria-label="Menu mobile"
          >
            <div className="flex flex-col justify-center flex-1 px-8 gap-2">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0  }}
                  transition={{ delay: 0.05 * i + 0.1 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block py-4 text-2xl font-bold text-foreground/80 hover:text-primary transition-colors tracking-wide"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0  }}
                transition={{ delay: 0.4 }}
                className="mt-6"
              >
                <Link
                  href="#reservar"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-8 py-4 rounded-full bg-primary text-primary-foreground font-bold text-center text-lg hover:box-glow-pink transition-all duration-300"
                >
                  Reservar Mesa
                </Link>
              </motion.div>
            </div>

            {/* Bottom brand decoration */}
            <div className="pb-10 px-8 text-center">
              <span className="text-foreground/20 text-sm tracking-widest uppercase">
                Bar da Manu — Premium Nightlife
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}

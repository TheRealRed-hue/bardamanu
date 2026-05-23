"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Instagram, Facebook, Music2, Heart, ArrowUp } from "lucide-react"

const socialLinks = [
  { icon: Instagram, href: "https://instagram.com/bar.damanu",  label: "Instagram" },
  { icon: Music2,    href: "https://tiktok.com/@bar.damanu",    label: "TikTok"    },
]

const footerLinks = [
  { href: "#sobre",        label: "Sobre"        },
  { href: "#localizacoes", label: "Localizações" },
  { href: "#drinks",       label: "Drinks"       },
  { href: "#eventos",      label: "Eventos"      },
  { href: "#galeria",      label: "Galeria"      },
  { href: "#contato",      label: "Contato"      },
]

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative pt-16 pb-8 overflow-hidden" role="contentinfo">
      {/* Top glow line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" aria-hidden="true" />

      {/* Background orb */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] rounded-full blur-[90px] pointer-events-none"
        style={{ background: "radial-gradient(circle, oklch(0.68 0.26 335 / 0.06), transparent)" }}
        aria-hidden="true"
      />

      <div className="container mx-auto px-5 sm:px-6 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 mb-14">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
          >
            <Link href="/" className="inline-block mb-4" aria-label="Bar da Manu — Topo da página">
              <span className="text-2xl font-bold tracking-widest text-glow-pink font-display">
                BAR DA MANU
              </span>
            </Link>
            <p className="text-foreground/50 leading-relaxed text-sm mb-6 max-w-xs">
              A melhor experiência noturna da região. Drinks exclusivos,
              música de qualidade e momentos inesquecíveis.
            </p>
            <div className="flex items-center gap-2.5" aria-label="Redes sociais">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="w-9 h-9 rounded-full glassmorphism flex items-center justify-center hover:box-glow-pink transition-all duration-300 group"
                >
                  <social.icon className="w-4 h-4 text-foreground/55 group-hover:text-primary transition-colors" aria-hidden="true" />
                </a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.08 }}
            className="sm:text-center"
          >
            <h3 className="text-sm font-semibold text-foreground tracking-widest uppercase mb-5">
              Links Rápidos
            </h3>
            <nav aria-label="Rodapé — links rápidos">
              <ul className="space-y-2.5">
                {footerLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-foreground/50 hover:text-primary transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </motion.div>

          {/* Hours */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.16 }}
            className="sm:text-right"
          >
            <h3 className="text-sm font-semibold text-foreground tracking-widest uppercase mb-5">
              Horários
            </h3>
            <div className="space-y-4">
              <div>
                <p className="text-foreground font-medium text-sm">Novo Juazeiro</p>
                <p className="text-foreground/50 text-xs mt-0.5">Seg a Sáb: 20h às 04h</p>
              </div>
              <div>
                <p className="text-foreground font-medium text-sm">Betolândia</p>
                <p className="text-foreground/50 text-xs mt-0.5">Ter a Dom: 16h às 01h</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom */}
        <div className="pt-6 border-t border-border/20 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-foreground/35 text-xs">
            &copy; {currentYear} Bar da Manu. Todos os direitos reservados pela Equipe KZR Studios.
          </p>
          <p className="text-foreground/35 text-xs flex items-center gap-1">
            Feito com <Heart className="w-3.5 h-3.5 text-primary fill-primary" aria-label="amor" /> no Brasil, pela equipe KZR.
          </p>
        </div>
      </div>

      {/* Back-to-top button */}
      <a
        href="#"
        aria-label="Voltar ao topo"
        className="fixed bottom-6 right-5 w-10 h-10 rounded-full glassmorphism flex items-center justify-center hover:box-glow-pink transition-all duration-300 z-40 group"
      >
        <ArrowUp className="w-4 h-4 text-foreground/60 group-hover:text-primary transition-colors" aria-hidden="true" />
      </a>
    </footer>
  )
}

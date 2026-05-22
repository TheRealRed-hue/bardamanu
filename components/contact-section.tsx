"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import { Send, MessageCircle, Instagram, Phone, CheckCircle2, Loader2 } from "lucide-react"

type FormData = {
  name: string
  phone: string
  date: string
  guests: string
  location: string
  message: string
}

const initialForm: FormData = {
  name: "", phone: "", date: "", guests: "", location: "", message: "",
}

export function ContactSection() {
  const [formData, setFormData]       = useState<FormData>(initialForm)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted]       = useState(false)

  const set = (key: keyof FormData) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
      setFormData(prev => ({ ...prev, [key]: e.target.value }))

  // Número do WhatsApp da Manu — troque pelo número real (só dígitos, com DDI)
  const WHATSAPP_NUMBER = "558888845985"

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    const locationLabel =
      formData.location === "novo-juazeiro" ? "Novo Juazeiro"
      : formData.location === "betolandia"  ? "Betolândia"
      : "Qualquer unidade"

    // Formata a data de yyyy-mm-dd para dd/mm/yyyy
    const dateFormatted = formData.date
      ? formData.date.split("-").reverse().join("/")
      : "A definir"

    const message = [
      "🍹 *Nova Solicitação de Reserva — Bar da Manu*",
      "",
      `👤 *Nome:* ${formData.name}`,
      `📱 *WhatsApp:* ${formData.phone}`,
      `👥 *Pessoas:* ${formData.guests}`,
      `📅 *Data:* ${dateFormatted}`,
      `📍 *Unidade:* ${locationLabel}`,
      formData.message ? `💬 *Observações:* ${formData.message}` : "",
    ]
      .filter(Boolean)
      .join("\n")

    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`

    // Pequeno delay só pra dar feedback visual do botão carregando
    setTimeout(() => {
      window.open(url, "_blank", "noopener,noreferrer")
      setIsSubmitting(false)
      setSubmitted(true)
      setFormData(initialForm)
      setTimeout(() => setSubmitted(false), 6000)
    }, 600)
  }

  const inputClass =
    "w-full px-4 py-3 rounded-xl bg-input border border-border focus:border-primary focus:ring-1 focus:ring-primary/50 outline-none transition-all text-foreground placeholder:text-foreground/35 text-sm"

  return (
    <section id="contato" className="relative py-24 md:py-36 overflow-hidden">
      {/* Background orb */}
      <div
        className="absolute top-0 left-1/4 w-[600px] h-[600px] rounded-full blur-[90px] pointer-events-none"
        style={{ background: "radial-gradient(circle, oklch(0.52 0.22 285 / 0.08), transparent)" }}
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
            Contato
          </span>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            <span className="text-glow-pink">Fale</span>{" "}
            <span className="text-accent">Conosco</span>
          </h2>
          <p className="text-foreground/65 text-base sm:text-lg max-w-2xl mx-auto">
            Reserve sua mesa ou entre em contato para mais informações.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 max-w-5xl mx-auto items-start">
          {/* ─── Left: contact info ─────────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65 }}
            className="space-y-6"
          >
            <div>
              <h3 className="text-xl font-bold text-foreground mb-3">Entre em Contato</h3>
              <p className="text-foreground/60 leading-relaxed text-sm">
                Estamos prontos para atendê-lo. Entre em contato por WhatsApp para reservas rápidas
                ou siga-nos nas redes sociais.
              </p>
            </div>

            <div className="space-y-3" aria-label="Canais de contato">
              {[
                {
                  href: "https://wa.me/5587999999999",
                  icon: MessageCircle,
                  label: "WhatsApp",
                  sub: "Resposta rápida para reservas",
                  iconBg: "bg-green-500/15",
                  iconColor: "text-green-400",
                  glow: "hover:box-glow-pink",
                },
                {
                  href: "https://instagram.com/bar.damanu",
                  icon: Instagram,
                  label: "Instagram",
                  sub: "@bar.damanu",
                  iconBg: "bg-pink-500/15",
                  iconColor: "text-pink-400",
                  glow: "hover:box-glow-purple",
                },
                {
                  href: "tel:+5587999999999",
                  icon: Phone,
                  label: "Telefone",
                  sub: "(87) 99999-9999",
                  iconBg: "bg-accent/15",
                  iconColor: "text-accent",
                  glow: "hover:box-glow-gold",
                },
              ].map(({ href, icon: Icon, label, sub, iconBg, iconColor, glow }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                  aria-label={`${label}: ${sub}`}
                  className={`flex items-center gap-4 p-4 rounded-xl glassmorphism gradient-border ${glow} transition-all duration-300 group`}
                >
                  <div className={`w-11 h-11 rounded-full ${iconBg} flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-110`}>
                    <Icon className={`w-5 h-5 ${iconColor}`} aria-hidden="true" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground text-sm">{label}</p>
                    <p className="text-foreground/50 text-xs mt-0.5">{sub}</p>
                  </div>
                </a>
              ))}
            </div>
          </motion.div>

          {/* ─── Right: reservation form ─────────────────── */}
          <motion.div
            id="reservar"
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65 }}
          >
            <div className="p-7 rounded-3xl glassmorphism gradient-border">
              <h3 className="text-xl font-bold text-foreground mb-6">Reserve sua Mesa</h3>

              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.93 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-10"
                >
                  <div className="w-16 h-16 rounded-full bg-green-500/15 flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 className="w-8 h-8 text-green-400" aria-hidden="true" />
                  </div>
                  <h4 className="text-lg font-semibold text-foreground mb-2">Solicitação Enviada!</h4>
                  <p className="text-foreground/55 text-sm leading-relaxed max-w-xs mx-auto">
                    Entraremos em contato em breve para confirmar sua reserva.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                  {/* Name */}
                  <div>
                    <label htmlFor="res-name" className="block text-sm font-medium text-foreground/75 mb-1.5">
                      Nome Completo <span aria-hidden="true" className="text-primary">*</span>
                    </label>
                    <input
                      type="text"
                      id="res-name"
                      required
                      autoComplete="name"
                      value={formData.name}
                      onChange={set("name")}
                      className={inputClass}
                      placeholder="Seu nome"
                    />
                  </div>

                  {/* Phone + Guests */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="res-phone" className="block text-sm font-medium text-foreground/75 mb-1.5">
                        WhatsApp <span aria-hidden="true" className="text-primary">*</span>
                      </label>
                      <input
                        type="tel"
                        id="res-phone"
                        required
                        autoComplete="tel"
                        value={formData.phone}
                        onChange={set("phone")}
                        className={inputClass}
                        placeholder="(00) 00000-0000"
                      />
                    </div>
                    <div>
                      <label htmlFor="res-guests" className="block text-sm font-medium text-foreground/75 mb-1.5">
                        Nº de Pessoas <span aria-hidden="true" className="text-primary">*</span>
                      </label>
                      <input
                        type="number"
                        id="res-guests"
                        required
                        min="1"
                        max="50"
                        value={formData.guests}
                        onChange={set("guests")}
                        className={inputClass}
                        placeholder="2"
                      />
                    </div>
                  </div>

                  {/* Date + Location */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="res-date" className="block text-sm font-medium text-foreground/75 mb-1.5">
                        Data Desejada <span aria-hidden="true" className="text-primary">*</span>
                      </label>
                      <input
                        type="date"
                        id="res-date"
                        required
                        value={formData.date}
                        onChange={set("date")}
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label htmlFor="res-location" className="block text-sm font-medium text-foreground/75 mb-1.5">
                        Unidade
                      </label>
                      <select
                        id="res-location"
                        value={formData.location}
                        onChange={set("location")}
                        className={`${inputClass} cursor-pointer`}
                      >
                        <option value="">Qualquer unidade</option>
                        <option value="novo-juazeiro">Novo Juazeiro</option>
                        <option value="betolandia">Betolândia</option>
                      </select>
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label htmlFor="res-message" className="block text-sm font-medium text-foreground/75 mb-1.5">
                      Observações
                    </label>
                    <textarea
                      id="res-message"
                      rows={3}
                      value={formData.message}
                      onChange={set("message")}
                      className={`${inputClass} resize-none`}
                      placeholder="Alguma preferência especial?"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 rounded-xl bg-primary text-primary-foreground font-semibold hover:box-glow-pink transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />
                        <span>Enviando…</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" aria-hidden="true" />
                        <span>Solicitar Reserva</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

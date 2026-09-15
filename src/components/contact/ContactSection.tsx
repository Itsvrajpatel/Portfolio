"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar,
  Send,
  CheckCircle2,
  Sparkles,
  ArrowUpRight,
  Clock,
  Zap,
  UserCheck,
  ChevronDown,
  Mail,
  Loader2,
  X,
} from "lucide-react";
import DinoRunner from "@/components/footer/DinoRunner";

interface FormData {
  name: string;
  email: string;
  projectType: string;
  budget: string;
  details: string;
}

const PROJECT_TYPES = [
  "Autonomous AI Agents",
  "SaaS MVP Development",
  "Full-Stack Web App",
  "Workflow Automation",
  "API Integrations & Backend",
  "UI/UX & Frontend Rebuild",
  "Other / Custom Project",
];

const BUDGET_RANGES = [
  "< $1,000",
  "$1,000 - $3,000",
  "$3,000 - $5,000",
  "$5,000 - $10,000",
  "$10,000+",
];

const GOOD_FIT_TAGS = [
  "AI agents",
  "SaaS MVPs",
  "Workflow automation",
  "API integrations",
  "Stripe/Auth fixes",
];

const mono = "var(--font-jetbrains-mono, 'JetBrains Mono', ui-monospace, monospace)";

export default function ContactSection(): JSX.Element {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  useEffect(() => {
    if (isBookingModalOpen) {
      document.body.style.overflow = "hidden";
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") setIsBookingModalOpen(false);
      };
      window.addEventListener("keydown", handleKeyDown);
      return () => {
        document.body.style.overflow = "unset";
        window.removeEventListener("keydown", handleKeyDown);
      };
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isBookingModalOpen]);

  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    projectType: "",
    budget: "",
    details: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errorMessage) setErrorMessage("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name.trim() || !formData.email.trim() || !formData.details.trim()) {
      setErrorMessage("Please fill in your name, email, and project details.");
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setErrorMessage("Please enter a valid email address.");
      return;
    }

    setIsSubmitting(true);
    setErrorMessage("");

    // Simulate sending brief
    try {
      await new Promise((resolve) => setTimeout(resolve, 1200));
      setIsSubmitted(true);
    } catch {
      setErrorMessage("Something went wrong. Please try again or email directly.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      projectType: "",
      budget: "",
      details: "",
    });
    setIsSubmitted(false);
    setErrorMessage("");
  };

  return (
    <section
      id="contact"
      className="relative w-full overflow-hidden pt-20 pb-28 lg:pt-28 lg:pb-36 bg-[#030303] text-white"
      aria-label="Contact and Project Inquiry"
    >
      {/* Blueprint Grid Background matching portfolio aesthetic */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0,255,102,0.06) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,255,102,0.06) 1px, transparent 1px)
          `,
          backgroundSize: "48px 48px",
          maskImage: "radial-gradient(ellipse 80% 60% at 50% 50%, black 20%, transparent 80%)",
        }}
        aria-hidden="true"
      />

      {/* Ambient Neon Glow Spotlights */}
      <div
        className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[#00ff66]/10 blur-[120px] rounded-full pointer-events-none z-[2]"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-10 right-10 w-[450px] h-[450px] bg-[#00e5ff]/10 blur-[130px] rounded-full pointer-events-none z-[2]"
        aria-hidden="true"
      />

      <div className="relative z-[10] max-w-[1300px] mx-auto px-6 md:px-10 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-stretch">
          
          {/* ─────────────────────────────────────────────────────────────
              LEFT COLUMN: Information, Quick Stats, Meeting booking
          ────────────────────────────────────────────────────────────── */}
          <motion.div
            className="flex flex-col justify-between h-full"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <div className="flex flex-col justify-between h-full space-y-6">
              <div>
                {/* CONTACT Badge matching SKILLS styling */}
                <div className="flex items-center gap-3 mb-5">
                  <span
                    className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-[#00ff66]/40 bg-[#00ff66]/10 text-[#00ff66] text-xs font-semibold tracking-[0.2em] uppercase shadow-[0_0_15px_rgba(0,255,102,0.2)]"
                    style={{ fontFamily: mono }}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#00ff66] shadow-[0_0_8px_#00ff66] animate-pulse" />
                    CONTACT
                  </span>
                  <span className="text-xs text-zinc-500 font-mono tracking-wider hidden sm:inline-block">
                    // LET&apos;S COLLABORATE &amp; BUILD
                  </span>
                </div>

                {/* Main Headline */}
                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[52px] font-bold tracking-tight text-white leading-[1.12] mb-6">
                  Tell me what you{" "}
                  <br className="hidden sm:inline" />
                  want to{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00ff66] to-[#00e5ff]">
                    build.
                  </span>
                </h2>

                {/* Subtitle / Pitch */}
                <p className="text-zinc-400 text-sm sm:text-base leading-relaxed max-w-lg mb-8">
                  Send the short version of your idea, bug, automation, or SaaS feature.
                  I will reply with the clearest next step, realistic timeline, and whether
                  I am the right fit.
                </p>

                {/* Book a 15-minute call button */}
                <div className="mb-8">
                  <button
                    type="button"
                    onClick={() => setIsBookingModalOpen(true)}
                    className="inline-flex items-center gap-3 px-5 py-3.5 rounded-xl border border-white/10 bg-[#0e1117]/80 hover:bg-[#00ff66]/10 hover:border-[#00ff66]/50 text-white text-sm font-medium transition-all duration-300 shadow-[0_4px_20px_rgba(0,0,0,0.5)] group hover:shadow-[0_0_25px_rgba(0,255,102,0.2)] cursor-pointer"
                  >
                    <Calendar className="w-4 h-4 text-[#00ff66] group-hover:scale-110 transition-transform" />
                    <span>Book a 15-minute call</span>
                    <ArrowUpRight className="w-4 h-4 text-zinc-400 group-hover:text-[#00ff66] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                  </button>
                </div>

                {/* Metric Stats Cards */}
                <div className="grid grid-cols-3 gap-3 sm:gap-4 mb-6">
                  {/* Stat 1 */}
                  <div className="p-4 sm:p-5 rounded-2xl bg-[#090b0e]/90 border border-white/[0.08] shadow-lg">
                    <div className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                      0-4h
                    </div>
                    <div
                      className="text-[10px] sm:text-[11px] font-mono tracking-wider text-zinc-500 uppercase mt-1"
                      style={{ fontFamily: mono }}
                    >
                      TYPICAL REPLY
                    </div>
                  </div>

                  {/* Stat 2 */}
                  <div className="p-4 sm:p-5 rounded-2xl bg-[#090b0e]/90 border border-white/[0.08] shadow-lg">
                    <div className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                      30+ hrs
                    </div>
                    <div
                      className="text-[10px] sm:text-[11px] font-mono tracking-wider text-zinc-500 uppercase mt-1"
                      style={{ fontFamily: mono }}
                    >
                      WEEKLY AVAILABILITY
                    </div>
                  </div>

                  {/* Stat 3 */}
                  <div className="p-4 sm:p-5 rounded-2xl bg-[#090b0e]/90 border border-white/[0.08] shadow-lg">
                    <div className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                      Direct
                    </div>
                    <div
                      className="text-[10px] sm:text-[11px] font-mono tracking-wider text-zinc-500 uppercase mt-1"
                      style={{ fontFamily: mono }}
                    >
                      FOUNDER-FIRST
                    </div>
                  </div>
                </div>

                {/* Good Fit For Container */}
                <div className="p-5 sm:p-6 rounded-2xl bg-[#08090c]/90 border border-white/[0.08] shadow-xl relative overflow-hidden">
                  <div className="text-sm sm:text-base font-bold text-white mb-3 tracking-tight">
                    Good fit for:
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {GOOD_FIT_TAGS.map((tag) => (
                      <span
                        key={tag}
                        className="px-3.5 py-1.5 rounded-full bg-[#12141c] border border-white/[0.09] text-xs text-zinc-300 cursor-default select-none shadow-sm"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Direct Contact / Social Pills (Single clean row matching reference) */}
                <div className="flex flex-wrap sm:flex-nowrap items-center gap-2.5 sm:gap-3 mt-5">
                  {/* Email */}
                  <a
                    href="mailto:founder@builtbyvansh.com"
                    className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-full bg-[#08090d]/90 border border-white/[0.09] hover:border-[#00ff66]/40 hover:bg-[#00ff66]/5 text-xs text-zinc-300 hover:text-white whitespace-nowrap transition-all duration-200 shadow-md"
                  >
                    <Mail className="w-4 h-4 text-zinc-400 flex-shrink-0" />
                    <span>founder@builtbyvansh.com</span>
                  </a>

                  {/* WhatsApp */}
                  <a
                    href="https://wa.me/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-full bg-[#08090d]/90 border border-white/[0.09] hover:border-[#00ff66]/40 hover:bg-[#00ff66]/5 text-xs text-zinc-300 hover:text-white whitespace-nowrap transition-all duration-200 shadow-md"
                  >
                    <svg className="w-4 h-4 text-zinc-400 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                    </svg>
                    <span>WhatsApp</span>
                  </a>

                  {/* GitHub */}
                  <a
                    href="https://github.com/VanshMehta1234"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-full bg-[#08090d]/90 border border-white/[0.09] hover:border-[#00ff66]/40 hover:bg-[#00ff66]/5 text-xs text-zinc-300 hover:text-white whitespace-nowrap transition-all duration-200 shadow-md"
                  >
                    <svg className="w-4 h-4 text-zinc-400 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                      <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                    </svg>
                    <span>VanshMehta1234</span>
                  </a>
                </div>
              </div>
            </div>
          </motion.div>

          {/* ─────────────────────────────────────────────────────────────
              RIGHT COLUMN: Interactive Contact Form Card
          ────────────────────────────────────────────────────────────── */}
          <motion.div
            className="flex flex-col h-full"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
          >
            <div className="relative p-6 sm:p-8 md:p-10 rounded-3xl bg-[#08090d]/90 border border-white/[0.09] backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.8),_0_0_40px_rgba(0,255,102,0.03)] overflow-hidden h-full flex flex-col justify-between">
              
              {/* Subtle top inner glass sheen */}
              <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />

              {/* Ambient radial accent in form corner */}
              <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-[#00ff66]/10 rounded-full blur-3xl pointer-events-none" />

              {isSubmitted ? (
                /* Success State */
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-12 px-4 text-center flex flex-col items-center justify-center min-h-[460px] h-full"
                >
                  <div className="w-16 h-16 rounded-full bg-[#00ff66]/10 border border-[#00ff66]/40 flex items-center justify-center text-[#00ff66] mb-6 shadow-[0_0_30px_rgba(0,255,102,0.3)]">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  
                  <h3 className="text-2xl sm:text-3xl font-bold text-white mb-3 tracking-tight">
                    Project Brief Received!
                  </h3>
                  
                  <p className="text-zinc-400 text-sm sm:text-base max-w-md mx-auto mb-8 leading-relaxed">
                    Thank you for reaching out, <span className="text-white font-semibold">{formData.name}</span>.
                    I’ve received your inquiry and will review your project details. Expect a reply to{" "}
                    <span className="text-[#00e5ff] font-mono text-xs">{formData.email}</span> within 0-4 hours.
                  </p>

                  <div className="flex flex-wrap items-center justify-center gap-4">
                    <button
                      onClick={resetForm}
                      className="px-6 py-3 rounded-xl border border-white/10 bg-white/[0.04] hover:bg-white/[0.08] text-white text-sm font-medium transition-all"
                    >
                      Send another message
                    </button>
                    <a
                      href="mailto:contact@vrajpatel.dev"
                      className="px-6 py-3 rounded-xl bg-[#00ff66]/10 border border-[#00ff66]/40 text-[#00ff66] hover:bg-[#00ff66]/20 text-sm font-medium transition-all inline-flex items-center gap-2"
                    >
                      <Mail className="w-4 h-4" />
                      Direct Email
                    </a>
                  </div>
                </motion.div>
              ) : (
                /* Form Fields */
                <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6 relative z-10 flex-1 flex flex-col justify-between">
                  <div className="space-y-5 sm:space-y-6">
                    {/* Row 1: Name & Email */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      {/* Name */}
                      <div>
                        <label
                          htmlFor="name"
                          className="block text-[11px] font-mono font-bold tracking-[0.18em] text-zinc-400 uppercase mb-2"
                          style={{ fontFamily: mono }}
                        >
                          YOUR NAME <span className="text-[#00ff66]">*</span>
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="Your name"
                          required
                          className="w-full bg-[#10121a]/90 border border-white/[0.08] focus:border-[#00ff66] focus:ring-1 focus:ring-[#00ff66]/40 focus:bg-[#151824] text-white placeholder-zinc-600 rounded-xl px-4 py-3.5 text-sm outline-none transition-all duration-200"
                        />
                      </div>

                      {/* Email */}
                      <div>
                        <label
                          htmlFor="email"
                          className="block text-[11px] font-mono font-bold tracking-[0.18em] text-zinc-400 uppercase mb-2"
                          style={{ fontFamily: mono }}
                        >
                          EMAIL <span className="text-[#00ff66]">*</span>
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="you@company.com"
                          required
                          className="w-full bg-[#10121a]/90 border border-white/[0.08] focus:border-[#00ff66] focus:ring-1 focus:ring-[#00ff66]/40 focus:bg-[#151824] text-white placeholder-zinc-600 rounded-xl px-4 py-3.5 text-sm outline-none transition-all duration-200"
                        />
                      </div>
                    </div>

                    {/* Row 2: What do you need & Budget */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      {/* What do you need? */}
                      <div>
                        <label
                          htmlFor="projectType"
                          className="block text-[11px] font-mono font-bold tracking-[0.18em] text-zinc-400 uppercase mb-2"
                          style={{ fontFamily: mono }}
                        >
                          WHAT DO YOU NEED?
                        </label>
                        <div className="relative">
                          <select
                            id="projectType"
                            name="projectType"
                            value={formData.projectType}
                            onChange={handleChange}
                            className="w-full appearance-none bg-[#10121a]/90 border border-white/[0.08] focus:border-[#00ff66] focus:ring-1 focus:ring-[#00ff66]/40 focus:bg-[#151824] text-white rounded-xl px-4 py-3.5 text-sm outline-none transition-all duration-200 pr-10 cursor-pointer"
                          >
                            <option value="" disabled className="bg-[#10121a] text-zinc-500">
                              Choose project type
                            </option>
                            {PROJECT_TYPES.map((type) => (
                              <option key={type} value={type} className="bg-[#10121a] text-white py-2">
                                {type}
                              </option>
                            ))}
                          </select>
                          <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500 pointer-events-none" />
                        </div>
                      </div>

                      {/* Budget (USD) */}
                      <div>
                        <label
                          htmlFor="budget"
                          className="block text-[11px] font-mono font-bold tracking-[0.18em] text-zinc-400 uppercase mb-2"
                          style={{ fontFamily: mono }}
                        >
                          BUDGET (USD)
                        </label>
                        <div className="relative">
                          <select
                            id="budget"
                            name="budget"
                            value={formData.budget}
                            onChange={handleChange}
                            className="w-full appearance-none bg-[#10121a]/90 border border-white/[0.08] focus:border-[#00ff66] focus:ring-1 focus:ring-[#00ff66]/40 focus:bg-[#151824] text-white rounded-xl px-4 py-3.5 text-sm outline-none transition-all duration-200 pr-10 cursor-pointer"
                          >
                            <option value="" disabled className="bg-[#10121a] text-zinc-500">
                              Choose budget range
                            </option>
                            {BUDGET_RANGES.map((b) => (
                              <option key={b} value={b} className="bg-[#10121a] text-white py-2">
                                {b}
                              </option>
                            ))}
                          </select>
                          <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500 pointer-events-none" />
                        </div>
                      </div>
                    </div>

                    {/* Row 3: Project Details */}
                    <div>
                      <label
                        htmlFor="details"
                        className="block text-[11px] font-mono font-bold tracking-[0.18em] text-zinc-400 uppercase mb-2"
                        style={{ fontFamily: mono }}
                      >
                        PROJECT DETAILS <span className="text-[#00ff66]">*</span>
                      </label>
                      <textarea
                        id="details"
                        name="details"
                        rows={4}
                        value={formData.details}
                        onChange={handleChange}
                        placeholder="What are you building, what is blocked, and when do you want to ship?"
                        required
                        className="w-full bg-[#10121a]/90 border border-white/[0.08] focus:border-[#00ff66] focus:ring-1 focus:ring-[#00ff66]/40 focus:bg-[#151824] text-white placeholder-zinc-600 rounded-xl px-4 py-3.5 text-sm outline-none transition-all duration-200 resize-y"
                      />
                    </div>

                    {/* Error Notification */}
                    {errorMessage && (
                      <div className="p-3.5 rounded-xl bg-red-950/40 border border-red-500/30 text-red-400 text-xs font-mono">
                        {errorMessage}
                      </div>
                    )}
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full group relative overflow-hidden py-4 px-6 rounded-2xl font-bold text-sm tracking-wide transition-all duration-300 flex items-center justify-center gap-2.5 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed shadow-[0_0_30px_rgba(0,255,102,0.25)] hover:shadow-[0_0_40px_rgba(0,255,102,0.5)] active:scale-[0.99] text-black bg-gradient-to-r from-[#00ff66] via-[#00e5ff] to-[#00ff66] bg-[length:200%_auto] hover:bg-right transition-[background-position,box-shadow,transform]"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin text-black" />
                          <span>Dispatching brief...</span>
                        </>
                      ) : (
                        <>
                          <span>Send project brief</span>
                          <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-0.5 transition-transform" />
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </motion.div>
        </div>

        {/* ── DINO GAME ANIMATED GRAPHICS (CHROME NO-INTERNET T-REX RUNNER) ── */}
        <DinoRunner />

        {/* ─────────────────────────────────────────────────────────────
            BOTTOM FOOTER: Minimalist branding, links & copyright
        ────────────────────────────────────────────────────────────── */}
        <div className="pt-8 pb-6 border-t border-white/[0.08] grid grid-cols-1 md:grid-cols-3 items-center gap-6 text-xs text-zinc-500 font-mono">
          {/* Left Column: Logo & Social Icons */}
          <div className="flex flex-col items-center md:items-start gap-3">
            <div className="flex items-center gap-3">
              <span className="text-white font-semibold tracking-wider">&lt;VRAJ /&gt;</span>
              <span className="text-zinc-600">•</span>
              <span className="text-zinc-400">All systems operational</span>
            </div>
            
            {/* 4 Contact/Social Icons: email, github, linkedin, whatsapp */}
            <div className="flex items-center gap-2 pt-0.5">
              {/* Email */}
              <a
                href="mailto:contact@vrajpatel.dev"
                aria-label="Email"
                title="Email"
                className="w-8 h-8 rounded-lg bg-[#0c0e14] border border-white/[0.08] hover:border-[#00ff66]/50 hover:bg-[#00ff66]/10 text-zinc-400 hover:text-[#00ff66] flex items-center justify-center transition-all duration-200 group shadow-sm cursor-pointer"
              >
                <Mail className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" />
              </a>

              {/* GitHub */}
              <a
                href="https://github.com/VanshMehta1234"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                title="GitHub"
                className="w-8 h-8 rounded-lg bg-[#0c0e14] border border-white/[0.08] hover:border-[#00ff66]/50 hover:bg-[#00ff66]/10 text-zinc-400 hover:text-[#00ff66] flex items-center justify-center transition-all duration-200 group shadow-sm cursor-pointer"
              >
                <svg className="w-3.5 h-3.5 group-hover:scale-110 transition-transform fill-current" viewBox="0 0 24 24">
                  <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                </svg>
              </a>

              {/* LinkedIn */}
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                title="LinkedIn"
                className="w-8 h-8 rounded-lg bg-[#0c0e14] border border-white/[0.08] hover:border-[#00ff66]/50 hover:bg-[#00ff66]/10 text-zinc-400 hover:text-[#00ff66] flex items-center justify-center transition-all duration-200 group shadow-sm cursor-pointer"
              >
                <svg className="w-3.5 h-3.5 group-hover:scale-110 transition-transform fill-current" viewBox="0 0 24 24">
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.25c-.95 0-1.72.78-1.72 1.73s.77 1.73 1.72 1.73c.95 0 1.72-.78 1.72-1.73s-.77-1.73-1.72-1.73z"/>
                </svg>
              </a>

              {/* WhatsApp */}
              <a
                href="https://wa.me/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                title="WhatsApp"
                className="w-8 h-8 rounded-lg bg-[#0c0e14] border border-white/[0.08] hover:border-[#00ff66]/50 hover:bg-[#00ff66]/10 text-zinc-400 hover:text-[#00ff66] flex items-center justify-center transition-all duration-200 group shadow-sm cursor-pointer"
              >
                <svg className="w-3.5 h-3.5 group-hover:scale-110 transition-transform fill-current" viewBox="0 0 24 24">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Middle Column: All Section Menus + Copyright Below */}
          <div className="flex flex-col items-center justify-center gap-2.5 text-center">
            <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
              <a
                href="#work"
                className="text-zinc-400 hover:text-[#00ff66] transition-colors duration-200"
              >
                Work
              </a>
              <a
                href="#about"
                className="text-zinc-400 hover:text-[#00ff66] transition-colors duration-200"
              >
                About
              </a>
              <a
                href="#services"
                className="text-zinc-400 hover:text-[#00ff66] transition-colors duration-200"
              >
                Services
              </a>
              <a
                href="#skills"
                className="text-zinc-400 hover:text-[#00ff66] transition-colors duration-200"
              >
                Skills
              </a>
              <a
                href="#process"
                className="text-zinc-400 hover:text-[#00ff66] transition-colors duration-200"
              >
                Process
              </a>
              <a
                href="#contact"
                className="text-zinc-400 hover:text-[#00ff66] transition-colors duration-200"
              >
                Contact
              </a>
            </div>

            <div className="text-zinc-600 text-[11px]">
              © {new Date().getFullYear()} Vraj Patel. Crafted with Next.js & Tailwind.
            </div>
          </div>

          {/* Right Column: Back to top text link & Legal Links */}
          <div className="flex flex-col items-center md:items-end gap-2.5">
            <button
              type="button"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="text-zinc-400 hover:text-[#00ff66] transition-colors duration-200 cursor-pointer inline-flex items-center gap-1 group"
            >
              <span>Back to top</span>
              <span className="group-hover:-translate-y-0.5 transition-transform duration-200">↑</span>
            </button>

            <div className="flex items-center gap-2.5 text-[11px] text-zinc-600">
              <a
                href="#"
                onClick={(e) => e.preventDefault()}
                className="text-zinc-500 hover:text-[#00ff66] transition-colors duration-200"
              >
                Privacy Policy
              </a>
              <span>•</span>
              <a
                href="#"
                onClick={(e) => e.preventDefault()}
                className="text-zinc-500 hover:text-[#00ff66] transition-colors duration-200"
              >
                Terms & Conditions
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          CALENDLY / CAL.COM BOOKING MODAL POPUP DIALOG
      ────────────────────────────────────────────────────────────── */}
      <AnimatePresence>
        {isBookingModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6">
            {/* Backdrop Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsBookingModalOpen(false)}
              className="absolute inset-0 bg-black/85 backdrop-blur-md"
            />

            {/* Modal Dialog Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="relative z-10 w-full max-w-[1060px] h-[88vh] min-h-[680px] max-h-[840px] flex flex-col rounded-2xl sm:rounded-3xl bg-[#0b0c10] border border-white/[0.1] shadow-[0_25px_60px_rgba(0,0,0,0.95),_0_0_50px_rgba(0,255,102,0.1)] overflow-hidden"
            >
              {/* Top Navbar Header matching the screenshot request */}
              <div className="flex items-center justify-between px-6 sm:px-8 py-3.5 sm:py-4 border-b border-white/[0.08] bg-[#0d0f14] flex-shrink-0">
                <div>
                  <div
                    className="text-[11px] sm:text-xs font-bold tracking-[0.22em] uppercase font-mono text-transparent bg-clip-text bg-gradient-to-r from-[#00ff66] to-[#00e5ff] flex items-center gap-2 mb-0.5"
                    style={{ fontFamily: mono }}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#00ff66] shadow-[0_0_8px_#00ff66] animate-pulse" />
                    VRAJ DEV
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-white tracking-tight">
                    Book a 15-minute call
                  </h3>
                </div>

                <button
                  type="button"
                  onClick={() => setIsBookingModalOpen(false)}
                  aria-label="Close dialog"
                  className="p-2 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] text-zinc-400 hover:text-white border border-white/10 transition-all duration-200 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Seamless Cal.com Embed View with Full Height */}
              <div className="w-full flex-1 bg-[#0b0c10] overflow-hidden min-h-0">
                <iframe
                  src="https://cal.com/vraj-patel-w3s1tw/15min?embed=true&theme=dark&layout=month_view"
                  title="Book a 15-minute call with Vraj"
                  className="w-full h-full border-0 block"
                  allow="camera; microphone; autoplay; fullscreen"
                />
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}

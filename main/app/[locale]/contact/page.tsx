"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

const contactDetails = [
  {
    title: "Email Us",
    value: "hello@studio-mono.com",
    subtext: "We respond within 24 business hours.",
    icon: (
      <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    title: "Office Location",
    value: "San Francisco, CA",
    subtext: "100 Montgomery St, Suite 1600",
    icon: (
      <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
  {
    title: "Working Hours",
    value: "Mon — Fri: 9am - 6pm EST",
    subtext: "Weekend support available for critical issues.",
    icon: (
      <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
];

const faqs = [
  {
    q: "What is your typical project timeline?",
    a: "Most website design and development projects take between 4 to 8 weeks depending on scope, complexity, and feedback rounds.",
  },
  {
    q: "Do you offer post-launch maintenance?",
    a: "Yes. We offer ongoing maintenance, security updates, performance monitoring, and content management support.",
  },
  {
    q: "How do we get started?",
    a: "Simply fill out the contact form with your project details. We will schedule an initial 30-minute discovery call to discuss your goals.",
  },
];

export default function ContactPage() {
  const t = useTranslations("contact");
  const serviceOptions = [
    t("serviceWebDevelopment"),
    t("serviceUiUxDesign"),
    t("serviceConsulting"),
    t("serviceOther"),
  ];
  const [selectedService, setSelectedService] = useState(serviceOptions[0]);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <main className="bg-black text-neutral-200 min-h-screen selection:bg-neutral-800 selection:text-white relative overflow-hidden">
      {/* Background Decorative Radial Gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,120,120,0.12),rgba(255,255,255,0))]" />

      <div className="relative max-w-6xl mx-auto px-6 py-20 lg:py-32 space-y-20">
        
        {/* HERO SECTION */}
        <section className="text-center max-w-3xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-neutral-800 bg-neutral-900/80 px-3.5 py-1 text-xs text-neutral-400 uppercase tracking-widest backdrop-blur-sm">
            <span>{t("badge")}</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-white via-neutral-200 to-neutral-500">
            {t("heroTitle")}
          </h1>

          <p className="text-lg text-neutral-400 leading-relaxed">
            {t("heroDescription")}
          </p>
        </section>

        {/* MAIN FORM & SIDEBAR GRID */}
        <section className="grid lg:grid-cols-12 gap-12 items-start">
          
          {/* CONTACT FORM (7 cols) */}
          <div className="lg:col-span-7 bg-neutral-950 border border-neutral-800/80 rounded-3xl p-6 sm:p-10 relative">
            {submitted ? (
              <div className="py-16 text-center space-y-4">
                <div className="w-12 h-12 rounded-full bg-neutral-900 border border-neutral-800 text-white mx-auto flex items-center justify-center">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-white">{t("submittedTitle")}</h3>
                <p className="text-neutral-400 max-w-md mx-auto text-sm">
                  {t("submittedDescription")}
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-4 text-xs font-mono text-neutral-400 underline underline-offset-4 hover:text-white"
                >
                  {t("sendAnother")}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <h2 className="text-xl font-bold text-white mb-1">{t("formTitle")}</h2>
                  <p className="text-sm text-neutral-400">{t("formSubtitle")}</p>
                </div>

                {/* Name Inputs */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="block text-xs font-mono uppercase tracking-wider text-neutral-400">
                      {t("firstName")}
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Jane"
                      className="w-full bg-neutral-900/50 border border-neutral-800 rounded-xl px-4 py-3 text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-neutral-500 focus:ring-1 focus:ring-neutral-500 transition"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-xs font-mono uppercase tracking-wider text-neutral-400">
                      {t("lastName")}
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Doe"
                      className="w-full bg-neutral-900/50 border border-neutral-800 rounded-xl px-4 py-3 text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-neutral-500 focus:ring-1 focus:ring-neutral-500 transition"
                    />
                  </div>
                </div>

                {/* Email Input */}
                <div className="space-y-2">
                  <label className="block text-xs font-mono uppercase tracking-wider text-neutral-400">
                    {t("email")}
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="jane@company.com"
                    className="w-full bg-neutral-900/50 border border-neutral-800 rounded-xl px-4 py-3 text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-neutral-500 focus:ring-1 focus:ring-neutral-500 transition"
                  />
                </div>

                {/* Service Selection Pills */}
                <div className="space-y-2">
                  <label className="block text-xs font-mono uppercase tracking-wider text-neutral-400">
                    {t("helpWith")}
                  </label>
                  <div className="flex flex-wrap gap-2 pt-1">
                    {serviceOptions.map((service) => (
                      <button
                        type="button"
                        key={service}
                        onClick={() => setSelectedService(service)}
                        className={`text-xs px-4 py-2 rounded-full border transition ${
                          selectedService === service
                            ? "bg-white text-black border-white font-medium"
                            : "bg-neutral-900/50 text-neutral-400 border-neutral-800 hover:border-neutral-700"
                        }`}
                      >
                        {service}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Message Textarea */}
                <div className="space-y-2">
                  <label className="block text-xs font-mono uppercase tracking-wider text-neutral-400">
                    {t("message")}
                  </label>
                  <textarea
                    rows={5}
                    required
                    placeholder={t("messagePlaceholder")}
                    className="w-full bg-neutral-900/50 border border-neutral-800 rounded-xl px-4 py-3 text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-neutral-500 focus:ring-1 focus:ring-neutral-500 transition resize-none"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full bg-white text-black font-medium py-3.5 rounded-xl hover:bg-neutral-200 transition duration-200 text-sm flex items-center justify-center gap-2"
                >
                  {t("submit")}
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </button>
              </form>
            )}
          </div>

          {/* CONTACT INFO SIDEBAR (5 cols) */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-white">{t("directInformation")}</h2>
              
              <div className="space-y-4">
                {contactDetails.map((detail, idx) => (
                  <div
                    key={idx}
                    className="p-5 rounded-2xl bg-neutral-950 border border-neutral-800/80 flex items-start gap-4"
                  >
                    <div className="p-2.5 rounded-xl bg-neutral-900 border border-neutral-800 shrink-0">
                      {detail.icon}
                    </div>
                    <div>
                      <h3 className="text-xs font-mono uppercase text-neutral-500 tracking-wider">
                        {detail.title}
                      </h3>
                      <p className="text-white font-medium text-sm mt-0.5">{detail.value}</p>
                      <p className="text-xs text-neutral-400 mt-1">{detail.subtext}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* SOCIAL LINKS */}
            <div className="p-6 rounded-2xl bg-neutral-950 border border-neutral-800/80 space-y-4">
              <h3 className="text-xs font-mono uppercase text-neutral-500 tracking-wider">
                {t("followConnect")}
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { name: "X / Twitter", handle: "@studiomono" },
                  { name: "GitHub", handle: "github.com/studiomono" },
                  { name: "LinkedIn", handle: "in/studiomono" },
                  { name: "Dribbble", handle: "dribbble.com/studiomono" },
                ].map((social, idx) => (
                  <a
                    key={idx}
                    href="#"
                    className="p-3 rounded-xl bg-neutral-900/40 border border-neutral-800/60 hover:border-neutral-700 transition group"
                  >
                    <p className="text-xs font-medium text-white group-hover:text-neutral-300">
                      {social.name}
                    </p>
                    <p className="text-[11px] text-neutral-500 truncate">{social.handle}</p>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* FREQUENTLY ASKED QUESTIONS */}
        <section className="pt-12 border-t border-neutral-900 space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              {t("faqTitle")}
            </h2>
            <p className="text-sm text-neutral-400">{t("faqSubtitle")}</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="p-6 rounded-2xl bg-neutral-950 border border-neutral-800/80 space-y-3"
              >
                <h3 className="text-sm font-semibold text-white">{faq.q}</h3>
                <p className="text-xs text-neutral-400 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </section>

      </div>
    </main>
  );
}
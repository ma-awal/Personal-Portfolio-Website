"use client";
import { useRef, useState } from "react";
import { FiMail, FiMapPin, FiSend } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";
import { contact } from "@/config/content";
import { site, waLink } from "@/config/site";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

const field =
  "w-full rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-[15px] text-ink outline-none transition placeholder:text-slate-400 focus:border-brand focus:ring-4 focus:ring-brand/10";

export default function Contact() {
  const form = useRef(null);
  const [sending, setSending] = useState(false);
  const [status, setStatus] = useState(null); // { type: "success" | "error", text }

  const onSubmit = async (e) => {
    e.preventDefault();
    const fd = new FormData(form.current);
    if (fd.get("company")) return; // honeypot: bot hole kichu kora hobe na
    setSending(true);
    setStatus(null);
    try {
      const emailjs = (await import("@emailjs/browser")).default;
      const service = fd.get("service");
      await emailjs.send(
        site.emailjs.serviceId,
        site.emailjs.templateId,
        {
          from_name: fd.get("name"),
          from_email: fd.get("email"),
          service,
          message: `[${service}]\n\n${fd.get("message")}`,
        },
        { publicKey: site.emailjs.publicKey }
      );
      form.current.reset();
      setStatus({ type: "success", text: contact.success });
    } catch {
      setStatus({ type: "error", text: contact.error });
    } finally {
      setSending(false);
    }
  };

  const items = [
    {
      icon: FaWhatsapp,
      label: "WhatsApp",
      value: site.phone,
      href: waLink(contact.whatsappText),
      color: "bg-emerald-500/10 text-emerald-600",
    },
    {
      icon: FiMail,
      label: "Email",
      value: site.email,
      href: `mailto:${site.email}`,
      color: "bg-brand/10 text-brand",
    },
    {
      icon: FiMapPin,
      label: "Location",
      value: site.location,
      color: "bg-violet/10 text-violet",
    },
  ];

  return (
    <section id="contact" className="bg-white py-20 md:py-28">
      <div className="mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-10">
        <SectionHeading
          eyebrow={contact.eyebrow}
          title={contact.title}
          highlight={contact.highlight}
          subtitle={contact.subtitle}
        />

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[0.8fr_1.2fr]">
          <Reveal className="grid min-w-0 grid-cols-1 content-start gap-4">
            {items.map(({ icon: Icon, label, value, href, color }) => {
              const body = (
                <>
                  <span
                    className={`grid h-12 w-12 shrink-0 place-items-center rounded-2xl text-xl ${color}`}
                  >
                    <Icon />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
                      {label}
                    </span>
                    <span className="block truncate text-[15px] font-semibold text-ink">
                      {value}
                    </span>
                  </span>
                </>
              );
              const cls =
                "flex min-w-0 items-center gap-4 rounded-3xl border border-slate-200/70 bg-cream p-5 transition";
              return href ? (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  className={`${cls} hover:border-brand/40`}
                >
                  {body}
                </a>
              ) : (
                <div key={label} className={cls}>
                  {body}
                </div>
              );
            })}
            <a
              href={waLink(contact.whatsappText)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary mt-2"
            >
              <FaWhatsapp className="text-lg" /> Chat on WhatsApp
            </a>
          </Reveal>

          <Reveal delay={100} className="min-w-0">
            <form
              ref={form}
              onSubmit={onSubmit}
              className="space-y-4 rounded-3xl border border-slate-200/70 bg-cream p-6 shadow-soft md:p-9"
            >
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <input
                  className={field}
                  type="text"
                  name="name"
                  required
                  autoComplete="name"
                  aria-label="Your name"
                  placeholder="Your name"
                />
                <input
                  className={field}
                  type="email"
                  name="email"
                  required
                  autoComplete="email"
                  aria-label="Your email"
                  placeholder="Your email"
                />
              </div>
              <select
                className={field}
                name="service"
                aria-label="What do you need?"
                defaultValue={contact.serviceOptions[0]}
              >
                {contact.serviceOptions.map((o) => (
                  <option key={o}>{o}</option>
                ))}
              </select>
              <textarea
                className={`${field} resize-none`}
                name="message"
                rows={5}
                required
                aria-label="Your message"
                placeholder="Tell me about your project"
              />
              <input
                type="text"
                name="company"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                className="hidden"
              />
              <button
                type="submit"
                disabled={sending}
                className="btn-primary w-full sm:w-auto"
              >
                {sending ? "Sending..." : "Send message"} <FiSend />
              </button>
              {status && (
                <p
                  role="status"
                  className={`text-sm font-medium ${
                    status.type === "success"
                      ? "text-emerald-600"
                      : "text-red-600"
                  }`}
                >
                  {status.text}
                </p>
              )}
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

"use client";
import { useEffect, useState } from "react";
import { FaWhatsapp } from "react-icons/fa";
import { FiArrowUp } from "react-icons/fi";
import { waLink } from "@/config/site";

// WhatsApp floating button (sob page e) + scroll-to-top
export default function FloatingActions() {
  const [showTop, setShowTop] = useState(false);
  useEffect(() => {
    const on = () => setShowTop(window.scrollY > 700);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  return (
    <div className="fixed bottom-5 right-4 z-40 flex flex-col items-end gap-3 sm:bottom-6 sm:right-6">
      <button type="button" aria-label="Back to top" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className={`grid h-11 w-11 place-items-center rounded-full border border-slate-200 bg-white text-lg text-ink shadow-lg transition duration-300 hover:text-brand ${showTop ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-3 opacity-0"}`}>
        <FiArrowUp />
      </button>
      <a href={waLink()} target="_blank" rel="noopener noreferrer" aria-label="Chat on WhatsApp" className="group relative flex items-center">
        <span className="pointer-events-none absolute right-full mr-3 hidden whitespace-nowrap rounded-lg bg-ink px-3 py-1.5 text-xs font-semibold text-white opacity-0 shadow-lg transition group-hover:opacity-100 md:block">Chat on WhatsApp</span>
        <span aria-hidden="true" className="absolute inset-0 animate-pulse-ring rounded-full bg-[#25D366]" />
        <span className="relative grid h-14 w-14 place-items-center rounded-full bg-[#25D366] text-3xl text-white shadow-[0_12px_30px_-8px_rgba(37,211,102,0.7)] transition hover:scale-110"><FaWhatsapp /></span>
      </a>
    </div>
  );
}

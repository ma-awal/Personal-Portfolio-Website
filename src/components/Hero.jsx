import Image from "next/image";
import { FiArrowRight, FiCheck } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";
import { hero } from "@/config/content";
import { site, waLink } from "@/config/site";
import { iconFor } from "./icons";

export default function Hero() {
  return (
    <section id="home" className="relative isolate overflow-hidden bg-ink text-white">
      {/* background glow + grid */}
      <div aria-hidden="true" className="absolute inset-0 -z-10">
        <div className="absolute -left-40 -top-40 h-[520px] w-[520px] rounded-full bg-brand/30 blur-[140px]" />
        <div className="absolute -right-32 top-1/4 h-[460px] w-[460px] rounded-full bg-violet/25 blur-[140px]" />
        <div className="absolute inset-0 bg-grid opacity-[0.06] [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" />
      </div>

      <div className="mx-auto grid w-full max-w-7xl items-center gap-14 px-5 pb-20 pt-28 sm:px-8 md:pt-36 lg:grid-cols-[1.15fr_0.85fr] lg:gap-10 lg:px-10 lg:pb-28 lg:pt-40">
        <div className="animate-fade-up text-center lg:text-left">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-slate-200 backdrop-blur">
            <i className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
            {hero.badge}
          </span>

          <h1 className="mt-6 font-display text-[2.1rem] font-extrabold leading-[1.12] tracking-tight sm:text-5xl lg:text-[3.6rem]">
            {hero.titleStart} <span className="grad-text">{hero.titleHighlight}</span>
          </h1>

          <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-slate-300 sm:text-lg lg:mx-0">{hero.subtitle}</p>

          <div className="mt-9 flex flex-col items-stretch gap-3 sm:flex-row sm:justify-center lg:justify-start">
            <a href="#work" className="btn-primary">{hero.primaryCta} <FiArrowRight className="text-lg" /></a>
            <a href={waLink(hero.whatsappText)} target="_blank" rel="noopener noreferrer" className="btn-ghost">
              <FaWhatsapp className="text-lg text-emerald-400" /> {hero.whatsappCta}
            </a>
          </div>

          <ul className="mt-9 flex flex-wrap justify-center gap-x-6 gap-y-3 text-sm text-slate-300 lg:justify-start">
            {hero.points.map((p) => (
              <li key={p} className="inline-flex items-center gap-2">
                <span className="grid h-5 w-5 place-items-center rounded-full bg-white/10 text-brand"><FiCheck className="text-xs" /></span>
                {p}
              </li>
            ))}
          </ul>
        </div>

        {/* Photo */}
        <div className="animate-fade-up mx-auto w-full max-w-[340px] [animation-delay:150ms] sm:max-w-[400px] lg:max-w-[440px]">
          <div className="relative">
            <div aria-hidden="true" className="absolute -inset-3 rounded-[2.8rem] bg-linear-to-br from-brand/60 to-violet/50 opacity-60 blur-2xl" />
            <div className="relative aspect-square overflow-hidden rounded-[2.5rem] border border-white/15 bg-linear-to-br from-brand to-brand-2 shadow-2xl">
              <Image src="/images/profile.webp" alt={`${site.name} – ${site.role}`} width={500} height={500} priority sizes="(min-width: 1024px) 440px, 80vw" className="h-full w-full object-cover" />
            </div>

            {hero.floating.map((f, i) => {
              const Icon = iconFor(f.icon);
              const pos = ["-left-3 top-10 sm:-left-8", "-right-3 top-1/2 sm:-right-8", "-left-2 bottom-8 sm:-left-6"][i] || "";
              return (
                <div key={f.label} className={`absolute ${pos} animate-float flex items-center gap-2.5 rounded-2xl border border-white/15 bg-white/10 px-3.5 py-2.5 text-sm font-semibold shadow-xl backdrop-blur-md`} style={{ animationDelay: `${i * -2}s` }}>
                  <span className="grid h-8 w-8 place-items-center rounded-lg text-white grad-bg"><Icon /></span>
                  {f.label}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

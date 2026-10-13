import { FiCheck, FiArrowUpRight } from "react-icons/fi";
import { services } from "@/config/content";
import { waLink } from "@/config/site";
import { iconFor } from "./icons";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

export default function Services() {
  return (
    <section id="services" className="bg-cream py-20 md:py-28">
      <div className="mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-10">
        <SectionHeading eyebrow={services.eyebrow} title={services.title} highlight={services.highlight} subtitle={services.subtitle} />

        <div className="grid gap-6 md:grid-cols-3">
          {services.items.map((s, i) => {
            const Icon = iconFor(s.icon);
            return (
              <Reveal key={s.title} delay={i * 90} className="h-full">
                <article className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-slate-200/70 bg-white p-7 shadow-soft transition duration-300 hover:-translate-y-1.5 hover:border-brand/30 hover:shadow-[0_24px_60px_-20px_rgba(15,23,42,0.22)] md:p-8">
                  <div aria-hidden="true" className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-brand/10 blur-2xl transition group-hover:bg-brand/20" />
                  <span className="relative grid h-14 w-14 place-items-center rounded-2xl text-2xl text-white shadow-glow grad-bg"><Icon /></span>
                  <h3 className="relative mt-6 font-display text-xl font-bold text-ink">{s.title}</h3>
                  <p className="relative mt-2 text-[15px] leading-relaxed text-slate-500">{s.text}</p>

                  <ul className="relative mt-6 space-y-3 text-[15px] text-slate-700">
                    {s.points.map((p) => (
                      <li key={p} className="flex items-start gap-3">
                        <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-brand/10 text-brand"><FiCheck className="text-xs" /></span>
                        {p}
                      </li>
                    ))}
                  </ul>

                  {s.platforms && (
                    <div className="relative mt-3 flex flex-wrap gap-2 pl-8">
                      {s.platforms.map((p) => <span key={p} className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-700">{p}</span>)}
                    </div>
                  )}

                  <a href={waLink(s.whatsappText)} target="_blank" rel="noopener noreferrer" className="relative mt-auto inline-flex items-center gap-2 pt-8 text-sm font-semibold text-brand transition-all group-hover:gap-3">
                    {s.cta} <FiArrowUpRight />
                  </a>
                </article>
              </Reveal>
            );
          })}
        </div>

        <Reveal className="mt-12 text-center text-[15px] text-slate-500">
          {services.note}{" "}
          <a href={waLink(services.noteText)} target="_blank" rel="noopener noreferrer" className="font-semibold text-brand underline-offset-4 hover:underline">{services.noteCta}</a>
        </Reveal>
      </div>
    </section>
  );
}

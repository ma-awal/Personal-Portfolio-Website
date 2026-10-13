import { skills } from "@/config/content";
import { iconFor } from "./icons";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

export default function Skills() {
  return (
    <section id="skills" className="bg-white py-20 md:py-28">
      <div className="mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-10">
        <SectionHeading eyebrow={skills.eyebrow} title={skills.title} highlight={skills.highlight} subtitle={skills.subtitle} />

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {skills.items.map((s, i) => {
            const Icon = iconFor(s.icon);
            return (
              <Reveal key={s.title} delay={(i % 6) * 60} className="h-full">
                <div className="group flex h-full flex-col items-center rounded-3xl border border-slate-200/70 bg-white p-6 text-center shadow-soft transition duration-300 hover:-translate-y-1.5 hover:border-brand/40">
                  <span className="grid h-14 w-14 place-items-center rounded-2xl bg-brand/10 text-3xl text-brand transition group-hover:text-white group-hover:grad-bg"><Icon /></span>
                  <h3 className="mt-4 font-display text-base font-bold text-ink">{s.title}</h3>
                  <p className="mt-1 text-[13px] leading-snug text-slate-500">{s.text}</p>
                </div>
              </Reveal>
            );
          })}
        </div>

        <Reveal className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <span className="text-sm font-semibold uppercase tracking-[0.16em] text-slate-400">{skills.platformsLabel}</span>
          <div className="flex flex-wrap justify-center gap-2">
            {skills.platforms.map((p) => (
              <span key={p} className="rounded-full border border-slate-200 bg-cream px-4 py-1.5 text-sm font-semibold text-ink">{p}</span>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

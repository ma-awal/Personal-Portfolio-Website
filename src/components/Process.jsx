import { howItWorks } from "@/config/content";
import { iconFor } from "./icons";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

export default function Process() {
  return (
    <section id="process" className="relative isolate overflow-hidden bg-ink py-20 text-white md:py-28">
      <div aria-hidden="true" className="absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-0 h-[360px] w-[720px] -translate-x-1/2 rounded-full bg-brand/15 blur-[130px]" />
      </div>
      <div className="mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-10">
        <SectionHeading dark eyebrow={howItWorks.eyebrow} title={howItWorks.title} highlight={howItWorks.highlight} />

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {howItWorks.steps.map((s, i) => {
            const Icon = iconFor(s.icon);
            return (
              <Reveal key={s.title} delay={i * 90} className="h-full">
                <div className="relative h-full rounded-3xl border border-white/10 bg-white/[0.04] p-7 backdrop-blur transition hover:border-brand/40 hover:bg-white/[0.07]">
                  <div className="flex items-center justify-between">
                    <span className="grid h-12 w-12 place-items-center rounded-2xl text-xl text-white shadow-glow grad-bg"><Icon /></span>
                    <span className="font-display text-4xl font-extrabold text-white/10">0{i + 1}</span>
                  </div>
                  <h3 className="mt-6 font-display text-lg font-bold">{s.title}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-slate-400">{s.text}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

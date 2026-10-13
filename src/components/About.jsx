import { FiDownload, FiBriefcase } from "react-icons/fi";
import { about } from "@/config/content";
import { site } from "@/config/site";
import { iconFor } from "./icons";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

export default function About() {
  return (
    <section id="about" className="bg-cream py-20 md:py-28">
      <div className="mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-10">
        <SectionHeading eyebrow={about.eyebrow} title={about.title} highlight={about.highlight} />

        <div className="grid items-start gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14">
          <Reveal className="text-center lg:text-left">
            <div className="space-y-5 text-base leading-relaxed text-slate-600 md:text-lg">
              {about.story.map((p) => <p key={p}>{p}</p>)}
            </div>
            <a href={site.resume} download className="btn-primary mt-9">
              <FiDownload className="text-lg" /> {about.resumeLabel}
            </a>
          </Reveal>

          <div className="grid gap-4">
            {about.cards.map((c, i) => {
              const Icon = iconFor(c.icon);
              return (
                <Reveal key={c.title} delay={i * 90}>
                  <div className="flex items-start gap-5 rounded-3xl border border-slate-200/70 bg-white p-6 shadow-soft transition hover:border-brand/30">
                    <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-brand/10 text-xl text-brand"><Icon /></span>
                    <div>
                      <h3 className="font-display text-lg font-bold text-ink">{c.title}</h3>
                      <p className="mt-1 text-[15px] leading-relaxed text-slate-500">{c.text}</p>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>

        {/* Experience (compact) */}
        <Reveal className="mt-16 md:mt-20">
          <h3 className="mb-6 text-center font-display text-xl font-bold text-ink lg:text-left">{about.experienceTitle}</h3>
          <div className="grid gap-4 md:grid-cols-2">
            {about.experience.map((e) => (
              <div key={e.role} className="rounded-3xl border border-slate-200/70 bg-white p-6 shadow-soft">
                <div className="flex items-start justify-between gap-4">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-ink text-lg text-white"><FiBriefcase /></span>
                  <span className="rounded-full bg-brand/10 px-3 py-1 text-xs font-semibold text-brand">{e.time}</span>
                </div>
                <h4 className="mt-4 font-display text-lg font-bold text-ink">{e.role}</h4>
                <p className="text-sm font-medium text-slate-400">{e.place}</p>
                <p className="mt-3 text-[15px] leading-relaxed text-slate-500">{e.text}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

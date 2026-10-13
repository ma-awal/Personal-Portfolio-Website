import Reveal from "./Reveal";

export default function SectionHeading({ eyebrow, title, highlight, subtitle, dark = false }) {
  return (
    <Reveal className="mx-auto mb-12 max-w-2xl text-center md:mb-16">
      {eyebrow && (
        <span className={`inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] ${dark ? "border-white/15 bg-white/5 text-slate-300" : "border-brand/20 bg-brand/5 text-brand"}`}>
          <i className="h-1.5 w-1.5 rounded-full grad-bg" />{eyebrow}
        </span>
      )}
      <h2 className={`mt-5 font-display text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl md:text-5xl ${dark ? "text-white" : "text-ink"}`}>
        {title} <span className="grad-text">{highlight}</span>
      </h2>
      {subtitle && <p className={`mx-auto mt-4 max-w-xl text-base leading-relaxed md:text-lg ${dark ? "text-slate-400" : "text-slate-500"}`}>{subtitle}</p>}
    </Reveal>
  );
}

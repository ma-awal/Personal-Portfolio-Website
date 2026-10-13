import { FiStar } from "react-icons/fi";
import { testimonials } from "@/config/content";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

export default function Testimonials() {
  if (!testimonials.items.length) return null;
  return (
    <section id="testimonials" className="bg-cream py-20 md:py-28">
      <div className="mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-10">
        <SectionHeading eyebrow={testimonials.eyebrow} title={testimonials.title} highlight={testimonials.highlight} />

        <div className="columns-1 gap-5 md:columns-2 lg:columns-3 [&>*]:mb-5">
          {testimonials.items.map((t, i) => (
            <Reveal key={t.name} delay={(i % 3) * 80} className="break-inside-avoid">
              <figure className="rounded-3xl border border-slate-200/70 bg-white p-7 shadow-soft">
                <div className="flex gap-1 text-amber-400" aria-label="5 out of 5 stars">
                  {[0, 1, 2, 3, 4].map((n) => <FiStar key={n} className="fill-current" />)}
                </div>
                <blockquote className="mt-4 text-[15px] leading-relaxed text-slate-600">“{t.quote}”</blockquote>
                <figcaption className="mt-5 flex items-center gap-3">
                  <span className="grid h-9 w-9 place-items-center rounded-full text-sm font-bold uppercase text-white grad-bg">{t.name.charAt(0)}</span>
                  <span className="text-sm font-semibold text-ink">{t.name}</span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

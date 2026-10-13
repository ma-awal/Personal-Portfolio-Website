"use client";
import { useState } from "react";
import { FiArrowUpRight } from "react-icons/fi";

const hostOf = (url) => { try { return new URL(url).hostname.replace(/^www\./, ""); } catch { return ""; } };

// Minimal card: thumbnail + category + title + Live link. Description / tech / GitHub nai.
export default function ProjectCard({ project }) {
  const [broken, setBroken] = useState(false);
  const showImage = project.image && !broken;
  const host = hostOf(project.live);

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-3xl border border-slate-200/70 bg-white shadow-soft transition duration-300 hover:-translate-y-1.5 hover:shadow-[0_24px_60px_-20px_rgba(15,23,42,0.25)]">
      <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
        {showImage ? (
          <img src={project.image} alt={project.title} loading="lazy" decoding="async" onError={() => setBroken(true)} className="h-full w-full object-cover object-top transition duration-700 group-hover:scale-105" />
        ) : (
          <div className="grid h-full w-full place-items-center bg-linear-to-br from-ink to-ink-2">
            <span className="grad-text font-display text-6xl font-extrabold">{project.title.charAt(0).toUpperCase()}</span>
          </div>
        )}
        {project.category && (
          <span className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-ink shadow-sm backdrop-blur">{project.category}</span>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-5 p-6">
        <h3 className="font-display text-lg font-bold leading-snug text-ink">{project.title}</h3>
        <div className="mt-auto flex items-center justify-between gap-3">
          <span className="min-w-0 truncate text-sm text-slate-400">{host}</span>
          {project.live && (
            <a href={project.live} target="_blank" rel="noopener noreferrer" aria-label={`View ${project.title} live`} className="inline-flex shrink-0 items-center gap-1.5 rounded-xl bg-ink px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-brand">
              View live <FiArrowUpRight />
            </a>
          )}
        </div>
      </div>
    </article>
  );
}

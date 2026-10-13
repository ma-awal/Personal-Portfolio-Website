"use client";
import { useEffect, useMemo, useState } from "react";
import { FiLoader } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";
import { work } from "@/config/content";
import { waLink } from "@/config/site";
import { CATEGORIES } from "@/lib/categories";
import { fetchProjectsClient } from "@/lib/firebase";
import ProjectCard from "./ProjectCard";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

// initialProjects server theke ashe (SEO + fast). Faka hole browser theke Firebase e try kore (fallback).
export default function Work({ initialProjects = [] }) {
  const [projects, setProjects] = useState(initialProjects);
  const [loading, setLoading] = useState(initialProjects.length === 0);
  const [filter, setFilter] = useState("All");
  const [visible, setVisible] = useState(work.perPage);

  useEffect(() => {
    if (initialProjects.length) return;
    let alive = true;
    fetchProjectsClient().then((p) => alive && setProjects(p)).catch(() => {}).finally(() => alive && setLoading(false));
    return () => { alive = false; };
  }, [initialProjects.length]);

  const tabs = useMemo(() => ["All", ...CATEGORIES.filter((c) => projects.some((p) => p.category === c))], [projects]);
  const list = filter === "All" ? projects : projects.filter((p) => p.category === filter);
  const shown = list.slice(0, visible);

  return (
    <section id="work" className="bg-white py-20 md:py-28">
      <div className="mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-10">
        <SectionHeading eyebrow={work.eyebrow} title={work.title} highlight={work.highlight} subtitle={work.subtitle} />

        {tabs.length > 2 && (
          <Reveal className="mb-10 flex justify-center">
            <div role="tablist" aria-label="Project category" className="flex max-w-full flex-wrap justify-center gap-1.5 rounded-2xl border border-slate-200 bg-slate-50 p-1.5">
              {tabs.map((t) => (
                <button key={t} type="button" role="tab" aria-selected={filter === t} onClick={() => { setFilter(t); setVisible(work.perPage); }}
                  className={`rounded-xl px-5 py-2.5 text-sm font-semibold transition ${filter === t ? "text-white shadow-glow grad-bg" : "text-slate-600 hover:text-ink"}`}>
                  {t}
                </button>
              ))}
            </div>
          </Reveal>
        )}

        {loading ? (
          <div className="grid place-items-center py-24 text-slate-400"><FiLoader className="animate-spin text-3xl text-brand" /></div>
        ) : shown.length === 0 ? (
          <div className="mx-auto max-w-lg rounded-3xl border border-dashed border-slate-200 bg-slate-50 px-6 py-16 text-center">
            <p className="text-slate-500">{work.empty}</p>
            <a href={waLink()} target="_blank" rel="noopener noreferrer" className="btn-primary mt-6"><FaWhatsapp className="text-lg" /> Chat on WhatsApp</a>
          </div>
        ) : (
          <>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {shown.map((p, i) => (
                <Reveal key={p.id} delay={(i % 3) * 80} className="h-full"><ProjectCard project={p} /></Reveal>
              ))}
            </div>
            {list.length > visible && (
              <div className="mt-12 flex justify-center">
                <button type="button" onClick={() => setVisible((v) => v + work.perPage)} className="rounded-xl border border-slate-200 bg-white px-8 py-3.5 text-sm font-semibold text-ink shadow-sm transition hover:border-brand hover:text-brand">
                  Show more projects
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}

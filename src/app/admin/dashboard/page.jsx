"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { FiPlus, FiEdit3, FiTrash2, FiExternalLink, FiAlertTriangle, FiLoader } from "react-icons/fi";
import { CATEGORIES } from "@/lib/categories";
import { fetchProjectsClient, getDb, revalidateSite } from "@/lib/firebase";

export default function Dashboard() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchProjectsClient({ all: true }).then(setProjects).catch(() => setError("Could not load projects. Check your Firestore rules / internet.")).finally(() => setLoading(false));
  }, []);

  const remove = async (p) => {
    if (!window.confirm(`Delete "${p.title || "this project"}"? This cannot be undone.`)) return;
    try {
      const { doc, deleteDoc } = await import("firebase/firestore");
      await deleteDoc(doc(await getDb(), "projects", p.id));
      setProjects((list) => list.filter((x) => x.id !== p.id));
      revalidateSite();
    } catch { window.alert("Delete failed. Please try again."); }
  };

  const needsCategory = projects.filter((p) => !p.category).length;
  const stats = [{ label: "Total", value: projects.length }, ...CATEGORIES.map((c) => ({ label: c, value: projects.filter((p) => p.category === c).length }))];

  return (
    <div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-display text-2xl font-extrabold text-ink sm:text-3xl">Projects</h1>
          <p className="mt-1 text-sm text-slate-500">Everything here appears in the Work section of your site.</p>
        </div>
        <Link href="/admin/add" className="btn-primary self-start sm:self-auto"><FiPlus className="text-lg" /> New project</Link>
      </div>

      <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="rounded-2xl border border-slate-200/70 bg-white p-5 shadow-soft">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-400">{s.label}</p>
            <p className="mt-1 font-display text-3xl font-extrabold text-ink">{s.value}</p>
          </div>
        ))}
      </div>

      {needsCategory > 0 && (
        <p className="mt-5 flex items-start gap-3 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
          <FiAlertTriangle className="mt-0.5 shrink-0" />
          {needsCategory} project{needsCategory > 1 ? "s have" : " has"} an old category. Open edit and choose Portfolio, Ecommerce or Landing Page. Until then {needsCategory > 1 ? "they appear" : "it appears"} only under “All”.
        </p>
      )}

      <div className="mt-6 overflow-hidden rounded-3xl border border-slate-200/70 bg-white shadow-soft">
        {loading ? (
          <div className="grid place-items-center py-24"><FiLoader className="animate-spin text-3xl text-brand" /></div>
        ) : error ? (
          <p className="p-10 text-center text-sm text-red-600">{error}</p>
        ) : projects.length === 0 ? (
          <p className="p-16 text-center text-sm text-slate-400">No projects yet. Add your first one.</p>
        ) : (
          <ul className="divide-y divide-slate-100">
            {projects.map((p) => (
              <li key={p.id} className="flex items-center gap-4 p-4 sm:p-5">
                {p.image
                  ? <img src={p.image} alt="" loading="lazy" className="h-14 w-20 shrink-0 rounded-xl border border-slate-100 object-cover object-top" />
                  : <span className="grid h-14 w-20 shrink-0 place-items-center rounded-xl bg-ink text-xl font-bold text-white">{(p.title || "?").charAt(0).toUpperCase()}</span>}
                <div className="min-w-0 flex-1">
                  <p className="truncate font-semibold text-ink">{p.title || "(no title)"}</p>
                  <div className="mt-1 flex flex-wrap items-center gap-2 text-xs">
                    <span className={`rounded-full px-2.5 py-0.5 font-semibold ${p.category ? "bg-brand/10 text-brand" : "bg-amber-100 text-amber-700"}`}>{p.category || (p.rawCategory ? `Old: ${p.rawCategory}` : "No category")}</span>
                    <span className="text-slate-400">Order {p.order === 9999 ? "–" : p.order}</span>
                  </div>
                </div>
                <div className="flex shrink-0 items-center gap-2">
                  {p.live && <a href={p.live} target="_blank" rel="noopener noreferrer" aria-label="Open live site" className="grid h-10 w-10 place-items-center rounded-xl border border-slate-200 text-slate-500 transition hover:border-brand hover:text-brand"><FiExternalLink /></a>}
                  <Link href={`/admin/edit/${p.id}`} aria-label="Edit" className="grid h-10 w-10 place-items-center rounded-xl border border-slate-200 text-slate-500 transition hover:border-brand hover:text-brand"><FiEdit3 /></Link>
                  <button type="button" onClick={() => remove(p)} aria-label="Delete" className="grid h-10 w-10 place-items-center rounded-xl border border-slate-200 text-red-400 transition hover:border-red-500 hover:bg-red-500 hover:text-white"><FiTrash2 /></button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

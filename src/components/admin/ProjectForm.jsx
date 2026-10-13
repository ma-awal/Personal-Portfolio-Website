"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FiArrowLeft, FiLoader } from "react-icons/fi";
import { CATEGORIES, normalizeCategory } from "@/lib/categories";
import { fetchProjectsClient, getDb, revalidateSite } from "@/lib/firebase";

const field = "w-full rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-[15px] text-ink outline-none transition placeholder:text-slate-400 focus:border-brand focus:ring-4 focus:ring-brand/10";
const label = "mb-2 block text-xs font-semibold uppercase tracking-[0.14em] text-slate-500";

// "example.com" likhleo cholbe: https:// nijei boshe jabe
const toUrl = (v) => { const t = v.trim(); if (!t) return ""; try { return new URL(/^https?:\/\//i.test(t) ? t : `https://${t}`).href; } catch { return null; } };

export default function ProjectForm({ id }) {
  const router = useRouter();
  const [form, setForm] = useState({ title: "", category: "", live: "", image: "", order: "" });
  const [loading, setLoading] = useState(Boolean(id));
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  useEffect(() => {
    if (!id) return;
    (async () => {
      try {
        const { doc, getDoc } = await import("firebase/firestore");
        const snap = await getDoc(doc(await getDb(), "projects", id));
        if (!snap.exists()) { setError("Project not found."); return; }
        const d = snap.data();
        setForm({
          title: d.title || "", category: normalizeCategory(d.category), live: d.live || "", image: d.image || "",
          order: d.order === undefined || d.order === null || d.order === "" ? "" : String(d.order),
        });
      } catch { setError("Could not load this project."); } finally { setLoading(false); }
    })();
  }, [id]);

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    const live = toUrl(form.live);
    const image = toUrl(form.image);
    if (!form.category) return setError("Please choose a category.");
    if (!live) return setError("Please enter a valid live link.");
    if (image === null) return setError("Thumbnail link is not valid.");

    setSaving(true);
    try {
      const { doc, addDoc, updateDoc, collection, deleteField } = await import("firebase/firestore");
      const db = await getDb();
      let order = form.order.trim() === "" ? null : Number(form.order);
      if (order !== null && !Number.isFinite(order)) { setSaving(false); return setError("Order must be a number."); }
      if (order === null) { // faka thakle sobar sheshe
        const all = await fetchProjectsClient({ all: true });
        order = all.reduce((m, p) => (p.order < 9999 ? Math.max(m, p.order) : m), 0) + 1;
      }
      const data = { title: form.title.trim(), category: form.category, live, image, order };
      if (id) {
        // purono field (description, tech, github, password) database theke muche jay
        await updateDoc(doc(db, "projects", id), { ...data, description: deleteField(), tech: deleteField(), code: deleteField(), password: deleteField() });
      } else {
        await addDoc(collection(db, "projects"), data);
      }
      await revalidateSite();
      router.push("/admin/dashboard");
    } catch (err) {
      console.error(err);
      setError("Could not save. Check your internet / Firestore rules and try again.");
      setSaving(false);
    }
  };

  if (loading) return <div className="grid place-items-center py-24"><FiLoader className="animate-spin text-3xl text-brand" /></div>;
  const preview = form.image.trim() && toUrl(form.image);

  return (
    <div className="mx-auto max-w-2xl">
      <Link href="/admin/dashboard" className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-brand"><FiArrowLeft /> Back to projects</Link>
      <h1 className="mt-4 font-display text-2xl font-extrabold text-ink sm:text-3xl">{id ? "Edit" : "Add"} <span className="grad-text">project</span></h1>

      <form onSubmit={onSubmit} className="mt-8 space-y-6 rounded-3xl border border-slate-200/70 bg-white p-6 shadow-soft sm:p-9">
        <div>
          <label className={label} htmlFor="title">Project name</label>
          <input id="title" className={field} required placeholder="e.g. Luxury Jewellery Store" value={form.title} onChange={set("title")} />
        </div>

        <div>
          <span className={label}>Category</span>
          <div className="grid gap-2 sm:grid-cols-3" role="radiogroup" aria-label="Category">
            {CATEGORIES.map((c) => (
              <button key={c} type="button" role="radio" aria-checked={form.category === c} onClick={() => setForm((f) => ({ ...f, category: c }))}
                className={`rounded-xl border px-4 py-3 text-sm font-semibold transition ${form.category === c ? "border-transparent text-white shadow-glow grad-bg" : "border-slate-200 bg-white text-slate-600 hover:border-brand hover:text-brand"}`}>
                {c}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className={label} htmlFor="live">Live link</label>
          <input id="live" className={field} required inputMode="url" placeholder="https://client-website.com" value={form.live} onChange={set("live")} />
        </div>

        <div>
          <label className={label} htmlFor="image">Thumbnail link <span className="font-normal normal-case tracking-normal text-slate-400">(optional)</span></label>
          <input id="image" className={field} inputMode="url" placeholder="Direct image link (https://...jpg / png)" value={form.image} onChange={set("image")} />
          {preview && <img src={preview} alt="Thumbnail preview" className="mt-3 aspect-[16/10] w-full max-w-xs rounded-xl border border-slate-200 object-cover object-top" onError={(e) => { e.currentTarget.style.display = "none"; }} />}
        </div>

        <div>
          <label className={label} htmlFor="order">Order <span className="font-normal normal-case tracking-normal text-slate-400">(optional, 1 = first)</span></label>
          <input id="order" className={field} type="number" inputMode="numeric" placeholder="Leave empty to add at the end" value={form.order} onChange={set("order")} />
        </div>

        {error && <p role="alert" className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>}

        <button type="submit" disabled={saving} className="btn-primary w-full">{saving ? "Saving..." : id ? "Save changes" : "Add project"}</button>
      </form>
    </div>
  );
}

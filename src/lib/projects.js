import { firebaseConfig } from "@/config/firebase";
import { normalizeCategory } from "./categories";

// Firestore document -> site er project object. Shudhu dorkari field gulo; baki (description, tech, github, password) ignore.
const str = (v) => (typeof v === "string" ? v.trim() : "");
export function normalizeProject(id, d = {}) {
  const order = Number(d.order);
  return {
    id,
    title: str(d.title),
    category: normalizeCategory(d.category),
    rawCategory: str(d.category),
    live: str(d.live),
    image: str(d.image),
    order: Number.isFinite(order) && d.order !== "" && d.order != null ? order : 9999,
  };
}
export const sortProjects = (list) => [...list].sort((a, b) => a.order - b.order || a.title.localeCompare(b.title));
export const cleanProjects = (list) => sortProjects(list.filter((p) => p.title));

// ---- Server side: Firestore REST API (public read). Firebase SDK lage na, tai server bundle halka ----
function decode(v) {
  if (!v || typeof v !== "object") return undefined;
  if ("stringValue" in v) return v.stringValue;
  if ("integerValue" in v) return Number(v.integerValue);
  if ("doubleValue" in v) return v.doubleValue;
  if ("booleanValue" in v) return v.booleanValue;
  if ("nullValue" in v) return null;
  if ("timestampValue" in v) return v.timestampValue;
  if ("arrayValue" in v) return (v.arrayValue.values || []).map(decode);
  if ("mapValue" in v) return Object.fromEntries(Object.entries(v.mapValue.fields || {}).map(([k, x]) => [k, decode(x)]));
  return undefined;
}

export async function fetchProjectsServer() {
  const base = process.env.FIRESTORE_BASE_URL || "https://firestore.googleapis.com";
  const root = `${base}/v1/projects/${firebaseConfig.projectId}/databases/(default)/documents/projects`;
  try {
    const out = []; let token = "";
    for (let i = 0; i < 5; i++) { // max ~1500 project
      const res = await fetch(`${root}?pageSize=300${token ? `&pageToken=${encodeURIComponent(token)}` : ""}`, { next: { revalidate: 60 }, signal: AbortSignal.timeout(10000) });
      if (!res.ok) throw new Error(`Firestore ${res.status}`);
      const json = await res.json();
      for (const doc of json.documents || []) {
        const fields = Object.fromEntries(Object.entries(doc.fields || {}).map(([k, v]) => [k, decode(v)]));
        out.push(normalizeProject(doc.name.split("/").pop(), fields));
      }
      token = json.nextPageToken || "";
      if (!token) break;
    }
    return cleanProjects(out);
  } catch (e) {
    console.error("[projects] server fetch failed:", e.message);
    return [];
  }
}

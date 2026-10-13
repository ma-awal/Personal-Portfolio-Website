// Client-only Firebase helper. Dynamic import, tai public page e Firebase tane na (shudhu lagle).
import { firebaseConfig } from "@/config/firebase";
import { normalizeProject, cleanProjects, sortProjects } from "./projects";

let appPromise;
const getApp = () => (appPromise ||= import("firebase/app").then(({ initializeApp, getApps, getApp }) => (getApps().length ? getApp() : initializeApp(firebaseConfig))));
export const getDb = async () => (await import("firebase/firestore")).getFirestore(await getApp());
export const getAuthInstance = async () => (await import("firebase/auth")).getAuth(await getApp());

// Browser theke projects (public section er fallback + admin dashboard)
// all: true hole title charao docs-o ashe (admin e dekhar jonno)
export async function fetchProjectsClient({ all = false } = {}) {
  const { collection, getDocs } = await import("firebase/firestore");
  const snap = await getDocs(collection(await getDb(), "projects"));
  const list = snap.docs.map((d) => normalizeProject(d.id, d.data()));
  return all ? sortProjects(list) : cleanProjects(list);
}

// Admin save er por public site tatkhonai update korar jonno (fail korle 60s er moddhe nijei update hoy)
export async function revalidateSite() {
  try {
    const user = (await getAuthInstance()).currentUser;
    if (!user) return;
    await fetch("/api/revalidate", { method: "POST", headers: { Authorization: `Bearer ${await user.getIdToken()}` } });
  } catch { /* ignore */ }
}

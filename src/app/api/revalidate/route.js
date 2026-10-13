import { revalidatePath } from "next/cache";
import { firebaseConfig } from "@/config/firebase";

// Admin project save/delete korle ei route call hoy -> public page cache fresh hoy.
// Login kora Firebase user chara kaj kore na (ID token Google diye verify kora hoy).
export async function POST(req) {
  const token = (req.headers.get("authorization") || "").replace(/^Bearer\s+/i, "");
  if (!token) return Response.json({ ok: false }, { status: 401 });
  try {
    const res = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${firebaseConfig.apiKey}`, {
      method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ idToken: token }), cache: "no-store",
    });
    const json = await res.json();
    if (!res.ok || !json.users?.length) return Response.json({ ok: false }, { status: 401 });
    // Optional: .env e ADMIN_EMAIL dile shudhu oi email-er user ei route chalate parbe
    const admin = (process.env.ADMIN_EMAIL || "").trim().toLowerCase();
    if (admin && String(json.users[0].email || "").toLowerCase() !== admin) return Response.json({ ok: false }, { status: 403 });
    revalidatePath("/");
    return Response.json({ ok: true });
  } catch {
    return Response.json({ ok: false }, { status: 500 });
  }
}

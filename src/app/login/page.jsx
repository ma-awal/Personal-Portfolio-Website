"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FiEye, FiEyeOff, FiLock } from "react-icons/fi";
import { getAuthInstance } from "@/lib/firebase";
import { useAdminAuth } from "@/components/admin/useAdminAuth";

const field = "w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3.5 text-[15px] text-white outline-none transition placeholder:text-slate-500 focus:border-brand focus:ring-4 focus:ring-brand/15";

export default function LoginPage() {
  const router = useRouter();
  const user = useAdminAuth({ redirect: false });
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => { if (user) router.replace("/admin/dashboard"); }, [user, router]);

  const onSubmit = async (e) => {
    e.preventDefault();
    setBusy(true); setError("");
    try {
      const { signInWithEmailAndPassword } = await import("firebase/auth");
      await signInWithEmailAndPassword(await getAuthInstance(), email.trim(), password);
      router.replace("/admin/dashboard");
    } catch (err) {
      setError(/network/i.test(err?.code || "") ? "Network problem. Please try again." : "Wrong email or password.");
      setBusy(false);
    }
  };

  return (
    <main className="relative isolate grid min-h-screen place-items-center overflow-hidden bg-ink px-4 py-10">
      <div aria-hidden="true" className="absolute inset-0 -z-10">
        <div className="absolute -left-32 -top-32 h-[420px] w-[420px] rounded-full bg-brand/25 blur-[130px]" />
        <div className="absolute -bottom-32 -right-24 h-[380px] w-[380px] rounded-full bg-violet/25 blur-[130px]" />
      </div>
      <form onSubmit={onSubmit} className="w-full max-w-md rounded-3xl border border-white/10 bg-white/[0.04] p-8 shadow-2xl backdrop-blur-xl sm:p-10">
        <span className="mx-auto grid h-14 w-14 place-items-center rounded-2xl text-xl text-white shadow-glow grad-bg"><FiLock /></span>
        <h1 className="mt-6 text-center font-display text-2xl font-extrabold text-white">Admin <span className="grad-text">Login</span></h1>
        <p className="mt-2 text-center text-sm text-slate-400">Sign in to manage your projects.</p>

        <div className="mt-8 space-y-4">
          <input className={field} type="email" required autoComplete="email" placeholder="Email" aria-label="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <div className="relative">
            <input className={`${field} pr-12`} type={show ? "text" : "password"} required autoComplete="current-password" placeholder="Password" aria-label="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button type="button" onClick={() => setShow((s) => !s)} aria-label={show ? "Hide password" : "Show password"} className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 text-slate-400 hover:text-white">
              {show ? <FiEyeOff /> : <FiEye />}
            </button>
          </div>
        </div>

        {error && <p role="alert" className="mt-4 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-300">{error}</p>}
        <button type="submit" disabled={busy} className="btn-primary mt-6 w-full">{busy ? "Signing in..." : "Sign in"}</button>
      </form>
    </main>
  );
}

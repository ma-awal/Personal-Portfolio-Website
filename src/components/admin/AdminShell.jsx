"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FiGrid, FiPlus, FiLogOut, FiExternalLink, FiLoader } from "react-icons/fi";
import { getAuthInstance } from "@/lib/firebase";
import { useAdminAuth } from "./useAdminAuth";

const links = [
  { href: "/admin/dashboard", label: "Projects", icon: FiGrid },
  { href: "/admin/add", label: "Add project", icon: FiPlus },
];

export default function AdminShell({ children }) {
  const user = useAdminAuth();
  const pathname = usePathname();

  const logout = async () => {
    const { signOut } = await import("firebase/auth");
    await signOut(await getAuthInstance());
  };

  if (!user) {
    return <div className="grid min-h-screen place-items-center bg-cream"><FiLoader className="animate-spin text-3xl text-brand" aria-label="Loading" /></div>;
  }

  const nav = (mobile) => links.map(({ href, label, icon: Icon }) => {
    const isActive = pathname === href || (href === "/admin/dashboard" && pathname.startsWith("/admin/edit"));
    return (
      <Link key={href} href={href} className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition ${isActive ? "text-white grad-bg shadow-glow" : mobile ? "bg-white text-slate-600" : "text-slate-400 hover:bg-white/5 hover:text-white"}`}>
        <Icon /> {label}
      </Link>
    );
  });

  return (
    <div className="min-h-screen bg-cream md:flex">
      <aside className="hidden w-64 shrink-0 flex-col bg-ink p-5 md:flex">
        <div className="flex items-center gap-2.5 px-2 py-3">
          <span className="grid h-9 w-9 place-items-center rounded-xl text-sm font-extrabold text-white grad-bg">AW</span>
          <span className="font-display text-lg font-bold text-white">Admin</span>
        </div>
        <nav className="mt-8 flex flex-1 flex-col gap-1.5">{nav(false)}</nav>
        <div className="space-y-2 border-t border-white/10 pt-4">
          <Link href="/" target="_blank" className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-slate-400 hover:bg-white/5 hover:text-white"><FiExternalLink /> View site</Link>
          <button type="button" onClick={logout} className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-red-300 hover:bg-red-500/10"><FiLogOut /> Log out</button>
        </div>
      </aside>

      <div className="min-w-0 flex-1">
        <header className="flex items-center justify-between gap-3 border-b border-slate-200 bg-white px-4 py-3 md:hidden">
          <span className="font-display text-lg font-bold text-ink">Admin</span>
          <button type="button" onClick={logout} className="inline-flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-xs font-semibold text-red-500"><FiLogOut /> Log out</button>
        </header>
        <div className="flex gap-2 overflow-x-auto px-4 pt-4 md:hidden">{nav(true)}</div>
        <main className="mx-auto w-full max-w-5xl p-4 sm:p-6 md:p-10">{children}</main>
      </div>
    </div>
  );
}

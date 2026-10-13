"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getAuthInstance } from "@/lib/firebase";

// undefined = check hocche, null = login nai (-> /login), object = logged in
export function useAdminAuth({ redirect = true } = {}) {
  const router = useRouter();
  const [user, setUser] = useState(undefined);
  useEffect(() => {
    let unsub = () => {};
    let alive = true;
    (async () => {
      const { onAuthStateChanged } = await import("firebase/auth");
      const auth = await getAuthInstance();
      unsub = onAuthStateChanged(auth, (u) => {
        if (!alive) return;
        setUser(u);
        if (!u && redirect) router.replace("/login");
      });
    })();
    return () => { alive = false; unsub(); };
  }, [router, redirect]);
  return user;
}

"use client";

import { useEffect } from "react";

/** Root landing: sniff the browser language, default to Russian (RU is the primary locale). */
export default function RootRedirect() {
  useEffect(() => {
    const lang = (navigator.language || "").toLowerCase().startsWith("en") ? "en" : "ru";
    window.location.replace(`${lang}/`);
  }, []);
  return null;
}

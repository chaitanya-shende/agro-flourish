"use client";

import { useEffect } from "react";

/**
 * On initial load, scroll to top when there is no hash in the URL.
 * This ensures visitors see the Hero first instead of a lower section (e.g. from restored scroll).
 */
export function ScrollToTop() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!window.location.hash) {
      window.history.scrollRestoration = "manual";
      window.scrollTo(0, 0);
    }
  }, []);
  return null;
}

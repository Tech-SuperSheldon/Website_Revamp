"use client";

import { useEffect } from "react";

// Toggles a scoped class on <html> so the browser scrollbar renders in blue
// (see the `html.uk-home-theme` rules in src/app/globals.css) only while
// /uk is mounted — removed on unmount so it never leaks onto "/" or "/uk/home".
export default function UKHomeThemeEffect() {
  useEffect(() => {
    document.documentElement.classList.add("uk-home-theme");
    return () => document.documentElement.classList.remove("uk-home-theme");
  }, []);

  return null;
}

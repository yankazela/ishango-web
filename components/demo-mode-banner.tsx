"use client";

import { useState, useEffect } from "react";
import { X, Sparkles } from "lucide-react";
import Link from "next/link";
import { useLocale } from "next-intl";

export function DemoModeBanner() {
  const locale = useLocale();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("demo") === "true") {
      setIsVisible(true);
    }
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-[60] bg-gradient-to-r from-accent via-teal-500 to-accent text-accent-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Sparkles className="h-4 w-4" />
          <span className="text-sm font-medium">
            Demo Mode — You&apos;re viewing Ishango Engine as an investor preview
          </span>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href={`/${locale}/investors`}
            className="text-xs font-medium bg-accent-foreground/20 hover:bg-accent-foreground/30 rounded-full px-3 py-1 transition-colors"
          >
            View Investor Page
          </Link>
          <button
            onClick={() => setIsVisible(false)}
            className="hover:bg-accent-foreground/20 rounded-full p-1 transition-colors"
            aria-label="Dismiss demo banner"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}

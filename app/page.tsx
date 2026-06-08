'use client';

import { useEffect } from 'react';

const SUPPORTED_LOCALES = ['en', 'fr', 'es', 'de', 'pt', 'ja'] as const;
type SupportedLocale = (typeof SUPPORTED_LOCALES)[number];

function detectLocale(): SupportedLocale {
  if (typeof navigator === 'undefined') return 'en';

  for (const lang of navigator.languages ?? [navigator.language]) {
    // Try exact match first (e.g. "pt-BR" → "pt"), then language prefix
    const code = lang.split('-')[0].toLowerCase() as SupportedLocale;
    if ((SUPPORTED_LOCALES as readonly string[]).includes(code)) {
      return code;
    }
  }
  return 'en';
}

export default function RootPage() {
  useEffect(() => {
    const locale = detectLocale();
    window.location.replace(`/${locale}/`);
  }, []);

  return null;
}

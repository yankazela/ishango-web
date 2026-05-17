import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { setRequestLocale, getMessages } from 'next-intl/server';

const SUPPORTED_LOCALES = ['en', 'fr', 'es', 'de', 'pt', 'ja'] as const;
type SupportedLocale = (typeof SUPPORTED_LOCALES)[number];

const LOCALE_HREFLANG: Record<SupportedLocale, string> = {
  en: 'en',
  fr: 'fr',
  es: 'es',
  de: 'de',
  pt: 'pt',
  ja: 'ja',
};

export function generateStaticParams() {
  return SUPPORTED_LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return {
    alternates: {
      canonical: `/${locale}/`,
      languages: Object.fromEntries(
        SUPPORTED_LOCALES.map((l) => [LOCALE_HREFLANG[l], `/${l}/`])
      ) as Record<string, string>,
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (typeof window !== 'undefined') {
    sessionStorage.setItem('locale', locale);
  }
  setRequestLocale(locale);

  const messages = await getMessages();

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      {children}
    </NextIntlClientProvider>
  );
}

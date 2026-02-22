import {getRequestConfig} from 'next-intl/server';
import {headers} from 'next/headers';

const SUPPORTED_LOCALES = ['en', 'fr', 'es'] as const;
type SupportedLocale = (typeof SUPPORTED_LOCALES)[number];
 
export default getRequestConfig(async ({requestLocale}) => {
  const headerList = await headers();
  const rawUrl =
    headerList.get('x-next-url') ??
    headerList.get('next-url') ??
    headerList.get('x-url') ??
    headerList.get('referer');

  let localeFromUrl: string | undefined;
  if (rawUrl) {
    try {
      const url = rawUrl.startsWith('http')
        ? new URL(rawUrl)
        : new URL(rawUrl, 'http://localhost');
      const segment = url.pathname.split('/').filter(Boolean)[0];
      if (segment) {
        localeFromUrl = segment;
      }
    } catch {
      // Ignore malformed URL and fall back to requestLocale
    }
  }

  const resolvedLocale = (localeFromUrl ?? (await requestLocale)) ?? 'en';
  const locale: SupportedLocale = SUPPORTED_LOCALES.includes(resolvedLocale as SupportedLocale)
    ? (resolvedLocale as SupportedLocale)
    : 'en';
 
  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default
  };
});
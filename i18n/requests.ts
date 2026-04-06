import {getRequestConfig} from 'next-intl/server';

const SUPPORTED_LOCALES = ['en', 'fr', 'es', 'de', 'pt', 'ja'] as const;
type SupportedLocale = (typeof SUPPORTED_LOCALES)[number];
 
export default getRequestConfig(async ({requestLocale}) => {
  const resolvedLocale = (await requestLocale) ?? 'en';
  const locale: SupportedLocale = SUPPORTED_LOCALES.includes(resolvedLocale as SupportedLocale)
    ? (resolvedLocale as SupportedLocale)
    : 'en';

  // Load the requested locale messages with English fallback for missing keys
  const localeMessages = (await import(`../messages/${locale}.json`)).default;
  const fallbackMessages = locale !== 'en'
    ? (await import(`../messages/en.json`)).default
    : {};
 
  return {
    locale,
    messages: {...fallbackMessages, ...localeMessages},
    onError(error) {
      // Silently handle missing messages during static export
      if (error.code === 'MISSING_MESSAGE') return;
      console.error(error);
    },
    getMessageFallback({key, namespace}) {
      return namespace ? `${namespace}.${key}` : key;
    }
  };
});
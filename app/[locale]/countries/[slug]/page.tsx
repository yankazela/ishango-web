import { COUNTRY_GUIDES } from "@/lib/countries";
import CountryArticleContent from "./country-article-content";

const SUPPORTED_LOCALES = ["en", "fr", "es", "de", "pt", "ja"] as const;

export const dynamicParams = false;

export async function generateStaticParams({
  params,
}: {
  params: { locale: (typeof SUPPORTED_LOCALES)[number] };
}) {
  if (!SUPPORTED_LOCALES.includes(params.locale)) {
    return [];
  }

  return COUNTRY_GUIDES.map((article) => ({
    slug: article.slug,
  }));
}

export default function CountryArticlePage() {
  return <CountryArticleContent />;
}
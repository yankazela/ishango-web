import type { Metadata } from 'next';
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

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const guide = COUNTRY_GUIDES.find((g) => g.slug === slug);
  if (!guide) return {};

  const title = guide.articleTitle;
  const description = guide.description;
  const url = `https://calcglobal.com/${locale}/countries/${slug}/`;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description,
    url,
    author: { '@type': 'Organization', name: 'CalcGlobal' },
    publisher: {
      '@type': 'Organization',
      name: 'CalcGlobal',
      url: 'https://calcglobal.com',
    },
  };

  return {
    title,
    description,
    openGraph: {
      title: `${title} | CalcGlobal`,
      description,
      url,
      type: 'article',
    },
    twitter: {
      title: `${title} | CalcGlobal`,
      description,
    },
    alternates: {
      canonical: url,
      languages: Object.fromEntries(
        SUPPORTED_LOCALES.map((l) => [l, `https://calcglobal.com/${l}/countries/${slug}/`])
      ) as Record<string, string>,
    },
    other: {
      'application-ld+json': JSON.stringify(jsonLd),
    },
  };
}

export default function CountryArticlePage() {
  return <CountryArticleContent />;
}
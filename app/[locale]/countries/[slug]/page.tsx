import { EbaseUrls } from "@/services/requests/types";
import CountryArticleContent from "./country-article-content";
import { Country } from "../store/state";

const SUPPORTED_LOCALES = ["en", "fr", "es", "de", "pt", "ja"] as const;
const BE_BASE_URL = EbaseUrls.ISHANGO_BE;

type ArticleSlug = { slug: string, code: string };

async function fetchArticleSlugs(): Promise<ArticleSlug[]> {
  try {
    const res = await fetch(`${BE_BASE_URL}/countries/articles/en`, {
      cache: "no-store",
    });
    if (!res.ok) return [];
    const articles: ArticleSlug[] = await res.json();
    return articles;
  } catch {
    return [];
  }
}

async function fetchCountriesWithCalculators(): Promise<Country[]> {
  try {
    const res = await fetch(`${BE_BASE_URL}/countries/calculators`, {
      cache: "no-store",
    });
    if (!res.ok) return [];
    const countries: Country[] = await res.json();
    return countries;
  } catch {
    return [];
  }
}

export async function generateStaticParams() {
  const articles = await fetchArticleSlugs();
  const countries = await fetchCountriesWithCalculators();

  return SUPPORTED_LOCALES.flatMap((locale) =>
    articles.map((article) => ({
      locale,
      slug: article.slug,
      calculators: countries.find((country) => country.code === article.code)?.calculators || [],
    }))
  );
}

export default function CountryArticlePage() {
  return <CountryArticleContent />;
}
import { fetchArticleIndex } from "@/lib/blog";
import { getArticleCards } from "../store/api";
import BlogArticlePageClient from "./article-page";

const SUPPORTED_LOCALES = ["en", "fr", "es", "de", "pt", "ja"] as const;

export async function generateStaticParams() {
  try {
    const localizedArticles = await Promise.all(
      SUPPORTED_LOCALES.map(async (locale) => ({
        locale,
        articles: await getArticleCards(locale),
      }))
    );

    return localizedArticles.flatMap(({ locale, articles }) =>
      articles.map((article) => ({
        locale,
        slug: article.slug,
      }))
    );
  } catch (error) {
    console.warn("Falling back to blog index for static params:", error);

    const index = await fetchArticleIndex('en');

    return index.articles.flatMap((article) => {
      if (
        article.locale &&
        SUPPORTED_LOCALES.includes(
          article.locale as (typeof SUPPORTED_LOCALES)[number]
        )
      ) {
        return [
          {
            locale: article.locale,
            slug: article.slug,
          },
        ];
      }

      return SUPPORTED_LOCALES.map((locale) => ({
        locale,
        slug: article.slug,
      }));
    });
  }
}

export default function BlogArticlePage() {
  return <BlogArticlePageClient />;
}

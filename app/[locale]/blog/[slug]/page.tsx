import { fetchArticleIndex } from "@/lib/blog";
import BlogArticlePageClient from "./article-page";

const SUPPORTED_LOCALES = ["en", "fr", "es", "de", "pt", "ja"] as const;

export async function generateStaticParams() {
  const index = await fetchArticleIndex();

  return index.articles.flatMap((article) => {
    if (article.locale && SUPPORTED_LOCALES.includes(article.locale as (typeof SUPPORTED_LOCALES)[number])) {
      return [{
        locale: article.locale,
        slug: article.slug,
      }];
    }

    return SUPPORTED_LOCALES.map((locale) => ({
      locale,
      slug: article.slug,
    }));
  });
}

export default function BlogArticlePage() {
  return <BlogArticlePageClient />;
}

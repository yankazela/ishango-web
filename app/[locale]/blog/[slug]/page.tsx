import localArticleIndex from "@/ishango-blog/indexes/index_en.json";
import BlogArticlePageClient from "./article-page";

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

  return localArticleIndex.articles.map((article) => ({
    slug: article.slug,
  }));
}

export default function BlogArticlePage() {
  return <BlogArticlePageClient />;
}

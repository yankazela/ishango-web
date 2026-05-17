import indexEn from "@/ishango-blog/indexes/index_en.json";
import indexFr from "@/ishango-blog/indexes/index_fr.json";
import indexEs from "@/ishango-blog/indexes/index_es.json";
import ResourcesArticlePageClient from "./article-page";

const LOCAL_INDEXES: Record<string, { articles: { slug: string }[] }> = {
  en: indexEn,
  fr: indexFr,
  es: indexEs,
};

export const dynamicParams = false;

export function generateStaticParams() {
  return Object.entries(LOCAL_INDEXES).flatMap(([locale, index]) =>
    index.articles.map((article) => ({ locale, slug: article.slug }))
  );
}

export default function ResourcesArticlePage() {
  return <ResourcesArticlePageClient />;
}

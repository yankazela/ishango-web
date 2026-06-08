import indexEn from "@/ishango-blog/indexes/index_en.json";
import indexFr from "@/ishango-blog/indexes/index_fr.json";
import indexEs from "@/ishango-blog/indexes/index_es.json";
import indexDe from "@/ishango-blog/indexes/index_de.json";
import indexJa from "@/ishango-blog/indexes/index_ja.json";
import indexPt from "@/ishango-blog/indexes/index_pt.json";
import ResourcesArticlePageClient from "./article-page";

const LOCAL_INDEXES: Record<string, { articles: { slug: string }[] }> = {
  en: indexEn,
  fr: indexFr,
  es: indexEs,
  de: indexDe,
  ja: indexJa,
  pt: indexPt,
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

"use client";

import { useEffect, useState, useMemo } from "react";
import { useTranslations, useLocale } from 'next-intl';
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { RootState } from "@/store/rootStore";
import {
  CALCULATOR_LABELS,
  type ArticleFrontmatter,
  type CalculatorType,
} from "@/lib/blog";
import {
  Search,
  Calendar,
  Clock,
  Globe,
  ArrowRight,
  BookOpen,
  Filter,
  X,
} from "lucide-react";
import { fetchArticleCardsStart } from "./store/slice";

// ─── Resources Listing Page ────────────────────────────────────────────

export default function ResourcesPage() {
  const locale = useLocale();
  const t = useTranslations('Resources');
  const dispatch = useDispatch();
  const  { loading, error, data: indexes } = useSelector((state: RootState) => state.blog.articleCards);
  const articles = indexes?.articles || [];
  

  // Filters
  const [search, setSearch] = useState("");
  const [selectedCountry, setSelectedCountry] = useState<string>("");
  const [selectedCalculator, setSelectedCalculator] = useState<string>("");

  useEffect(() => {
    dispatch(fetchArticleCardsStart(locale));
  }, [locale, dispatch]);

  // Derive filter options
  const countries = useMemo(
    () => [...new Set(articles.map((a) => a.country))].sort(),
    [articles]
  );
  const calculators = useMemo(
    () => [...new Set(articles.map((a) => a.calculator))].sort(),
    [articles]
  );

  // Apply filters
  const filtered = useMemo(() => {
    return articles.filter((a) => {
      if (search) {
        const q = search.toLowerCase();
        if (
          !a.title.toLowerCase().includes(q) &&
          !a.description.toLowerCase().includes(q) &&
          !a.country.toLowerCase().includes(q) &&
          !a.tags?.some((t) => t.toLowerCase().includes(q))
        )
          return false;
      }
      if (selectedCountry && a.country !== selectedCountry) return false;
      if (selectedCalculator && a.calculator !== selectedCalculator)
        return false;
      return true;
    });
  }, [articles, search, selectedCountry, selectedCalculator]);

  const hasFilters = search || selectedCountry || selectedCalculator;

  const clearFilters = () => {
    setSearch("");
    setSelectedCountry("");
    setSelectedCalculator("");
  };

  return (
    <main className="min-h-screen bg-background">
      <Header />

      <div className="pt-24 pb-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 rounded-full bg-teal-100 dark:bg-teal-900/40 px-4 py-1.5 text-sm font-medium text-teal-700 dark:text-teal-300 mb-6">
              <BookOpen className="h-4 w-4" />
              {t("TITLE")}
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-foreground">
              {t("TAX_FINANCE")}{" "}
              <span className="bg-gradient-to-r from-teal-600 via-emerald-500 to-teal-600 bg-clip-text text-transparent">
                {t("BLOG")}
              </span>
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              {t("MAIN_DESCRIPTION")}
            </p>
          </div>

          <div className="mb-10 space-y-4">
            <div className="relative max-w-xl mx-auto">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search articles by country, topic, or keyword..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full rounded-xl border border-border bg-card pl-10 pr-4 py-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-teal-500/40"
              />
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <select
                value={selectedCountry}
                onChange={(e) => setSelectedCountry(e.target.value)}
                className="rounded-lg border border-border bg-card px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/40"
              >
                <option value="">{t("ALL_COUNTRIES")}</option>
                {countries.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
              <select
                value={selectedCalculator}
                onChange={(e) => setSelectedCalculator(e.target.value)}
                className="rounded-lg border border-border bg-card px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/40"
              >
                <option value="">{t("ALL_CALCULATORS")}</option>
                {calculators.map((c) => (
                  <option key={c} value={c}>
                    {CALCULATOR_LABELS[c as CalculatorType]}
                  </option>
                ))}
              </select>

              {hasFilters && (
                <button
                  onClick={clearFilters}
                  className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  <X className="h-3 w-3" />
                  {t("CLEAR")}
                </button>
              )}
            </div>
          </div>

          {/* ─── Results ──────────────────────────────── */}
          {loading && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <ArticleCardSkeleton key={i} />
              ))}
            </div>
          )}

          {error && (
            <div className="text-center py-20">
              <BookOpen className="h-16 w-16 text-muted-foreground/30 mx-auto mb-4" />
              <h2 className="text-xl font-semibold mb-2">
                {t("UNABLE_TO_LOAD")}
              </h2>
              <p className="text-muted-foreground">
                {t("CHECK_CONNECTION")}
              </p>
            </div>
          )}

          {!loading && !error && filtered.length === 0 && (
            <div className="text-center py-20">
              <Search className="h-16 w-16 text-muted-foreground/30 mx-auto mb-4" />
              <h2 className="text-xl font-semibold mb-2">{t("ARTICLE_NOT_FOUND")}</h2>
              <p className="text-muted-foreground mb-4">
                {hasFilters
                  ? t("MESSAGE_1")
                  : t("MESSAGE_2")}
              </p>
              {hasFilters && (
                <Button variant="outline" onClick={clearFilters}>
                  {t("CLEAR_FILTERS")}
                </Button>
              )}
            </div>
          )}

          {!loading && !error && filtered.length > 0 && (
            <>
              <p className="text-sm text-muted-foreground mb-6">
                {filtered.length} article{filtered.length !== 1 ? "s" : ""}
                {hasFilters ? " matching your filters" : ""}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filtered.map((article) => (
                  <ArticleCard key={article.slug} article={article} />
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      <Footer />
    </main>
  );
}

// ─── Article Card ─────────────────────────────────────────────────

function ArticleCard({ article }: { article: ArticleFrontmatter }) {
  const locale = useLocale();
  const t = useTranslations('Resources');

  return (
    <Link
      href={`/${locale}/resources/${article.slug}`}
      className="group flex flex-col rounded-2xl border border-border bg-card hover:border-teal-300 dark:hover:border-teal-700 transition-all duration-200 hover:shadow-md overflow-hidden"
    >
      {/* Cover image */}
      {article.coverImage && (
        <div className="aspect-video overflow-hidden bg-muted">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={article.coverImage}
            alt={article.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
        </div>
      )}

      <div className="flex-1 p-5 flex flex-col">
        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-3">
          <span className="inline-flex items-center gap-1 rounded-full bg-teal-100 dark:bg-teal-900/40 px-2.5 py-0.5 text-xs font-medium text-teal-700 dark:text-teal-300">
            <Globe className="h-3 w-3" />
            {article.country}
          </span>
          <span className="inline-flex items-center rounded-full bg-muted px-2.5 py-0.5 text-xs font-medium text-muted-foreground">
            {CALCULATOR_LABELS[article.calculator]}
          </span>
        </div>

        {/* Title */}
        <h2 className="text-lg font-semibold text-foreground group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors line-clamp-2 mb-2">
          {article.title}
        </h2>

        {/* Description */}
        <p className="text-sm text-muted-foreground line-clamp-3 flex-1">
          {article.description}
        </p>

        {/* Meta */}
        <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              {new Date(article.date).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </span>
            {article.readingTime && (
              <span className="inline-flex items-center gap-1">
                <Clock className="h-3 w-3" />
                {article.readingTime} {t("MIN_READ")}
              </span>
            )}
          </div>
          <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity text-teal-600 dark:text-teal-400" />
        </div>
      </div>
    </Link>
  );
}

// ─── Skeleton ─────────────────────────────────────────────────────

function ArticleCardSkeleton() {
  return (
    <div className="rounded-2xl border border-border bg-card overflow-hidden">
      <Skeleton className="aspect-video w-full" />
      <div className="p-5 space-y-3">
        <div className="flex gap-2">
          <Skeleton className="h-5 w-16 rounded-full" />
          <Skeleton className="h-5 w-20 rounded-full" />
        </div>
        <Skeleton className="h-6 w-full" />
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-2/3" />
        <div className="flex gap-3 pt-2">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-4 w-16" />
        </div>
      </div>
    </div>
  );
}

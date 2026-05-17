"use client";

import { useEffect, useMemo } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/rootStore";
import {
  fetchCurrentArticleStart,
  fetchArticleCardsStart,
} from "@/app/[locale]/resources/store/slice";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { ArticleRenderer, stripExpertSections } from "@/components/blog/article-renderer";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  estimateReadingTime,
  CALCULATOR_LABELS,
} from "@/lib/blog";
import type { ArticleCardDetails } from "@/app/[locale]/resources/store/state";
import {
  ArrowLeft,
  Calendar,
  Clock,
  Globe,
  Tag,
  Share2,
  BookOpen,
  ChevronUp,
} from "lucide-react";

// ─── Article Page (Client) ────────────────────────────────────────

export default function ResourcesArticlePageClient() {
  const params = useParams<{ slug: string; locale: string }>();
  const locale = useLocale();
  const t = useTranslations("Resources");
  const dispatch = useDispatch();

  const featureFlags = useSelector((state: RootState) => state.featureFlags);
  const { currentArticle, articleCards } = useSelector(
    (state: RootState) => state.blog
  );

  // Fetch article content by slug
  useEffect(() => {
    if (!params.slug) return;
    dispatch(fetchCurrentArticleStart(params.slug as string));
  }, [params.slug, dispatch]);

  // Ensure article cards are loaded (for frontmatter)
  useEffect(() => {
    if (!articleCards.data && !articleCards.loading && !articleCards.error) {
      dispatch(fetchArticleCardsStart(locale));
    }
  }, [articleCards.data, articleCards.loading, articleCards.error, locale, dispatch]);

  // Find matching frontmatter from the article cards index
  const frontmatter = useMemo(() => {
    if (!articleCards.data?.articles || !params.slug) return null;
    return (
      articleCards.data.articles.find((a) => a.slug === params.slug) ?? null
    );
  }, [articleCards.data, params.slug]);

  const content =
    typeof currentArticle.data === "string"
      ? currentArticle.data
      : currentArticle.data?.content ?? null;
  const expertEnabled = featureFlags.featureFlags.data?.find(
    (flag) => flag.name === "DISPLAY_EXPERT"
  )?.isEnabled ?? false;
  const visibleContent = useMemo(() => {
    if (!content) return null;
    return expertEnabled ? content : stripExpertSections(content);
  }, [content, expertEnabled]);

  const loading = currentArticle.loading || articleCards.loading;
  const error = currentArticle.error || articleCards.error;

  // Scroll to top
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  // Share handler
  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({
        title: frontmatter?.title,
        url: window.location.href,
      });
    } else {
      await navigator.clipboard.writeText(window.location.href);
    }
  };

  return (
    <main className="min-h-screen bg-white dark:bg-background">
      <Header />

      <div className="pt-24 pb-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Back link */}
          <Link
            href={`/${locale}/resources`}
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
          >
            <ArrowLeft className="h-4 w-4" />
            {t("BACK_TO_ALL")}
          </Link>

          {loading && <ArticleSkeleton />}

          {error && (
            <div className="text-center py-20">
              <BookOpen className="h-16 w-16 text-muted-foreground/30 mx-auto mb-4" />
              <h2 className="text-2xl font-semibold mb-2">
                {t("ARTICLE_NOT_FOUND")}
              </h2>
              <p className="text-muted-foreground mb-6">
                {t("ARTICLE_NOT_FOUND_DESCRIPTION")}
              </p>
              <Button asChild>
                <Link href={`/${locale}/resources`}>{t("BROWSE_ALL_ARTICLES")}</Link>
              </Button>
            </div>
          )}

          {frontmatter && visibleContent && !loading && (
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-10">
              {/* ─── Main Content ─────────────────────────── */}
              <div>
                <ArticleHeader frontmatter={frontmatter} t={t} />

                {/* Markdown body */}
                <div className="mt-10">
                  <ArticleRenderer
                    content={visibleContent}
                    frontmatter={frontmatter}
                  />
                </div>
              </div>

              {/* ─── Sidebar ─────────────────────────────── */}
              <aside className="hidden lg:block">
                <div className="sticky top-24 space-y-6">
                  <ArticleSidebar
                    frontmatter={frontmatter}
                    content={visibleContent}
                    onShare={handleShare}
                    t={t}
                  />
                </div>
              </aside>
            </div>
          )}
        </div>
      </div>

      {/* Scroll to top */}
      <button
        onClick={scrollToTop}
        className="fixed bottom-6 right-6 z-40 flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg hover:opacity-90 transition-opacity"
        aria-label="Scroll to top"
      >
        <ChevronUp className="h-5 w-5" />
      </button>

      <Footer />
    </main>
  );
}

// ─── Article Header ───────────────────────────────────────────────

function ArticleHeader({frontmatter, t}: {frontmatter: ArticleCardDetails; t: ReturnType<typeof useTranslations>;}) {
  const readingTime = frontmatter.readingTime ?? estimateReadingTime("");

  return (
    <header>
      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-4">
        <span className="inline-flex items-center gap-1 rounded-full bg-teal-100 dark:bg-teal-900/40 px-3 py-1 text-xs font-medium text-teal-700 dark:text-teal-300">
          <Globe className="h-3 w-3" />
          {frontmatter.country}
        </span>
        <span className="inline-flex items-center rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground">
          {CALCULATOR_LABELS[frontmatter.calculator]}
        </span>
      </div>

      {/* Title */}
      <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground leading-tight">
        {frontmatter.title}
      </h1>

      {/* Description */}
      <p className="mt-4 text-lg text-muted-foreground leading-relaxed max-w-3xl">
        {frontmatter.description}
      </p>

      {/* Meta row */}
      <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
        <span className="inline-flex items-center gap-1.5">
          <Calendar className="h-4 w-4" />
          {new Date(frontmatter.date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </span>
        <span className="inline-flex items-center gap-1.5">
          <Clock className="h-4 w-4" />
          {readingTime} {t("MIN_READ")}
        </span>
        <span className="text-muted-foreground/40">·</span>
        <span>{t("By")} {frontmatter.author}</span>
      </div>
    </header>
  );
}

// ─── Sidebar ──────────────────────────────────────────────────────

function ArticleSidebar({
  frontmatter,
  content,
  onShare,
  t
}: {
  frontmatter: ArticleCardDetails;
  content: string;
  onShare: () => void;
  t: ReturnType<typeof useTranslations>;
}) {
  // Extract headings for table of contents
  const headings = content
    .split("\n")
    .filter((line) => /^#{2,3}\s/.test(line))
    .map((line) => {
      const level = line.match(/^(#+)/)?.[1].length ?? 2;
      const text = line.replace(/^#+\s*/, "");
      const id = text
        .toLowerCase()
        .replace(/[^\w\s-]/g, "")
        .replace(/\s+/g, "-");
      return { level, text, id };
    });

  return (
    <>
      {/* Table of contents */}
      {headings.length > 0 && (
        <div className="rounded-xl border border-border bg-gray-50 dark:bg-muted p-5">
          <h3 className="text-sm font-semibold text-foreground mb-3">
            {t("TABLE_OF_CONTENTS")}
          </h3>
          <nav className="space-y-1.5">
            {headings.map((h, i) => (
              <a
                key={i}
                href={`#${h.id}`}
                className={`block text-sm text-gray-600 dark:text-muted-foreground hover:text-foreground transition-colors ${
                  h.level === 3 ? "pl-4" : ""
                }`}
              >
                {h.text}
              </a>
            ))}
          </nav>
        </div>
      )}

      {/* Article info */}
      <div className="rounded-xl border border-border bg-card p-5">
        <h3 className="text-sm font-semibold text-foreground mb-3">
          {t("ARTICLE_DETAILS")}
        </h3>
        <div className="space-y-3 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">{t("COUNTRY")}</span>
            <span className="font-medium">{frontmatter.country}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">{t("CALCULATOR")}</span>
            <span className="font-medium">
              {CALCULATOR_LABELS[frontmatter.calculator]}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">{t("UPDATED")}</span>
            <span className="font-medium">
              {new Date(frontmatter.date).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </span>
          </div>
        </div>
      </div>

      {/* Tags */}
      {frontmatter.tags?.length > 0 && (
        <div className="rounded-xl border border-border bg-card p-5">
          <h3 className="text-sm font-semibold text-foreground mb-3">{t("TAGS")}</h3>
          <div className="flex flex-wrap gap-2">
            {frontmatter.tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center gap-1 rounded-full bg-muted px-2.5 py-1 text-xs text-muted-foreground"
              >
                <Tag className="h-3 w-3" />
                {tag}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Share */}
      <Button
        variant="outline"
        className="w-full gap-2"
        onClick={onShare}
      >
        <Share2 className="h-4 w-4" />
        {t("SHARE_ARTICLE")}
      </Button>
    </>
  );
}

// ─── Loading Skeleton ─────────────────────────────────────────────

function ArticleSkeleton() {
  return (
    <div className="max-w-3xl">
      <div className="flex gap-2 mb-4">
        <Skeleton className="h-6 w-20 rounded-full" />
        <Skeleton className="h-6 w-24 rounded-full" />
      </div>
      <Skeleton className="h-12 w-full mb-2" />
      <Skeleton className="h-12 w-3/4 mb-4" />
      <Skeleton className="h-6 w-full mb-2" />
      <Skeleton className="h-6 w-2/3 mb-6" />
      <div className="flex gap-4 mb-10">
        <Skeleton className="h-5 w-32" />
        <Skeleton className="h-5 w-24" />
        <Skeleton className="h-5 w-40" />
      </div>
      <Skeleton className="h-64 w-full rounded-2xl mb-10" />
      {Array.from({ length: 8 }).map((_, i) => (
        <Skeleton key={i} className="h-5 w-full mb-3" />
      ))}
    </div>
  );
}

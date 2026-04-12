// ─── Blog Types & S3 Fetch Utilities ───────────────────────────────

/**
 * Configuration:
 *   Set NEXT_PUBLIC_BLOG_BUCKET_URL in your .env.local to the public URL
 *   of the S3 bucket (or CloudFront distribution) that hosts MDX files.
 *
 *   Expected S3 structure:
 *     {bucket}/articles/index.json          ← manifest of all articles
 *     {bucket}/articles/{slug}.mdx          ← individual article content
 *     {bucket}/articles/images/…            ← images referenced in articles
 */

const BLOG_BUCKET_URL =
  process.env.NEXT_PUBLIC_BLOG_BUCKET_URL ??
  "https://ishango-blog.s3.amazonaws.com";

// ─── Types ─────────────────────────────────────────────────────────

export interface ArticleFrontmatter {
  title: string;
  slug: string;
  description: string;
  country: string;
  countryCode: string;       // ISO 3166-1 alpha-2 (e.g. "DE", "BR")
  calculator: CalculatorType;
  date: string;              // ISO date "2026-04-01"
  author: string;
  tags: string[];
  coverImage?: string;       // relative path in the S3 bucket
  readingTime?: number;      // minutes
  locale?: string;           // "en" | "de" | "es" | "fr" | "ja" | "pt"
}

export type CalculatorType =
  | "INCOME_TAX_CALCULATOR"
  | "CORPORATE_TAX_CALCULATOR"
  | "MORTGAGE_CALCULATOR"
  | "CAPITAL_GAINS_TAX_CALCULATOR"
  | "INHERITANCE_TAX_CALCULATOR";

export interface ArticleIndex {
  articles: ArticleFrontmatter[];
  updatedAt: string;
}

export interface ArticleData {
  frontmatter: ArticleFrontmatter;
  content: string;           // raw markdown body (frontmatter stripped)
}

// ─── Fetch Helpers ─────────────────────────────────────────────────

/** Fetch the article index manifest from S3. */
export async function fetchArticleIndex(): Promise<ArticleIndex> {
//   const res = await fetch(`${BLOG_BUCKET_URL}/articles/index.json`, {
//     cache: "no-store",
//   });
//   if (!res.ok) throw new Error(`Failed to fetch article index: ${res.status}`);
//   return res.json();
    return (
        {
            "articles": [
                {
                "title": "How to Calculate Income Tax in Germany (2026)",
                "slug": "income-tax-germany-2026",
                "description": "Step-by-step guide to calculating income tax in Germany...",
                "country": "GERMANY",
                "countryCode": "DE",
                "calculator": "INCOME_TAX_CALCULATOR",
                "date": "2026-04-01",
                "author": "Ishango Engine Team",
                "tags": ["income-tax", "germany", "europe"],
                "locale": "en",
                "readingTime": 8
                }
            ],
            "updatedAt": "2026-04-11"
        }
    );
}


// ─── Helpers ──────────────────────────────────────────────────────

export const CALCULATOR_LABELS: Record<CalculatorType, string> = {
  "INCOME_TAX_CALCULATOR": "Income Tax",
  "CORPORATE_TAX_CALCULATOR": "Corporate Tax",
  "MORTGAGE_CALCULATOR": "Mortgage",
  "CAPITAL_GAINS_TAX_CALCULATOR": "Capital Gains Tax",
  "INHERITANCE_TAX_CALCULATOR": "Inheritance Tax",
};

export function estimateReadingTime(content: string): number {
  const words = content.split(/\s+/).length;
  return Math.max(1, Math.ceil(words / 200));
}

export function getBlogImageUrl(path: string): string {
  if (path.startsWith("http")) return path;
  return `${BLOG_BUCKET_URL}/articles/images/${path}`;
}

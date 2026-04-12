"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import rehypeSlug from "rehype-slug";
import type { Components } from "react-markdown";
import { CalculatorEmbed, ExpertCTA, Callout } from "./mdx-components";
import type { CalculatorType, ArticleFrontmatter } from "@/lib/blog";
import { RootState } from "@/store/rootStore";
import { useSelector } from "react-redux";

// ─── Custom renderers for react-markdown ─────────────────────────

export function stripExpertSections(content: string): string {
    return content
        .replace(/^\s*#{1,6}\s+.*(?:expert|advisor|adviser).*$/gim, "")
        .replace(/^\s*.*need\s+expert\s+help.*$/gim, "")
        .replace(/^\s*.*browse\s+.*experts.*$/gim, "")
        .replace(/^\s*.*verified\s+financial\s+expert.*$/gim, "")
        .replace(
            /(?:^|\n)#{2,6}\s+[^\n]*(?:expert|advisor|adviser)[^\n]*\n(?:\n?(?!#{1,6}\s|```)[^\n]*){0,6}\n```\s*\nexpert-cta:[^\n]*\n```\s*/gim,
            "\n"
        )
        .replace(/\n?```\s*\nexpert-cta:[^\n]*\n```\s*\n?/gim, "\n")
        .replace(/\n{3,}/g, "\n\n");
}

function createComponents(
    frontmatter: ArticleFrontmatter,
    expertEnabled: boolean
): Components {
    return {
        // ── Code blocks: handle special languages for embeds ──
        code({ className, children }) {
        const value = String(children).trim();
        const languageDirective = className?.startsWith("language-")
            ? className.replace("language-", "")
            : "";
        const directive = languageDirective || value;

        // ```calculator:income-tax:DE```
        if (directive.startsWith("calculator:")) {
            const parts = directive.split(":");
            const type = parts[1] as CalculatorType;
            const countryCode = parts[2] || frontmatter.countryCode;
            return <CalculatorEmbed type={type} countryCode={countryCode} />;
        }

        // ```expert-cta:DE```
        if (directive.startsWith("expert-cta:")) {
            if (!expertEnabled) {
                return null;
            }

            const parts = directive.split(":");
            const countryCode = parts[1] || frontmatter.countryCode;
            return (
                <ExpertCTA
                    countryCode={countryCode}
                    country={frontmatter.country}
                />
            );
        }

        // ```callout:tip```  or  ```callout:warning```
        if (directive.startsWith("callout:")) {
            const type = directive.split(":")[1] as "info" | "warning" | "tip";
            const text = value.split("\n").slice(1).join("\n");
            return <Callout type={type}>{text}</Callout>;
        }

        // Regular code block
            return (
                <code
                className={`${className ?? ""} rounded bg-muted px-1.5 py-0.5 text-sm font-mono`}
                >
                {children}
                </code>
            );
        },

        // ── Pre: pass through for code blocks ──
        pre({ children }) {
            return (
                <pre className="my-4 overflow-x-auto rounded-lg border border-border bg-muted/50 p-4 text-sm">
                {children}
                </pre>
            );
        },

        // ── Headings with anchor links ──
        h1({ children, id }) {
            return (
                <h1 id={id} className="mt-10 mb-4 text-3xl font-bold tracking-tight scroll-mt-20">
                {children}
                </h1>
            );
        },
        h2({ children, id }) {
            return (
                <h2 id={id} className="mt-8 mb-3 text-2xl font-semibold tracking-tight scroll-mt-20 border-b border-border pb-2">
                {children}
                </h2>
            );
        },
        h3({ children, id }) {
            return (
                <h3 id={id} className="mt-6 mb-2 text-xl font-semibold scroll-mt-20">
                {children}
                </h3>
            );
        },
        h4({ children, id }) {
            return (
                <h4 id={id} className="mt-4 mb-2 text-lg font-medium scroll-mt-20">
                {children}
                </h4>
            );
        },

        // ── Paragraph ──
        p({ children }) {
            return (
                <p className="mb-4 leading-7 text-muted-foreground">{children}</p>
            );
        },

        // ── Lists ──
        ul({ children }) {
            return <ul className="mb-4 ml-6 list-disc space-y-1">{children}</ul>;
        },
        ol({ children }) {
            return <ol className="mb-4 ml-6 list-decimal space-y-1">{children}</ol>;
        },
        li({ children }) {
            return <li className="leading-7 text-muted-foreground">{children}</li>;
        },

        // ── Blockquote → Callout ──
        blockquote({ children }) {
            return <Callout type="info">{children}</Callout>;
        },

        // ── Table ──
        table({ children }) {
            return (
                <div className="my-6 overflow-x-auto rounded-lg border border-border">
                <table className="w-full text-sm">{children}</table>
                </div>
            );
        },
        thead({ children }) {
            return <thead className="bg-muted/50 border-b border-border">{children}</thead>;
        },
        th({ children }) {
            return (
                <th className="px-4 py-3 text-left font-semibold text-foreground">
                {children}
                </th>
            );
        },
        td({ children }) {
            return (
                <td className="px-4 py-3 text-muted-foreground border-t border-border">
                {children}
                </td>
            );
        },

        // ── Links ──
        a({ href, children }) {
        const isExternal = href?.startsWith("http");
            return (
                <a
                href={href}
                className="text-teal-600 dark:text-teal-400 underline underline-offset-4 hover:text-teal-700 dark:hover:text-teal-300 transition-colors"
                {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                >
                {children}
                </a>
            );
        },

        // ── Horizontal rule ──
        hr() {
            return <hr className="my-8 border-border" />;
        },

        // ── Images ──
        img({ src, alt }) {
            return (
                <figure className="my-6">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                    src={src}
                    alt={alt ?? ""}
                    className="rounded-lg border border-border w-full"
                    loading="lazy"
                />
                {alt && (
                    <figcaption className="mt-2 text-center text-sm text-muted-foreground">
                    {alt}
                    </figcaption>
                )}
                </figure>
            );
        },

        // ── Strong / Em ──
        strong({ children }) {
            return <strong className="font-semibold text-foreground">{children}</strong>;
        },
    };
}

// ─── Main Renderer ───────────────────────────────────────────────

interface ArticleRendererProps {
  content: string;
  frontmatter: ArticleFrontmatter;
}

export function ArticleRenderer({ content, frontmatter }: ArticleRendererProps) {
    const featureFlags = useSelector((state: RootState) => state.featureFlags);
    const expertEnabled = featureFlags.featureFlags.data?.find(
        (flag) => flag.name === "DISPLAY_EXPERT"
    )?.isEnabled ?? false;
    
    const normalizedContent = expertEnabled ? content : stripExpertSections(content);
    const components = createComponents(frontmatter, expertEnabled);

  return (
    <article className="prose-custom max-w-none">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw, rehypeSlug]}
        components={components}
      >
                {normalizedContent}
      </ReactMarkdown>
    </article>
  );
}

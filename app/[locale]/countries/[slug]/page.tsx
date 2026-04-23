import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, BookOpen, CheckCircle2, Globe2 } from "lucide-react";

import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  COUNTRY_GUIDES,
  getCountryFlagIconCode,
  getCountryGuideBySlug,
} from "@/lib/countries";

const SUPPORTED_LOCALES = ["en", "fr", "es", "de", "pt", "ja"] as const;

export function generateStaticParams() {
  return SUPPORTED_LOCALES.flatMap((locale) =>
    COUNTRY_GUIDES.map((country) => ({
      locale,
      slug: country.slug,
    }))
  );
}

export default async function CountryArticlePage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const country = getCountryGuideBySlug(slug);

  if (!country) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-24 pb-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <Link
            href={`/${locale}/countries`}
            className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to countries
          </Link>

          <div className="grid gap-8 lg:grid-cols-[1.25fr_0.75fr]">
            <div>
              <Badge variant="secondary" className="mb-4 gap-2 px-3 py-1">
                <Globe2 className="h-3.5 w-3.5" />
                {country.name}
              </Badge>

              <div className="mb-6 flex items-center gap-4">
                <span className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-card">
                  <span
                    className={`fi fi-${getCountryFlagIconCode(country.code)} rounded-sm text-5xl leading-none shadow-sm`}
                    aria-label={country.name}
                  />
                </span>
                <div>
                  <h1 className="text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
                    {country.articleTitle}
                  </h1>
                  <p className="mt-3 text-lg text-muted-foreground">
                    {country.articleIntro}
                  </p>
                </div>
              </div>

              <Card className="mb-8 border-border/70 bg-card/70">
                <CardHeader>
                  <CardTitle>Why this country matters</CardTitle>
                  <CardDescription>
                    A quick overview of how this market fits into your calculator and API workflows.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4 text-muted-foreground">
                  {country.overview.map((paragraph) => (
                    <p key={paragraph} className="leading-7">
                      {paragraph}
                    </p>
                  ))}
                </CardContent>
              </Card>

              <Card className="border-border/70 bg-card/70">
                <CardHeader>
                  <CardTitle>Available calculators in our system</CardTitle>
                  <CardDescription>
                    Jump directly into the tools currently available for {country.name}.
                  </CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4 sm:grid-cols-2">
                  {country.calculators.map((calculator) => (
                    <Link
                      key={calculator.label}
                      href={`/${locale}${calculator.href}`}
                      className="rounded-xl border border-border bg-background/60 p-4 transition-colors hover:border-accent/40"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="font-medium text-foreground">{calculator.label}</p>
                          <p className="mt-1 text-sm text-muted-foreground">
                            Open the {calculator.label.toLowerCase()} calculator for {country.name}.
                          </p>
                        </div>
                        <ArrowRight className="h-4 w-4 text-muted-foreground" />
                      </div>
                    </Link>
                  ))}
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <Card className="border-border/70 bg-card/70">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BookOpen className="h-5 w-5 text-accent" />
                    Market snapshot
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {country.highlights.map((highlight) => (
                    <div key={highlight} className="flex items-center gap-3 text-sm text-muted-foreground">
                      <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                      <span>{highlight}</span>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card className="border-border/70 bg-card/70">
                <CardHeader>
                  <CardTitle>Country summary</CardTitle>
                  <CardDescription>
                    A quick briefing for product, API, and calculator use cases.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="leading-7 text-muted-foreground">{country.summary}</p>
                </CardContent>
              </Card>

              <Card className="border-border/70 bg-card/70">
                <CardHeader>
                  <CardTitle>Start exploring</CardTitle>
                  <CardDescription>
                    Open the full countries list or jump into a calculator experience.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button asChild className="w-full">
                    <Link href={`/${locale}/countries`}>View all countries</Link>
                  </Button>
                  <Button asChild variant="outline" className="w-full">
                    <Link href={`/${locale}${country.calculators[0].href}`}>
                      Open {country.calculators[0].label}
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
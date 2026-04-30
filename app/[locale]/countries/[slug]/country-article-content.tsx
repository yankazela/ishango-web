"use client";

import { useEffect, useMemo } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft, ArrowRight, BookOpen, CheckCircle2, Globe2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useLocale, useTranslations } from "next-intl";

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
import { getCountryFlagIconCode } from "@/lib/countries";
import { RootState } from "@/store/rootStore";
import { CalculatorType } from "@/app/[locale]/calculators/types";
import { fetchArticles, fetchCountries } from "../store/slice";

export default function CountryArticleContent() {
  const locale = useLocale();
  const t = useTranslations('Countries');
  const params = useParams<{ slug: string }>();
  const dispatch = useDispatch();

  const { countries, articles } = useSelector((state: RootState) => state.countries);
  const slug = Array.isArray(params.slug) ? params.slug[0] : params.slug;

  const CALCULATOR_META: Record<string, { label: string; href: string }> = {
    INCOME_TAX: { label: t('INCOME_TAX_CALCULATOR'), href: "/calculators/income-tax" },
    MORTGAGE: { label: t('MORTGAGE_CALCULATOR'), href: "/calculators/mortgage" },
    INHERITANCE_TAX: {
        label: t('INHERITANCE_TAX_CALCULATOR'),
        href: "/calculators/inheritance-tax",
    },
    CORPORATE_TAX: { label: t('CORPORATE_TAX_CALCULATOR'), href: "/calculators/corporate-tax" },
    CAPITAL_GAINS: {
        label: t('CAPITAL_GAINS_TAX_CALCULATOR'),
        href: "/calculators/capital-gains-tax",
    },
};

  useEffect(() => {
    dispatch(fetchCountries());
    dispatch(fetchArticles({ language: locale }));
  }, [dispatch, locale]);

  const countryArticle = useMemo(
    () => articles.items.find((article) => article.slug === slug),
    [articles.items, slug]
  );

  const countryData = useMemo(
    () => countries.items.find((entry) => entry.code === countryArticle?.code),
    [countries.items, countryArticle?.code]
  );

  const calculators = useMemo(() => {
    if (!countryData) {
      return [];
    }

    return countryData.calculators
      .map((calculator) => CALCULATOR_META[calculator.name])
      .filter(Boolean);
  }, [countryData]);

  if (articles.loading || countries.loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-24 pb-16">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <p className="text-muted-foreground">{t('LOADING')}</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!countryArticle) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-24 pb-16">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <p className="text-muted-foreground">{t('COUNTRY_NOT_FOUND')}</p>
          </div>
        </main>
        <Footer />
      </div>
    );
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
            {t('BACK_TO_COUNTRIES')}
          </Link>

          <div className="grid gap-8 lg:grid-cols-[1.25fr_0.75fr]">
            <div>
              <Badge variant="secondary" className="mb-4 gap-2 px-3 py-1">
                <Globe2 className="h-3.5 w-3.5" />
                {countryArticle.name}
              </Badge>

              <div className="mb-6 flex items-center gap-4">
                <span className="inline-flex h-16 w-16 items-center justify-center">
                  <span
                    className={`fi fi-${getCountryFlagIconCode(countryArticle.code)} rounded-sm text-5xl leading-none shadow-sm`}
                    aria-label={countryArticle.name}
                  />
                </span>
                <div>
                  <h1 className="text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
                    {countryArticle.articleTitle}
                  </h1>
                  <p className="mt-3 text-lg text-muted-foreground">
                    {countryArticle.articleIntro}
                  </p>
                </div>
              </div>

              <Card className="mb-8 border-border/70 bg-card/70">
                <CardHeader>
                  <CardTitle>{t('WHY_THIS_MATTERS')}</CardTitle>
                  <CardDescription>
                    {t('QUICK_OVERVIEW')}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4 text-muted-foreground">
                  {countryArticle.overview.map((paragraph) => (
                    <p key={paragraph} className="leading-7">
                      {paragraph}
                    </p>
                  ))}
                </CardContent>
              </Card>

              <Card className="border-border/70 bg-card/70">
                <CardHeader>
                  <CardTitle>{t('AVAILABLE_CALCULATORS')}</CardTitle>
                  <CardDescription>
                    {t('JUMP_TO_SECTION', { country: countryArticle.name })}
                  </CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4 sm:grid-cols-2">
                  {calculators.map((calculator) => (
                    <Link
                      key={calculator.label}
                      href={`/${locale}${calculator.href}?country=${countryArticle.code.toLowerCase()}`}
                      className="rounded-xl border border-border bg-background/60 p-4 transition-colors hover:border-accent/40"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="font-medium text-foreground">{calculator.label}</p>
                          <p className="mt-1 text-sm text-muted-foreground">
                            {t('OPEN_THE')} {calculator.label}
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
                    {t('MARKET_SNAPSHOT')}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {countryArticle.highlights.map((highlight) => (
                    <div key={highlight} className="flex items-center gap-3 text-sm text-muted-foreground">
                      <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                      <span>{highlight}</span>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card className="border-border/70 bg-card/70">
                <CardHeader>
                  <CardTitle>{t('COUNTRY_SUMMARY')}</CardTitle>
                  <CardDescription>
                    {t('QUICK_BRIEFING')}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="leading-7 text-muted-foreground">{countryArticle.summary}</p>
                </CardContent>
              </Card>

              <Card className="border-border/70 bg-card/70">
                <CardHeader>
                  <CardTitle>{t('START_EXPLORING')}</CardTitle>
                  <CardDescription>
                    {t('OPEN_THE_FULL_LIST')}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button asChild className="w-full">
                    <Link href={`/${locale}/countries`}>{t('VIEW_ALL_COUNTRIES')}</Link>
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

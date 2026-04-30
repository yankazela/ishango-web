"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowRight, Globe2, MapPinned } from "lucide-react";
import { getCountryFlagIconCode } from "@/lib/countries";
import { fetchCountries, fetchArticles } from "./store/slice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/rootStore";
import { useLocale, useTranslations } from "next-intl";

export default function CountriesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const locale = useLocale();
  const t = useTranslations('Countries');
  const dispatch = useDispatch();
  const { countries, articles } = useSelector((state: RootState) => state.countries);

  useEffect(() => {
    dispatch(fetchCountries());
    dispatch(fetchArticles({ language: locale }));
  }, [dispatch, locale]);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-24 pb-16">
        <section className="border-b border-border bg-gradient-to-b from-muted/30 to-background">
          <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
            <div className="max-w-3xl">
              <Badge variant="secondary" className="mb-4 gap-2 px-3 py-1">
                <Globe2 className="h-3.5 w-3.5" />
                {t('TOP_TAG')}
              </Badge>
              <h1 className="text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
                {t('TITLE')}{" "}
                <span className="bg-gradient-to-r from-teal-600 via-emerald-500 to-teal-600 bg-clip-text text-transparent">
                  IShango
                </span>
              </h1>
              <p className="mt-4 text-lg leading-8 text-muted-foreground">
                {t('DESCRIPTION')}
              </p>

              <div className="mt-8 flex flex-wrap gap-4 text-sm text-muted-foreground">
                <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2">
                  <MapPinned className="h-4 w-4 text-accent" />
                  {t('LOWER_TAG_1')}
                </div>
                <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2">
                  <Globe2 className="h-4 w-4 text-accent" />
                  {t('LOWER_TAG_2')}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 lg:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-10 max-w-3xl">
              <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
                {t('BROWSE_COUNTRIES')}
              </h2>
              <p className="mt-3 text-lg text-muted-foreground">
                {t('SUBTITLE1')}
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {countries.items.map((country) => (
                <Link key={country.code} href={`/${locale}/countries/${country.name.toLowerCase()}`} className="h-full">
                  <Card className="h-full border-border/70 bg-card/80 transition-all hover:-translate-y-0.5 hover:border-accent/50 hover:shadow-md">
                    <CardHeader>
                      <div className="mb-3 flex items-center gap-4">
                        <span className="inline-flex h-14 w-14 items-center justify-center">
                          <span
                            className={`fi fi-${getCountryFlagIconCode(country.code)} rounded-sm text-4xl leading-none shadow-sm`}
                            aria-label={country.name}
                          />
                        </span>
                        <div>
                          <CardTitle>{t(country.name)}</CardTitle>
                          <CardDescription>{country.code}</CardDescription>
                        </div>
                      </div>
                      <CardDescription className="min-h-16 leading-6">
                        {t(`${country.code}_TEXT1`)}
                      </CardDescription>
                    </CardHeader>

                    <CardContent>
                      <p className="mb-4 text-sm leading-6 text-muted-foreground">
                        {t(`${country.code}_TEXT2`)}
                      </p>

                      <div className="mb-5 flex flex-wrap gap-2">
                        {country.calculators.map((calculator) => (
                          <Badge key={calculator.id} variant="outline">
                            {t(calculator.name)}
                          </Badge>
                        ))}
                      </div>

                      <div className="inline-flex items-center gap-2 text-sm font-medium text-accent">
                        {t('READ_COUNTRY_ARTICLE')}
                        <ArrowRight className="h-4 w-4" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
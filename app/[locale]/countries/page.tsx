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
import { COUNTRY_GUIDES, getCountryFlagIconCode } from "@/lib/countries";

export default async function CountriesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-24 pb-16">
        <section className="border-b border-border bg-gradient-to-b from-muted/30 to-background">
          <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
            <div className="max-w-3xl">
              <Badge variant="secondary" className="mb-4 gap-2 px-3 py-1">
                <Globe2 className="h-3.5 w-3.5" />
                Global coverage
              </Badge>
              <h1 className="text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
                Countries supported by Ishango Engine
              </h1>
              <p className="mt-4 text-lg leading-8 text-muted-foreground">
                Explore the markets currently supported across our financial
                calculators and API products, with new countries added on a
                rolling basis.
              </p>

              <div className="mt-8 flex flex-wrap gap-4 text-sm text-muted-foreground">
                <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2">
                  <MapPinned className="h-4 w-4 text-accent" />
                  50+ countries available
                </div>
                <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2">
                  <Globe2 className="h-4 w-4 text-accent" />
                  Multi-region calculator coverage
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 lg:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-10 max-w-3xl">
              <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
                Browse countries by coverage
              </h2>
              <p className="mt-3 text-lg text-muted-foreground">
                Each country card shows the calculator types available in our
                system and links to a country article with more context.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {COUNTRY_GUIDES.map((country) => (
                <Link key={country.code} href={`/${locale}/countries/${country.slug}`}>
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
                          <CardTitle>{country.name}</CardTitle>
                          <CardDescription>{country.code}</CardDescription>
                        </div>
                      </div>
                      <CardDescription className="min-h-16 leading-6">
                        {country.description}
                      </CardDescription>
                    </CardHeader>

                    <CardContent>
                      <p className="mb-4 text-sm leading-6 text-muted-foreground">
                        {country.summary}
                      </p>

                      <div className="mb-5 flex flex-wrap gap-2">
                        {country.calculators.map((calculator) => (
                          <Badge key={calculator.label} variant="outline">
                            {calculator.label}
                          </Badge>
                        ))}
                      </div>

                      <div className="inline-flex items-center gap-2 text-sm font-medium text-accent">
                        Read country article
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
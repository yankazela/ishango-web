import { Globe2, Shield, TrendingUp, Home } from "lucide-react";
import type { Metadata } from "next";
import { useTranslations } from 'next-intl';
  
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { MortgageCalculator } from "@/components/mortgage-calculator";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: "Mortgage Calculator - CalcGlobal",
  description:
    "Calculate your mortgage payments across multiple countries. See monthly payments, total interest, amortization schedules, and more.",
};

export default function MortgagePage() {
  const t = useTranslations('MortgageCalculator');

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-24 pb-20">
        {/* Hero Section */}
        <section className="relative overflow-hidden">
          {/* Background Gradients */}
          <div className="absolute inset-0 -z-10">
            <div className="absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full bg-gradient-to-br from-accent/25 via-accent/10 to-transparent blur-3xl" />
            <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full bg-gradient-to-bl from-teal-400/15 via-emerald-300/10 to-transparent blur-3xl" />
            <div className="absolute bottom-0 left-1/3 w-[300px] h-[300px] rounded-full bg-gradient-to-t from-emerald-400/10 to-transparent blur-3xl" />
          </div>

          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <Badge variant="secondary" className="mb-4">
                <Home className="h-3 w-3 mr-1" />
                {t('MULTI_COUNTRY_SUPPORT')}
              </Badge>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-foreground mb-4 text-balance">
                {t('TITLE')}
              </h1>
              <p className="text-lg text-muted-foreground text-balance">
                {t('DESCRIPTION')}
              </p>
            </div>

            {/* Features */}
            <div className="flex flex-wrap justify-center gap-6 mb-12">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Shield className="h-4 w-4 text-accent" />
                <span>{t('ACCURATE_PMI_ESTIMATES')}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <TrendingUp className="h-4 w-4 text-accent" />
                <span>{t('CUSTOMIZABLE_AMORTIZATION_SCHEDULES')}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Globe2 className="h-4 w-4 text-accent" />
                <span>{t('COUNTRY_SPECIFIC_RATES')}</span>
              </div>
            </div>

            {/* Calculator */}
            <MortgageCalculator />
          </div>
        </section>

        {/* Info Section */}
        <section className="py-16 border-t border-border">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-3 gap-8">
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {t('UNDERSTANDING_YOUR_PAYMENT')}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {t('UNDERSTANDING_YOUR_PAYMENT_DESC')}
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {t('PRIVATE_MORTGAGE_INSURANCE')}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {t('PRIVATE_MORTGAGE_INSURANCE_DESC')}
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {t('AMORTIZATION_EXPLAINED')}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {t('AMORTIZATION_EXPLAINED_DESC')}
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

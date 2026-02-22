"use client";

import { Globe2, Shield, TrendingUp, Building2, Calculator } from "lucide-react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { CorporateTaxCalculator } from "@/components/corporate-tax-calculator";
import { useTranslations } from "next-intl";

export default function CorporateTaxPage() {
  const t = useTranslations("CorporateTaxCalculator");

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-24 pb-20">
        {/* Hero Section */}
        <section className="relative overflow-hidden">
          {/* Background Gradients */}
          <div className="absolute inset-0 -z-10">
            <div className="absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full bg-gradient-to-br from-accent/25 via-accent/10 to-transparent blur-3xl" />
            <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full bg-gradient-to-bl from-indigo-400/15 via-blue-300/10 to-transparent blur-3xl" />
            <div className="absolute bottom-0 left-1/3 w-[300px] h-[300px] rounded-full bg-gradient-to-t from-emerald-400/10 to-transparent blur-3xl" />
          </div>

          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
            {/* Title */}
            <div className="text-center max-w-3xl mx-auto mb-12">
              <span className="inline-flex items-center gap-1 text-xs font-medium px-3 py-1 rounded-full bg-secondary text-secondary-foreground mb-4">
                <Globe2 className="h-3 w-3" />
                {t("MULTI_COUNTRY_CORPORATE_TAX")}
              </span>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-foreground mb-4 text-balance">
                {t("CORPORATE_TAX_CALCULATOR")}
              </h1>

              <p className="text-lg text-muted-foreground text-balance">
                {t("ESTIMATE_CORPORATE_TAX_LIABILITY")}
              </p>
            </div>

            {/* Feature Highlights */}
            <div className="flex flex-wrap justify-center gap-6 mb-12">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Shield className="h-4 w-4 text-accent" />
                <span>{t("RULES_DRIVEN_ACCURACY")}</span>
              </div>

              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <TrendingUp className="h-4 w-4 text-accent" />
                <span>{t("SME_AND_LARGE_CORP_SUPPORT")}</span>
              </div>

              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Building2 className="h-4 w-4 text-accent" />
                <span>{t("FEDERAL_AND_PROVINCIAL_TAX")}</span>
              </div>
            </div>

            {/* Calculator */}
            <div className="max-w-5xl mx-auto">
              <CorporateTaxCalculator />
            </div>
          </div>
        </section>

        {/* Info Section */}
        <section className="py-16 border-t border-border">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-3 gap-8">
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {t("HOW_CORPORATE_TAX_IS_CALCULATED")}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {t(
                    "HOW_CORPORATE_TAX_IS_CALCULATED_DESC"
                  )}
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {t("SME_VS_LARGE_ENTERPRISE")}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {t("SME_VS_LARGE_ENTERPRISE_DESC")}
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {t("COUNTRY_SPECIFIC_RULES")}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {t("COUNTRY_SPECIFIC_RULES_DESC")}
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

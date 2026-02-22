import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Globe } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";

export function HeroSection() {
  const t = useTranslations('Home');
  const locale = useLocale();
  

  return (
    <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-32 overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute inset-0 -z-10">
        {/* Top-left gradient blob */}
        <div className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-accent/30 via-accent/10 to-transparent blur-3xl" />
        {/* Top-right gradient blob */}
        <div className="absolute -top-20 right-0 w-[500px] h-[500px] rounded-full bg-gradient-to-bl from-teal-400/20 via-emerald-300/10 to-transparent blur-3xl" />
        {/* Center gradient */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full bg-gradient-to-r from-accent/10 via-teal-300/15 to-accent/10 blur-3xl" />
        {/* Bottom gradient */}
        <div className="absolute bottom-0 left-1/4 w-[600px] h-[300px] rounded-full bg-gradient-to-t from-teal-400/15 via-emerald-300/10 to-transparent blur-3xl" />
      </div>
      
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-card via-card to-accent/10 border border-border/80 px-4 py-2 text-sm text-muted-foreground mb-8 shadow-sm">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
            </span>
            {t('NOW_SUPPORTING_COUNTRIES')}
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-foreground max-w-4xl mx-auto text-balance leading-tight">
            {t('FINANCIAL_CALCULATORS')}
            <br />
            <span className="bg-gradient-to-r from-teal-600 via-emerald-500 to-teal-600 bg-clip-text text-transparent">for Every Country</span>
          </h1>

          {/* Subheadline */}
          <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto text-pretty leading-relaxed">
            {t('MAIN_DESCRIPTION')}
          </p>

          {/* CTA Buttons */}
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" className="gap-2 px-8">
              <Link href={`/${locale}/experts/join`}>{t('JOIN_EXPERTS')}</Link>
              <ArrowRight className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="lg" className="gap-2 px-8 bg-transparent">
              <Globe className="h-4 w-4" />
              {t('EXPLORE_COUNTRIES')}
            </Button>
          </div>
        </div>

        {/* Feature Cards Preview */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-6">
          <CalculatorPreviewCard
            title={t("LOAN_CALCULATOR")}
            value="$24,500"
            label="Monthly Payment"
            change="+2.3% APR"
          />
          <CalculatorPreviewCard
            title={t("INCOME_TAX_CALCULATOR")}
            value="$18,240"
            label="Annual Tax"
            change="24% bracket"
          />
          <CalculatorPreviewCard
            title={t("MORTGAGE_CALCULATOR")}
            value="$1,847"
            label="Monthly Payment"
            change="30-year fixed"
          />
        </div>
      </div>
    </section>
  );
}

function CalculatorPreviewCard({
  title,
  value,
  label,
  change,
}: {
  title: string;
  value: string;
  label: string;
  change: string;
}) {
  return (
    <div className="relative bg-gradient-to-br from-card via-card to-accent/5 rounded-2xl border border-border p-6 hover:border-accent/50 transition-all group hover:shadow-lg hover:shadow-accent/10">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <p className="mt-2 text-3xl font-semibold text-foreground">{value}</p>
          <p className="mt-1 text-sm text-muted-foreground">{label}</p>
        </div>
        <span className="inline-flex items-center rounded-full bg-accent/10 px-2.5 py-1 text-xs font-medium text-accent">
          {change}
        </span>
      </div>
      <div className="mt-4 h-16 flex items-end gap-1">
        {[40, 60, 35, 80, 55, 70, 45, 90, 65, 75, 50, 85].map((height, i) => (
          <div
            key={i}
            className="flex-1 bg-gradient-to-t from-accent/40 via-accent/25 to-teal-300/20 rounded-t group-hover:from-accent/50 group-hover:via-accent/35 group-hover:to-teal-300/30 transition-all"
            style={{ height: `${height}%` }}
          />
        ))}
      </div>
    </div>
  );
}

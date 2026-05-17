"use client";

import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import { Calculator, Users, ArrowRight } from "lucide-react";
import { CalculatorType, CALCULATOR_LABELS } from "@/lib/blog";
import { RootState } from "@/store/rootStore";

const CalloutType: Record<string, string> = {
  "CAPITAL-GAINS": "CAPITAL_GAINS_TAX_CALCULATOR",
  "INCOME-TAX": "INCOME_TAX_CALCULATOR",
  "CORPORATE-TAX": "CORPORATE_TAX_CALCULATOR",
  "MORTGAGE": "MORTGAGE_CALCULATOR",
  "IMPORT-TAX": "IMPORT_TAX_DUTIES_CALCULATOR",
}

interface CalculatorEmbedProps {
  type: CalculatorType;
  countryCode: string;
}

export function CalculatorEmbed({ type, countryCode }: CalculatorEmbedProps) {
  const locale = useLocale();
  const t = useTranslations("Resources");
  const href = `/${locale}/calculators/${type}?country=${countryCode}`;

  return (
    <div className="my-8 rounded-2xl border border-border bg-gradient-to-br from-teal-50/50 to-emerald-50/50 dark:from-teal-950/20 dark:to-emerald-950/20 p-6">
      <div className="flex items-center gap-3 mb-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-teal-100 dark:bg-teal-900">
          <Calculator className="h-5 w-5 text-teal-700 dark:text-teal-300" />
        </div>
        <div>
          <p className="font-semibold text-foreground">
            {t("TRY_THE")} {t(CalloutType[type.toUpperCase()])}
          </p>
          <p className="text-sm text-muted-foreground">
            {t("RUN_OWN_CALCULATOR")}
          </p>
        </div>
      </div>
      <Button asChild className="gap-2">
        <Link href={href}>
          {t("OPEN_CALCULATOR")} <ArrowRight className="h-4 w-4" />
        </Link>
      </Button>
    </div>
  );
}

// ─── Expert CTA Block ───────────────────────────────────────────
// Usage in MDX:  ```expert-cta:DE```

interface ExpertCTAProps {
  countryCode: string;
  country: string;
}

export function ExpertCTA({ countryCode, country }: ExpertCTAProps) {
  const locale = useLocale();
  const t = useTranslations("Resources");
  const featureFlags = useSelector((state: RootState) => state.featureFlags);
  const expertEnabled = featureFlags.featureFlags.data?.find(
    (flag) => flag.name === "DISPLAY_EXPERT"
  )?.isEnabled ?? false;
  const href = `/${locale}/experts?country=${countryCode}`;

  if (!expertEnabled) {
    return null;
  }

  return (
    <div className="my-8 rounded-2xl border border-border bg-gradient-to-br from-blue-50/50 to-indigo-50/50 dark:from-blue-950/20 dark:to-indigo-950/20 p-6">
      <div className="flex items-center gap-3 mb-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900">
          <Users className="h-5 w-5 text-blue-700 dark:text-blue-300" />
        </div>
        <div>
          <p className="font-semibold text-foreground">
            {t("NEED_HELP_IN")} {t(country.toUpperCase())}?
          </p>
          <p className="text-sm text-muted-foreground">
            {t("CONNECT_WITH_VERIFIED")}{" "} {t(country.toUpperCase())}
          </p>
        </div>
      </div>
      <Button asChild variant="outline" className="gap-2">
        <Link href={href}>
          {t("BROWSE")} {t(country.toUpperCase())} {t("EXPERTS")} <ArrowRight className="h-4 w-4" />
        </Link>
      </Button>
    </div>
  );
}

// ─── Info Callout ───────────────────────────────────────────────
// Usage in MDX:  > **Note:** Some text here

interface CalloutProps {
  children: React.ReactNode;
  type?: "info" | "warning" | "tip";
}

export function Callout({ children, type = "info" }: CalloutProps) {
  const styles = {
    info: "border-blue-200 bg-blue-50/50 dark:border-blue-800 dark:bg-blue-950/20",
    warning:
      "border-amber-200 bg-amber-50/50 dark:border-amber-800 dark:bg-amber-950/20",
    tip: "border-green-200 bg-green-50/50 dark:border-green-800 dark:bg-green-950/20",
  };

  return (
    <div
      className={`my-4 rounded-lg border-l-4 p-4 ${styles[type]}`}
    >
      {children}
    </div>
  );
}

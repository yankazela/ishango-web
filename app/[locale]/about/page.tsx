import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Globe, Zap, ShieldCheck, Users } from "lucide-react";

const BASE_URL = "https://calcglobal.com";

const PAGE_META: Record<string, { title: string; description: string }> = {
  en: { title: "About Us", description: "Learn about CalcGlobal — our mission to make global financial calculations accessible to everyone." },
  fr: { title: "À propos de nous", description: "Découvrez CalcGlobal — notre mission de rendre les calculs financiers mondiaux accessibles à tous." },
  es: { title: "Sobre nosotros", description: "Conozca CalcGlobal — nuestra misión de hacer los cálculos financieros globales accesibles para todos." },
  de: { title: "Über uns", description: "Erfahren Sie mehr über CalcGlobal — unsere Mission, globale Finanzberechnungen für alle zugänglich zu machen." },
  pt: { title: "Sobre nós", description: "Conheça a CalcGlobal — nossa missão de tornar os cálculos financeiros globais acessíveis a todos." },
  ja: { title: "私たちについて", description: "CalcGlobalについて — グローバルな金融計算をすべての人に身近なものにするという私たちの使命をご紹介します。" },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const meta = PAGE_META[locale] ?? PAGE_META["en"];
  return {
    title: `${meta.title} | CalcGlobal`,
    description: meta.description,
    openGraph: { title: `${meta.title} | CalcGlobal`, description: meta.description, url: `${BASE_URL}/${locale}/about` },
  };
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("AboutPage");

  const VALUES = [
    { icon: Globe, title: t("VALUE1_TITLE"), description: t("VALUE1_DESC") },
    { icon: Zap, title: t("VALUE2_TITLE"), description: t("VALUE2_DESC") },
    { icon: ShieldCheck, title: t("VALUE3_TITLE"), description: t("VALUE3_DESC") },
    { icon: Users, title: t("VALUE4_TITLE"), description: t("VALUE4_DESC") },
  ];

  const STATS = [
    { value: t("STAT1_VALUE"), label: t("STAT1_LABEL") },
    { value: t("STAT2_VALUE"), label: t("STAT2_LABEL") },
    { value: t("STAT3_VALUE"), label: t("STAT3_LABEL") },
    { value: t("STAT4_VALUE"), label: t("STAT4_LABEL") },
  ];

  return (
    <main className="min-h-screen">
      <Header />

      {/* Hero */}
      <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8 text-center">
        <div className="mx-auto max-w-3xl">
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-6">
            {t("HERO_TITLE_1")}{" "}
            <span className="bg-gradient-to-r from-teal-600 via-emerald-500 to-teal-600 bg-clip-text text-transparent">
              {t("HERO_TITLE_HIGHLIGHT")}
            </span>
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            {t("HERO_DESCRIPTION")}
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-muted/40 border-y border-border">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-2xl font-bold mb-4">{t("MISSION_TITLE")}</h2>
          <p className="text-muted-foreground leading-relaxed">{t("MISSION_P1")}</p>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-2xl font-bold text-center mb-12">{t("VALUES_TITLE")}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {VALUES.map(({ icon: Icon, title, description }) => (
              <div key={title} className="flex gap-4">
                <div className="mt-1 flex-shrink-0 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">{title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-muted/40 border-y border-border">
        <div className="mx-auto max-w-5xl">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 text-center">
            {STATS.map(({ value, label }) => (
              <div key={label}>
                <p className="text-3xl font-bold bg-gradient-to-r from-teal-600 to-emerald-500 bg-clip-text text-transparent">
                  {value}
                </p>
                <p className="mt-1 text-sm text-muted-foreground">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-2xl font-bold mb-6">{t("STORY_TITLE")}</h2>
          <div className="space-y-4 text-sm text-muted-foreground leading-7">
            <p>{t("STORY_P1")}</p>
            <p>{t("STORY_P2")}</p>
            <p>{t("STORY_P3")}</p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-muted/40 border-t border-border">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-2xl font-bold mb-4">{t("CTA_TITLE")}</h2>
          <p className="text-muted-foreground mb-6">{t("CTA_P1")}</p>
          <a
            href="mailto:hello@calcglobal.com"
            className="inline-flex items-center gap-2 rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            {t("CTA_BUTTON")}
          </a>
        </div>
      </section>

      <Footer />
    </main>
  );
}

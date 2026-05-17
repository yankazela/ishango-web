import type { Metadata } from 'next';
import { Header } from "@/components/header";
import { HeroSection } from "@/components/hero-section";
import { FeaturesSection } from "@/components/features-section";
import { CountriesSection } from "@/components/countries-section";
import { PricingSection } from "@/components/pricing-section";
import { CTASection } from "@/components/cta-section";
import { Footer } from "@/components/footer";
import { DemoModeBanner } from "@/components/demo-mode-banner";
import { setRequestLocale } from "next-intl/server";

const BASE_URL = 'https://calcglobal.com';

const PAGE_META: Record<string, { title: string; description: string }> = {
  en: {
    title: 'Multi-Country Financial Calculators',
    description: 'Income tax, mortgage, corporate tax, capital gains, and inheritance tax calculators for 50+ countries. Make smarter financial decisions globally.',
  },
  fr: {
    title: 'Calculateurs financiers multi-pays',
    description: 'Calculateurs d\'impôt sur le revenu, d\'hypothèque et de fiscalité d\'entreprise pour plus de 50 pays. Prenez de meilleures décisions financières.',
  },
  es: {
    title: 'Calculadoras financieras multinacionales',
    description: 'Calculadoras de impuesto sobre la renta, hipoteca e impuesto corporativo para más de 50 países. Tome decisiones financieras más inteligentes.',
  },
  de: {
    title: 'Internationale Finanzrechner',
    description: 'Einkommensteuer-, Hypotheken- und Körperschaftssteuerrechner für über 50 Länder. Treffen Sie fundiertere Finanzentscheidungen weltweit.',
  },
  pt: {
    title: 'Calculadoras financeiras multinacionais',
    description: 'Calculadoras de imposto de renda, hipoteca e imposto corporativo para mais de 50 países. Tome decisões financeiras mais inteligentes.',
  },
  ja: {
    title: '多国対応金融計算ツール',
    description: '50カ国以上の所得税・住宅ローン・法人税・キャピタルゲイン税・相続税の計算ツール。グローバルな金融判断をサポートします。',
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const meta = PAGE_META[locale] ?? PAGE_META['en'];
  return {
    title: meta.title,
    description: meta.description,
    openGraph: {
      title: `${meta.title} | CalcGlobal`,
      description: meta.description,
      url: `${BASE_URL}/${locale}/`,
    },
    twitter: {
      title: `${meta.title} | CalcGlobal`,
      description: meta.description,
    },
  };
}

const websiteJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'CalcGlobal',
  url: BASE_URL,
  description: PAGE_META['en'].description,
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: `${BASE_URL}/en/countries/?q={search_term_string}`,
    },
    'query-input': 'required name=search_term_string',
  },
};

const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'CalcGlobal',
  url: BASE_URL,
  description: 'Global marketplace connecting verified financial experts with individuals and businesses navigating cross-border financial calculations.',
  sameAs: [],
};

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <main className="min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
      />
      <DemoModeBanner />
      <Header />
      <HeroSection />
      <FeaturesSection />
      <CountriesSection />
      <PricingSection />
      <CTASection />
      <Footer />
    </main>
  );
}

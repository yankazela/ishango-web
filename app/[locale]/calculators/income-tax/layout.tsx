import type { Metadata } from 'next';

const META: Record<string, { title: string; description: string }> = {
  en: {
    title: 'Income Tax Calculator',
    description: 'Calculate your income tax liability across 50+ countries. Accurate tax bracket calculations with deductions, credits, and local tax rules.',
  },
  fr: {
    title: 'Calculateur d\'impôt sur le revenu',
    description: 'Calculez votre impôt sur le revenu dans plus de 50 pays avec des tranches d\'imposition précises et les règles fiscales locales.',
  },
  es: {
    title: 'Calculadora de impuesto sobre la renta',
    description: 'Calcule su impuesto sobre la renta en más de 50 países con tramos impositivos precisos y reglas fiscales locales.',
  },
  de: {
    title: 'Einkommensteuerrechner',
    description: 'Berechnen Sie Ihre Einkommensteuer in über 50 Ländern mit genauen Steuersätzen und lokalen Steuerregeln.',
  },
  pt: {
    title: 'Calculadora de imposto de renda',
    description: 'Calcule seu imposto de renda em mais de 50 países com faixas de tributação precisas e regras fiscais locais.',
  },
  ja: {
    title: '所得税計算ツール',
    description: '50カ国以上の所得税を正確な税率区分と現地税制ルールで計算します。',
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const meta = META[locale] ?? META['en'];
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Income Tax Calculator',
    applicationCategory: 'FinanceApplication',
    description: meta.description,
    url: `https://calcglobal.com/${locale}/calculators/income-tax/`,
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  };
  return {
    title: meta.title,
    description: meta.description,
    openGraph: {
      title: `${meta.title} | CalcGlobal`,
      description: meta.description,
      url: `https://calcglobal.com/${locale}/calculators/income-tax/`,
    },
    twitter: {
      title: `${meta.title} | CalcGlobal`,
      description: meta.description,
    },
    other: {
      'application-ld+json': JSON.stringify(jsonLd),
    },
  };
}

export default function IncomeTaxLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

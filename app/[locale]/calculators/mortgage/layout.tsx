import type { Metadata } from 'next';

const META: Record<string, { title: string; description: string }> = {
  en: {
    title: 'Mortgage Calculator',
    description: 'Plan your home purchase with accurate mortgage calculations for 50+ countries. Compare monthly payments, amortization schedules, and total loan cost.',
  },
  fr: {
    title: 'Calculateur hypothécaire',
    description: 'Planifiez votre achat immobilier avec des calculs hypothécaires précis pour plus de 50 pays.',
  },
  es: {
    title: 'Calculadora de hipoteca',
    description: 'Planifique la compra de su vivienda con cálculos hipotecarios precisos para más de 50 países.',
  },
  de: {
    title: 'Hypothekenrechner',
    description: 'Planen Sie Ihren Immobilienkauf mit genauen Hypothekenberechnungen für über 50 Länder.',
  },
  pt: {
    title: 'Calculadora de hipoteca',
    description: 'Planeje a compra de sua casa com cálculos precisos de hipoteca para mais de 50 países.',
  },
  ja: {
    title: '住宅ローン計算ツール',
    description: '50カ国以上の住宅ローンを正確に計算。月々の支払い、返済スケジュール、総費用を比較。',
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const meta = META[locale] ?? META['en'];
  return {
    title: meta.title,
    description: meta.description,
    openGraph: {
      title: `${meta.title} | CalcGlobal`,
      description: meta.description,
      url: `https://calcglobal.com/${locale}/calculators/mortgage/`,
    },
    twitter: {
      title: `${meta.title} | CalcGlobal`,
      description: meta.description,
    },
  };
}

export default function MortgageLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

import type { Metadata } from 'next';

const META: Record<string, { title: string; description: string }> = {
  en: {
    title: 'Capital Gains Tax Calculator',
    description: 'Calculate capital gains tax on stocks, cryptocurrency, real estate, and more across 50+ countries. Compare short-term vs long-term rates globally.',
  },
  fr: {
    title: 'Calculateur de plus-values',
    description: 'Calculez l\'impôt sur les plus-values sur actions, crypto-monnaies et immobilier dans plus de 50 pays.',
  },
  es: {
    title: 'Calculadora de impuesto a las ganancias de capital',
    description: 'Calcule el impuesto sobre ganancias de capital en acciones, criptomonedas e inmuebles en más de 50 países.',
  },
  de: {
    title: 'Kapitalertragssteuerrechner',
    description: 'Berechnen Sie die Kapitalertragssteuer auf Aktien, Kryptowährungen und Immobilien in über 50 Ländern.',
  },
  pt: {
    title: 'Calculadora de imposto sobre ganhos de capital',
    description: 'Calcule o imposto sobre ganhos de capital em ações, criptomoedas e imóveis em mais de 50 países.',
  },
  ja: {
    title: 'キャピタルゲイン税計算ツール',
    description: '50カ国以上の株式・暗号通貨・不動産のキャピタルゲイン税を計算。短期・長期税率を比較。',
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
      url: `https://calcglobal.com/${locale}/calculators/capital-gains-tax/`,
    },
    twitter: {
      title: `${meta.title} | CalcGlobal`,
      description: meta.description,
    },
  };
}

export default function CapitalGainsTaxLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

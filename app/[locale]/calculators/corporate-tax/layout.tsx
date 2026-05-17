import type { Metadata } from 'next';

const META: Record<string, { title: string; description: string }> = {
  en: {
    title: 'Corporate Tax Calculator',
    description: 'Calculate corporate tax obligations for 50+ countries. Includes federal, state, and local taxes with proper deduction and rate handling.',
  },
  fr: {
    title: 'Calculateur de l\'impôt sur les sociétés',
    description: 'Calculez les obligations fiscales des entreprises dans plus de 50 pays avec les déductions et taux appropriés.',
  },
  es: {
    title: 'Calculadora de impuesto corporativo',
    description: 'Calcule las obligaciones fiscales corporativas en más de 50 países con deducciones y tasas correctas.',
  },
  de: {
    title: 'Körperschaftssteuerrechner',
    description: 'Berechnen Sie Körperschaftssteuerverbindlichkeiten für über 50 Länder inklusive Abzügen und lokaler Steuersätze.',
  },
  pt: {
    title: 'Calculadora de imposto corporativo',
    description: 'Calcule obrigações fiscais corporativas em mais de 50 países com deduções e alíquotas corretas.',
  },
  ja: {
    title: '法人税計算ツール',
    description: '50カ国以上の法人税を計算。連邦税・州税・地方税の控除と税率を正確に処理します。',
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
      url: `https://calcglobal.com/${locale}/calculators/corporate-tax/`,
    },
    twitter: {
      title: `${meta.title} | CalcGlobal`,
      description: meta.description,
    },
  };
}

export default function CorporateTaxLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

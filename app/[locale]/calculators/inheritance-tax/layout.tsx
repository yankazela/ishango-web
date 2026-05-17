import type { Metadata } from 'next';

const META: Record<string, { title: string; description: string }> = {
  en: {
    title: 'Inheritance Tax Calculator',
    description: 'Calculate inheritance tax liability across 50+ countries. Understand estate thresholds, exemptions, and tax rates for cross-border inheritance planning.',
  },
  fr: {
    title: 'Calculateur de droits de succession',
    description: 'Calculez les droits de succession dans plus de 50 pays. Comprenez les seuils, exonérations et taux pour la planification successorale.',
  },
  es: {
    title: 'Calculadora de impuesto de sucesiones',
    description: 'Calcule el impuesto de sucesiones en más de 50 países. Comprenda los umbrales, exenciones y tasas para la planificación hereditaria.',
  },
  de: {
    title: 'Erbschaftssteuerrechner',
    description: 'Berechnen Sie die Erbschaftssteuer in über 50 Ländern. Verstehen Sie Freibeträge, Ausnahmen und Steuersätze für die Nachlassplanung.',
  },
  pt: {
    title: 'Calculadora de imposto de herança',
    description: 'Calcule o imposto de herança em mais de 50 países. Entenda limites, isenções e alíquotas para o planejamento sucessório.',
  },
  ja: {
    title: '相続税計算ツール',
    description: '50カ国以上の相続税を計算。国境をまたぐ相続計画のための基礎控除・免除・税率を理解。',
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
      url: `https://calcglobal.com/${locale}/calculators/inheritance-tax/`,
    },
    twitter: {
      title: `${meta.title} | CalcGlobal`,
      description: meta.description,
    },
  };
}

export default function InheritanceTaxLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

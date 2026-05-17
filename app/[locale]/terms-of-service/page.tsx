import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

const BASE_URL = "https://calcglobal.com";

const PAGE_META: Record<string, { title: string; description: string }> = {
  en: { title: "Terms of Service", description: "Read the Terms of Service governing your use of the CalcGlobal platform." },
  fr: { title: "Conditions d'utilisation", description: "Lisez les conditions d'utilisation régissant votre accès à la plateforme CalcGlobal." },
  es: { title: "Términos de servicio", description: "Lea los Términos de Servicio que rigen su uso de la plataforma CalcGlobal." },
  de: { title: "Nutzungsbedingungen", description: "Lesen Sie die Nutzungsbedingungen für die CalcGlobal-Plattform." },
  pt: { title: "Termos de Serviço", description: "Leia os Termos de Serviço que regem o uso da plataforma CalcGlobal." },
  ja: { title: "利用規約", description: "CalcGlobalプラットフォームのご利用に関する利用規約をご確認ください。" },
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
    openGraph: { title: `${meta.title} | CalcGlobal`, description: meta.description, url: `${BASE_URL}/${locale}/terms-of-service` },
  };
}

export default async function TermsOfServicePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("TermsOfService");

  return (
    <main className="min-h-screen">
      <Header />
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 pt-28 pb-20">
        <h1 className="text-3xl font-bold tracking-tight mb-2">{t("TITLE")}</h1>
        <p className="text-sm text-muted-foreground mb-10">{t("LAST_UPDATED")}</p>

        <div className="prose prose-neutral dark:prose-invert max-w-none space-y-8 text-sm leading-7">
          <section>
            <h2 className="text-xl font-semibold mb-3">{t("S1_TITLE")}</h2>
            <p>{t("S1_P1")}</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">{t("S2_TITLE")}</h2>
            <p>{t("S2_P1")}</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">{t("S3_TITLE")}</h2>
            <p>{t("S3_P1")}</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">{t("S4_TITLE")}</h2>
            <p>{t("S4_P1")}</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">{t("S5_TITLE")}</h2>
            <p>{t("S5_P1")}</p>
            <ul className="list-disc pl-5 space-y-1 mt-2">
              <li>{t("S5_ITEM1")}</li>
              <li>{t("S5_ITEM2")}</li>
              <li>{t("S5_ITEM3")}</li>
              <li>{t("S5_ITEM4")}</li>
              <li>{t("S5_ITEM5")}</li>
              <li>{t("S5_ITEM6")}</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">{t("S6_TITLE")}</h2>
            <p>{t("S6_P1")}</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">{t("S7_TITLE")}</h2>
            <p>{t("S7_P1")}</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">{t("S8_TITLE")}</h2>
            <p>{t("S8_P1")}</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">{t("S9_TITLE")}</h2>
            <p>{t("S9_P1")}</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">{t("S10_TITLE")}</h2>
            <p>{t("S10_P1")}</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">{t("S11_TITLE")}</h2>
            <p>{t("S11_P1")}</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">{t("S12_TITLE")}</h2>
            <p>{t("S12_P1")}</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">{t("S13_TITLE")}</h2>
            <p>{t("S13_P1")}</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">{t("S14_TITLE")}</h2>
            <p>{t("S14_P1")}</p>
          </section>
        </div>
      </div>
      <Footer />
    </main>
  );
}

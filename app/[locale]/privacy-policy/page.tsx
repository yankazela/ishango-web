import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

const BASE_URL = "https://calcglobal.com";

const PAGE_META: Record<string, { title: string; description: string }> = {
  en: { title: "Privacy Policy", description: "Learn how CalcGlobal collects, uses, and protects your personal data." },
  fr: { title: "Politique de confidentialité", description: "Découvrez comment CalcGlobal collecte, utilise et protège vos données personnelles." },
  es: { title: "Política de privacidad", description: "Conozca cómo CalcGlobal recopila, usa y protege sus datos personales." },
  de: { title: "Datenschutzrichtlinie", description: "Erfahren Sie, wie CalcGlobal Ihre persönlichen Daten erhebt, verwendet und schützt." },
  pt: { title: "Política de Privacidade", description: "Saiba como a CalcGlobal coleta, usa e protege seus dados pessoais." },
  ja: { title: "プライバシーポリシー", description: "CalcGlobalが個人データをどのように収集、使用、保護するかについてご確認ください。" },
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
    openGraph: { title: `${meta.title} | CalcGlobal`, description: meta.description, url: `${BASE_URL}/${locale}/privacy-policy` },
  };
}

export default async function PrivacyPolicyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("PrivacyPolicy");

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
            <ul className="list-disc pl-5 space-y-1 mt-2">
              <li>{t("S2_ITEM_ACCOUNT")}</li>
              <li>{t("S2_ITEM_USAGE")}</li>
              <li>{t("S2_ITEM_CALC")}</li>
              <li>{t("S2_ITEM_COMM")}</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">{t("S3_TITLE")}</h2>
            <ul className="list-disc pl-5 space-y-1 mt-2">
              <li>{t("S3_ITEM1")}</li>
              <li>{t("S3_ITEM2")}</li>
              <li>{t("S3_ITEM3")}</li>
              <li>{t("S3_ITEM4")}</li>
              <li>{t("S3_ITEM5")}</li>
              <li>{t("S3_ITEM6")}</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">{t("S4_TITLE")}</h2>
            <p>
              {t("S4_P1")}{" "}
              <a href={`/${locale}/cookie-policy`} className="text-primary underline">
                {t("S4_LINK")}
              </a>{" "}
              {t("S4_P1_SUFFIX")}
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">{t("S5_TITLE")}</h2>
            <p>{t("S5_P1")}</p>
            <ul className="list-disc pl-5 space-y-1 mt-2">
              <li>{t("S5_ITEM_PROVIDERS")}</li>
              <li>{t("S5_ITEM_LEGAL")}</li>
              <li>{t("S5_ITEM_TRANSFERS")}</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">{t("S6_TITLE")}</h2>
            <p>{t("S6_P1")}</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">{t("S7_TITLE")}</h2>
            <p>{t("S7_P1")}</p>
            <ul className="list-disc pl-5 space-y-1 mt-2">
              <li>{t("S7_ITEM1")}</li>
              <li>{t("S7_ITEM2")}</li>
              <li>{t("S7_ITEM3")}</li>
              <li>{t("S7_ITEM4")}</li>
              <li>{t("S7_ITEM5")}</li>
              <li>{t("S7_ITEM6")}</li>
            </ul>
            <p className="mt-2">{t("S7_CONTACT")}</p>
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
        </div>
      </div>
      <Footer />
    </main>
  );
}

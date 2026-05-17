import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

const BASE_URL = "https://calcglobal.com";

const PAGE_META: Record<string, { title: string; description: string }> = {
  en: { title: "Cookie Policy", description: "Understand how CalcGlobal uses cookies and similar tracking technologies." },
  fr: { title: "Politique en matière de cookies", description: "Comprenez comment CalcGlobal utilise les cookies et technologies de suivi similaires." },
  es: { title: "Política de cookies", description: "Entienda cómo CalcGlobal utiliza cookies y tecnologías de seguimiento similares." },
  de: { title: "Cookie-Richtlinie", description: "Erfahren Sie, wie CalcGlobal Cookies und ähnliche Tracking-Technologien verwendet." },
  pt: { title: "Política de Cookies", description: "Entenda como a CalcGlobal usa cookies e tecnologias de rastreamento similares." },
  ja: { title: "Cookieポリシー", description: "CalcGlobalがCookieおよび類似のトラッキング技術をどのように使用するかをご確認ください。" },
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
    openGraph: { title: `${meta.title} | CalcGlobal`, description: meta.description, url: `${BASE_URL}/${locale}/cookie-policy` },
  };
}

export default async function CookiePolicyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("CookiePolicy");

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

            <h3 className="text-base font-semibold mt-4 mb-2">{t("S2_NECESSARY_TITLE")}</h3>
            <p>{t("S2_NECESSARY_P1")}</p>
            <table className="w-full mt-3 text-xs border border-border rounded overflow-hidden">
              <thead className="bg-muted">
                <tr>
                  <th className="text-left p-2 font-medium">{t("S2_TH_COOKIE")}</th>
                  <th className="text-left p-2 font-medium">{t("S2_TH_PURPOSE")}</th>
                  <th className="text-left p-2 font-medium">{t("S2_TH_DURATION")}</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t border-border">
                  <td className="p-2 font-mono">__session</td>
                  <td className="p-2">{t("S2_SESSION_PURPOSE")}</td>
                  <td className="p-2">{t("S2_SESSION_DURATION")}</td>
                </tr>
                <tr className="border-t border-border">
                  <td className="p-2 font-mono">NEXT_LOCALE</td>
                  <td className="p-2">{t("S2_LOCALE_PURPOSE")}</td>
                  <td className="p-2">{t("S2_LOCALE_DURATION")}</td>
                </tr>
              </tbody>
            </table>

            <h3 className="text-base font-semibold mt-6 mb-2">{t("S2_ANALYTICS_TITLE")}</h3>
            <p>{t("S2_ANALYTICS_P1")}</p>
            <table className="w-full mt-3 text-xs border border-border rounded overflow-hidden">
              <thead className="bg-muted">
                <tr>
                  <th className="text-left p-2 font-medium">{t("S2_TH_COOKIE")}</th>
                  <th className="text-left p-2 font-medium">{t("S2_TH_PROVIDER")}</th>
                  <th className="text-left p-2 font-medium">{t("S2_TH_DURATION")}</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t border-border">
                  <td className="p-2 font-mono">_ga</td>
                  <td className="p-2">Google Analytics</td>
                  <td className="p-2">{t("S2_GA_DURATION")}</td>
                </tr>
                <tr className="border-t border-border">
                  <td className="p-2 font-mono">_ga_*</td>
                  <td className="p-2">Google Analytics</td>
                  <td className="p-2">{t("S2_GA_DURATION")}</td>
                </tr>
              </tbody>
            </table>

            <h3 className="text-base font-semibold mt-6 mb-2">{t("S2_PREF_TITLE")}</h3>
            <p>{t("S2_PREF_P1")}</p>
            <table className="w-full mt-3 text-xs border border-border rounded overflow-hidden">
              <thead className="bg-muted">
                <tr>
                  <th className="text-left p-2 font-medium">{t("S2_TH_COOKIE")}</th>
                  <th className="text-left p-2 font-medium">{t("S2_TH_PURPOSE")}</th>
                  <th className="text-left p-2 font-medium">{t("S2_TH_DURATION")}</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t border-border">
                  <td className="p-2 font-mono">theme</td>
                  <td className="p-2">{t("S2_THEME_PURPOSE")}</td>
                  <td className="p-2">{t("S2_THEME_DURATION")}</td>
                </tr>
              </tbody>
            </table>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">{t("S3_TITLE")}</h2>
            <p>{t("S3_P1")}</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">{t("S4_TITLE")}</h2>
            <p>{t("S4_P1")}</p>
            <ul className="list-disc pl-5 space-y-1 mt-2">
              <li>{t("S4_ITEM_BROWSER")}</li>
              <li>
                {t("S4_ITEM_OPTOUT")}{" "}
                <a
                  href="https://tools.google.com/dlpage/gaoptout"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary underline"
                >
                  {t("S4_OPTOUT_LINK")}
                </a>
                .
              </li>
            </ul>
            <p className="mt-3">{t("S4_P2")}</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">{t("S5_TITLE")}</h2>
            <p>{t("S5_P1")}</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">{t("S6_TITLE")}</h2>
            <p>{t("S6_P1")}</p>
          </section>
        </div>
      </div>
      <Footer />
    </main>
  );
}

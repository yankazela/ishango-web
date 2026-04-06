import { Header } from "@/components/header";
import { HeroSection } from "@/components/hero-section";
import { FeaturesSection } from "@/components/features-section";
import { CountriesSection } from "@/components/countries-section";
import { PricingSection } from "@/components/pricing-section";
import { CTASection } from "@/components/cta-section";
import { Footer } from "@/components/footer";
import { DemoModeBanner } from "@/components/demo-mode-banner";
import { setRequestLocale } from "next-intl/server";

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <main className="min-h-screen">
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

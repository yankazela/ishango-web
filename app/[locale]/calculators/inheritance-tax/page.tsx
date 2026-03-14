import { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { InheritanceTaxCalculator } from "@/components/inheritance-tax-calculator";
import { Card, CardContent } from "@/components/ui/card";
import { Scale, ArrowLeft, Users, Home, FileText, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Inheritance Tax Calculator - CalcGlobal",
  description:
    "Calculate inheritance and estate taxes across multiple countries. Understand tax-free allowances, relationship-based exemptions, and residence relief.",
};

export default function InheritanceTaxPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-24 pb-16">
        {/* Hero Section */}
        <section className="relative overflow-hidden">
          {/* Background Gradients */}
          <div className="absolute inset-0 -z-10">
            <div className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-accent/20 via-accent/10 to-transparent blur-3xl" />
            <div className="absolute -top-20 right-0 w-[500px] h-[500px] rounded-full bg-gradient-to-bl from-teal-400/15 via-emerald-300/10 to-transparent blur-3xl" />
          </div>

          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            {/* Back Link */}
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Link>

            <div className="flex items-center gap-4 mb-6">
              <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-accent/20 to-accent/5 flex items-center justify-center">
                <Scale className="h-7 w-7 text-accent" />
              </div>
              <div>
                <h1 className="text-3xl sm:text-4xl font-semibold text-foreground">
                  Inheritance Tax Calculator
                </h1>
                <p className="text-muted-foreground mt-1">
                  Estimate estate and inheritance taxes with relationship-based exemptions
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Calculator Section */}
        <section className="py-12">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <InheritanceTaxCalculator />
          </div>
        </section>

        {/* Info Section */}
        <section className="py-12 bg-muted/30">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-semibold text-foreground mb-8">
              Understanding Inheritance Tax
            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="h-10 w-10 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
                    <Users className="h-5 w-5 text-accent" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">
                    Relationship Matters
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Most countries offer higher tax-free allowances for close family 
                    members like spouses and children compared to distant relatives.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="h-10 w-10 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
                    <Home className="h-5 w-5 text-accent" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">
                    Residence Relief
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Some countries like the UK offer additional relief when passing 
                    your main home to direct descendants, reducing the tax burden.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="h-10 w-10 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
                    <FileText className="h-5 w-5 text-accent" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">
                    Estate Planning
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Proper estate planning with trusts, gifts, and legal structures 
                    can significantly reduce inheritance tax liability.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="h-10 w-10 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
                    <Shield className="h-5 w-5 text-accent" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">
                    Spousal Exemption
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Transfers to spouses are typically fully exempt from inheritance 
                    tax in most jurisdictions, preserving family wealth.
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Tax-Free Countries */}
            <div className="mt-12 p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/20">
              <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                <Shield className="h-5 w-5 text-emerald-600" />
                Countries Without Inheritance Tax
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                Several countries have abolished inheritance and estate taxes, making them 
                attractive for wealth preservation and succession planning:
              </p>
              <div className="flex flex-wrap gap-2">
                {["Australia", "Canada", "New Zealand", "Singapore", "Hong Kong", "Sweden", "Norway", "Portugal"].map(
                  (country) => (
                    <span
                      key={country}
                      className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-700 text-sm font-medium"
                    >
                      {country}
                    </span>
                  )
                )}
              </div>
            </div>

            {/* Disclaimer */}
            <div className="mt-8 p-4 rounded-lg bg-amber-500/10 border border-amber-500/20">
              <p className="text-sm text-muted-foreground">
                <strong className="text-foreground">Important:</strong> This calculator provides 
                estimates for informational purposes only. Inheritance tax laws are complex and 
                vary by jurisdiction. Please consult with a qualified tax professional or estate 
                planning attorney for accurate advice specific to your situation.
              </p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-12">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                Need Expert Help?
              </h2>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                Connect with certified estate planning professionals in your country 
                who can provide personalized guidance on inheritance tax optimization.
              </p>
              <div className="flex justify-center gap-4">
                <Button asChild>
                  <Link href="/experts?calculator=inheritance">Find an Expert</Link>
                </Button>
                <Button variant="outline" className="bg-transparent" asChild>
                  <Link href="/calculators/capital-gains">Try Capital Gains Calculator</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

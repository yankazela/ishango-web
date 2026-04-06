"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Globe,
  BadgeCheck,
  TrendingUp,
  Users,
  Calculator,
  Building2,
  Landmark,
  Home,
  PackageSearch,
  DollarSign,
  BarChart3,
  Layers,
  ShieldCheck,
  Zap,
  Target,
  ChevronRight,
  Mail,
} from "lucide-react";
import { useLocale } from "next-intl";
import { useState } from "react";

const metrics = [
  { value: "5,000+", label: "Calculators Available", icon: Calculator },
  { value: "100K+", label: "Daily Calculations", icon: BarChart3 },
  { value: "500+", label: "Active Experts", icon: Users },
  { value: "50+", label: "Countries Supported", icon: Globe },
  { value: "6", label: "Languages", icon: Layers },
  { value: "$250B+", label: "TAM (Global Tax Services)", icon: DollarSign },
];

const revenueStreams = [
  {
    icon: Users,
    title: "Expert Marketplace Commission",
    description:
      "15–25% commission on every consultation booked through the platform. Experts pay for premium placement and verified badges.",
    tag: "Recurring",
  },
  {
    icon: Zap,
    title: "API Subscriptions",
    description:
      "Tiered SaaS pricing for fintech companies, banks, and accounting firms integrating our calculation engine via REST API.",
    tag: "SaaS",
  },
  {
    icon: TrendingUp,
    title: "Premium Expert Listings",
    description:
      "Monthly subscriptions for enhanced expert profiles with priority search ranking, analytics dashboard, and lead generation tools.",
    tag: "Subscription",
  },
  {
    icon: Building2,
    title: "Enterprise Licensing",
    description:
      "White-label calculator solutions for large financial institutions and government portals with custom branding and SLA.",
    tag: "Enterprise",
  },
];

const timeline = [
  {
    phase: "Phase 1",
    title: "Foundation",
    period: "Completed",
    items: [
      "Core calculator engine (5 calculator types)",
      "Multi-country tax logic",
      "Expert onboarding pipeline",
      "Multi-language support (6 languages)",
      "REST API with documentation",
    ],
    status: "done" as const,
  },
  {
    phase: "Phase 2",
    title: "Growth",
    period: "Next 6 months",
    items: [
      "Launch expert marketplace with payments",
      "SEO-driven user acquisition",
      "Expand to 100+ countries",
      "Mobile-responsive calculator widgets",
      "Expert verification & review system",
    ],
    status: "current" as const,
  },
  {
    phase: "Phase 3",
    title: "Scale",
    period: "12–18 months",
    items: [
      "Enterprise API partnerships",
      "AI-powered tax optimization",
      "White-label solutions",
      "Series A fundraise",
      "10,000+ active experts",
    ],
    status: "future" as const,
  },
];

const competitiveEdges = [
  {
    icon: Globe,
    title: "Multi-Country from Day 1",
    description:
      "Unlike single-market tools (TurboTax, HMRC), we support 50+ jurisdictions with a unified API and UX.",
  },
  {
    icon: BadgeCheck,
    title: "Two-Sided Marketplace",
    description:
      "Calculators drive free, high-intent traffic. Experts monetize that traffic. Strong network effects compound growth.",
  },
  {
    icon: ShieldCheck,
    title: "Verified Expert Network",
    description:
      "Trust layer that competitors lack — every expert is reviewed, rated, and verified before going live.",
  },
  {
    icon: Layers,
    title: "API-First Architecture",
    description:
      "Built for developers. Any fintech, bank, or accounting platform can embed our calculators via REST API.",
  },
];

export default function InvestorsPage() {
  const locale = useLocale();
  const [contactEmail, setContactEmail] = useState("");
  const [contactSubmitted, setContactSubmitted] = useState(false);

  return (
    <main className="min-h-screen relative overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-accent/30 via-accent/10 to-transparent blur-3xl" />
        <div className="absolute -top-20 right-0 w-[500px] h-[500px] rounded-full bg-gradient-to-bl from-teal-400/20 via-emerald-300/10 to-transparent blur-3xl" />
        <div className="absolute bottom-0 left-1/4 w-[600px] h-[300px] rounded-full bg-gradient-to-t from-teal-400/15 via-emerald-300/10 to-transparent blur-3xl" />
      </div>

      {/* Header */}
      <header className="py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href={`/${locale}`} className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-foreground flex items-center justify-center">
              <Calculator className="h-5 w-5 text-background" />
            </div>
            <span className="text-xl font-semibold text-foreground">
              Ishango Engine
            </span>
          </Link>
          <div className="flex items-center gap-4">
            <Link
              href={`/${locale}`}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Back to product
            </Link>
            <Button size="sm" asChild>
              <a href="#contact">Get in Touch</a>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="pt-16 pb-20 lg:pt-24 lg:pb-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-accent/10 border border-accent/20 px-4 py-1.5 text-sm text-accent font-medium mb-6">
              <TrendingUp className="h-3.5 w-3.5" />
              Investment Opportunity
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-foreground leading-tight text-balance">
              The global marketplace for{" "}
              <span className="bg-gradient-to-r from-teal-600 via-emerald-500 to-teal-600 bg-clip-text text-transparent">
                financial expertise
              </span>
            </h1>
            <p className="mt-6 text-lg text-muted-foreground leading-relaxed max-w-2xl">
              Ishango Engine connects verified financial experts with individuals
              and businesses navigating complex cross-border tax, mortgage, and
              financial calculations across 50+ countries. We&apos;re building the
              infrastructure layer for global financial advisory.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Button size="lg" className="gap-2" asChild>
                <a href="#contact">
                  Request Pitch Deck
                  <ArrowRight className="h-4 w-4" />
                </a>
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="gap-2 bg-transparent"
                asChild
              >
                <Link href={`/${locale}`}>
                  <Globe className="h-4 w-4" />
                  Explore the Product
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Key Metrics */}
      <section className="py-16 bg-card border-y border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-semibold text-foreground">
              Traction & Market Opportunity
            </h2>
            <p className="mt-3 text-muted-foreground max-w-xl mx-auto">
              Real numbers from a live product with proven demand.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {metrics.map((metric) => (
              <div
                key={metric.label}
                className="relative bg-background rounded-2xl border border-border p-5 text-center hover:border-accent/50 transition-all group"
              >
                <div className="h-10 w-10 rounded-xl bg-accent/10 flex items-center justify-center mx-auto mb-3 group-hover:bg-accent/20 transition-colors">
                  <metric.icon className="h-5 w-5 text-accent" />
                </div>
                <p className="text-2xl font-semibold text-foreground">
                  {metric.value}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  {metric.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The Problem & Solution */}
      <section className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            {/* Problem */}
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-destructive/10 border border-destructive/20 px-3 py-1 text-xs font-medium text-destructive mb-4">
                The Problem
              </div>
              <h2 className="text-2xl sm:text-3xl font-semibold text-foreground mb-4">
                Financial expertise is siloed & hard to find
              </h2>
              <div className="space-y-4">
                {[
                  "Tax regulations differ drastically across 190+ countries — no unified access point exists.",
                  "Individuals and businesses can't easily find trusted, country-specific financial experts.",
                  "Existing tools (TurboTax, H&R Block) are single-market and don't serve global users.",
                  "Cross-border workers and companies waste time and money on incorrect calculations.",
                ].map((point) => (
                  <div key={point} className="flex items-start gap-3">
                    <div className="h-6 w-6 rounded-full bg-destructive/10 flex items-center justify-center shrink-0 mt-0.5">
                      <span className="text-destructive text-xs font-bold">!</span>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {point}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Solution */}
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-accent/10 border border-accent/20 px-3 py-1 text-xs font-medium text-accent mb-4">
                Our Solution
              </div>
              <h2 className="text-2xl sm:text-3xl font-semibold text-foreground mb-4">
                Ishango Engine: calculators + expert marketplace
              </h2>
              <div className="space-y-4">
                {[
                  "Built-in calculators for income tax, corporate tax, mortgage, capital gains, and inheritance across 50+ countries.",
                  "Two-sided marketplace connecting users with verified, country-specific financial experts.",
                  "API-first architecture lets any fintech embed our calculation engine.",
                  "Multi-language support (6 languages) with a localization-first design.",
                ].map((point) => (
                  <div key={point} className="flex items-start gap-3">
                    <div className="h-6 w-6 rounded-full bg-accent/10 flex items-center justify-center shrink-0 mt-0.5">
                      <BadgeCheck className="h-3.5 w-3.5 text-accent" />
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {point}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Revenue Model */}
      <section className="py-20 lg:py-28 bg-card border-y border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-2xl sm:text-3xl font-semibold text-foreground">
              Revenue Model
            </h2>
            <p className="mt-3 text-muted-foreground max-w-xl mx-auto">
              Multiple monetization levers with strong unit economics.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {revenueStreams.map((stream) => (
              <div
                key={stream.title}
                className="bg-background rounded-2xl border border-border p-6 hover:border-accent/50 transition-all group"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="h-11 w-11 rounded-xl bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                    <stream.icon className="h-5 w-5 text-accent" />
                  </div>
                  <span className="inline-flex items-center rounded-full bg-accent/10 px-2.5 py-0.5 text-xs font-medium text-accent">
                    {stream.tag}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-foreground">
                  {stream.title}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  {stream.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Competitive Advantage */}
      <section className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-2xl sm:text-3xl font-semibold text-foreground">
              Competitive Advantage
            </h2>
            <p className="mt-3 text-muted-foreground max-w-xl mx-auto">
              Structural moats that compound over time.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {competitiveEdges.map((edge) => (
              <div
                key={edge.title}
                className="bg-card rounded-2xl border border-border p-6 hover:border-accent/50 transition-all hover:-translate-y-1"
              >
                <div className="h-11 w-11 rounded-xl bg-accent/10 flex items-center justify-center mb-4">
                  <edge.icon className="h-5 w-5 text-accent" />
                </div>
                <h3 className="text-sm font-semibold text-foreground">
                  {edge.title}
                </h3>
                <p className="mt-2 text-xs text-muted-foreground leading-relaxed">
                  {edge.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Roadmap */}
      <section className="py-20 lg:py-28 bg-card border-y border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-2xl sm:text-3xl font-semibold text-foreground">
              Product Roadmap
            </h2>
            <p className="mt-3 text-muted-foreground max-w-xl mx-auto">
              Clear milestones with a live, working product.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {timeline.map((phase) => (
              <div
                key={phase.phase}
                className={`rounded-2xl border p-6 ${
                  phase.status === "current"
                    ? "border-accent bg-accent/5"
                    : phase.status === "done"
                    ? "border-border bg-background"
                    : "border-border bg-background"
                }`}
              >
                <div className="flex items-center justify-between mb-4">
                  <span
                    className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      phase.status === "done"
                        ? "bg-accent/10 text-accent"
                        : phase.status === "current"
                        ? "bg-accent text-accent-foreground"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {phase.phase}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {phase.period}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-4">
                  {phase.title}
                </h3>
                <ul className="space-y-2.5">
                  {phase.items.map((item) => (
                    <li key={item} className="flex items-start gap-2.5">
                      <div
                        className={`h-5 w-5 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                          phase.status === "done"
                            ? "bg-accent/10"
                            : phase.status === "current"
                            ? "bg-accent/20"
                            : "bg-muted"
                        }`}
                      >
                        {phase.status === "done" ? (
                          <BadgeCheck className="h-3 w-3 text-accent" />
                        ) : (
                          <ChevronRight
                            className={`h-3 w-3 ${
                              phase.status === "current"
                                ? "text-accent"
                                : "text-muted-foreground"
                            }`}
                          />
                        )}
                      </div>
                      <span className="text-sm text-muted-foreground">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Live Product Demo CTA */}
      <section className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl bg-gradient-to-br from-foreground to-foreground/90 p-10 lg:p-16 text-center">
            <h2 className="text-2xl sm:text-3xl font-semibold text-background mb-4">
              See the product live
            </h2>
            <p className="text-background/70 max-w-lg mx-auto leading-relaxed mb-8">
              Ishango Engine is not a pitch deck — it&apos;s a working product.
              Explore our calculators, browse verified experts, and test the API
              yourself.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button
                size="lg"
                variant="secondary"
                className="gap-2"
                asChild
              >
                <Link href={`/${locale}/calculators/income-tax`}>
                  <Calculator className="h-4 w-4" />
                  Try a Calculator
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="gap-2 bg-transparent text-background border-background/30 hover:bg-background/10 hover:text-background"
                asChild
              >
                <Link href={`/${locale}/experts`}>
                  <Users className="h-4 w-4" />
                  Browse Experts
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="gap-2 bg-transparent text-background border-background/30 hover:bg-background/10 hover:text-background"
                asChild
              >
                <Link href={`/${locale}/docs`}>
                  <Zap className="h-4 w-4" />
                  API Documentation
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* The Ask */}
      <section className="py-20 lg:py-28 bg-card border-y border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl sm:text-3xl font-semibold text-foreground mb-4">
              The Ask
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-10">
              We are raising a <span className="text-foreground font-semibold">$1M seed round</span> to
              accelerate growth, expand our expert network, and build enterprise
              partnerships.
            </p>

            <div className="grid sm:grid-cols-3 gap-6 text-left">
              {[
                {
                  icon: Zap,
                  title: "Engineering",
                  pct: "40%",
                  desc: "Scale platform, AI-powered recommendations, mobile apps",
                },
                {
                  icon: Target,
                  title: "Growth",
                  pct: "35%",
                  desc: "Expert acquisition, SEO, paid marketing, partnerships",
                },
                {
                  icon: ShieldCheck,
                  title: "Operations",
                  pct: "25%",
                  desc: "Compliance, legal across jurisdictions, team expansion",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="rounded-xl border border-border bg-background p-5"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="h-9 w-9 rounded-lg bg-accent/10 flex items-center justify-center">
                      <item.icon className="h-4 w-4 text-accent" />
                    </div>
                    <span className="text-xl font-semibold text-accent">
                      {item.pct}
                    </span>
                  </div>
                  <h3 className="text-sm font-semibold text-foreground">
                    {item.title}
                  </h3>
                  <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact / CTA */}
      <section id="contact" className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-lg mx-auto text-center">
            <div className="h-14 w-14 rounded-2xl bg-accent/10 flex items-center justify-center mx-auto mb-6">
              <Mail className="h-7 w-7 text-accent" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-semibold text-foreground mb-3">
              Let&apos;s talk
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-8">
              Interested in learning more? Drop your email and we&apos;ll send
              you our full pitch deck and financial projections.
            </p>

            {contactSubmitted ? (
              <div className="rounded-xl border border-accent bg-accent/5 p-6">
                <BadgeCheck className="h-8 w-8 text-accent mx-auto mb-3" />
                <p className="text-sm font-medium text-foreground">
                  Thank you for your interest!
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  We&apos;ll send the pitch deck to your email shortly.
                </p>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (contactEmail) {
                    setContactSubmitted(true);
                  }
                }}
                className="flex flex-col sm:flex-row gap-3"
              >
                <input
                  type="email"
                  value={contactEmail}
                  onChange={(e) => setContactEmail(e.target.value)}
                  placeholder="investor@example.com"
                  required
                  className="flex-1 h-11 rounded-lg border border-border bg-background px-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-colors"
                />
                <Button type="submit" size="lg" className="gap-2 shrink-0">
                  Request Pitch Deck
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="h-7 w-7 rounded-md bg-foreground flex items-center justify-center">
              <Calculator className="h-4 w-4 text-background" />
            </div>
            <span className="text-sm font-medium text-foreground">
              Ishango Engine
            </span>
          </div>
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Ishango Engine. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <Link
              href={`/${locale}`}
              className="text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              Product
            </Link>
            <Link
              href={`/${locale}/docs`}
              className="text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              API Docs
            </Link>
            <Link
              href={`/${locale}/experts`}
              className="text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              Experts
            </Link>
          </div>
        </div>
      </footer>
    </main>
  );
}

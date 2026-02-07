import {
  Calculator,
  Building2,
  Landmark,
  Home,
  Globe2,
  Shield,
  Zap,
  RefreshCw,
  PackageSearch,
} from "lucide-react";

const calculatorTypes = [
  {
    icon: Calculator,
    title: "Loan Calculator",
    description:
      "Calculate personal loans, auto loans, and business loans with accurate interest rates and amortization schedules.",
  },
  {
    icon: Landmark,
    title: "Income Tax Calculator",
    description:
      "Estimate your income tax liability based on local tax brackets, deductions, and credits for any supported country.",
  },
  {
    icon: Building2,
    title: "Corporate Tax Calculator",
    description:
      "Calculate corporate tax obligations including federal, state, and local taxes with proper deduction handling.",
  },
  {
    icon: Home,
    title: "Mortgage Calculator",
    description:
      "Plan your home purchase with detailed mortgage calculations including PMI, property tax, and insurance estimates.",
  },
  {
    icon: PackageSearch,
    title: "Import Tax & Duties",
    description:
      "Calculate customs duties, import taxes, and tariffs for international shipments across borders with HS code support.",
  },
];

const benefits = [
  {
    icon: Globe2,
    title: "50+ Countries",
    description:
      "Comprehensive coverage of tax laws and financial regulations across major economies worldwide.",
  },
  {
    icon: Shield,
    title: "Compliance Ready",
    description:
      "Always up-to-date with the latest tax codes and financial regulations for accurate calculations.",
  },
  {
    icon: Zap,
    title: "Lightning Fast API",
    description:
      "Sub-100ms response times with 99.99% uptime guaranteed for enterprise-grade reliability.",
  },
  {
    icon: RefreshCw,
    title: "Real-time Updates",
    description:
      "Automatic updates when tax laws change, ensuring your calculations are always accurate.",
  },
];

export function FeaturesSection() {
  return (
    <section id="features" className="py-20 lg:py-32 bg-card">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Calculator Types */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-semibold text-foreground text-balance">
            Five Powerful Calculators
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Everything you need to handle complex financial calculations across
            multiple jurisdictions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {calculatorTypes.map((calc) => (
            <div
              key={calc.title}
              className="group relative bg-background rounded-2xl border border-border p-6 hover:border-accent/50 transition-all hover:-translate-y-1"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10 text-accent mb-4">
                <calc.icon className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-semibold text-foreground">
                {calc.title}
              </h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                {calc.description}
              </p>
            </div>
          ))}
        </div>

        {/* Benefits */}
        <div className="mt-24 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl sm:text-4xl font-semibold text-foreground text-balance">
              Built for Global Scale
            </h2>
            <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
              Our platform handles the complexity of international finance so
              you don't have to. From tax treaties to currency conversions, we
              have you covered.
            </p>

            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
              {benefits.map((benefit) => (
                <div key={benefit.title} className="flex gap-4">
                  <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center rounded-lg bg-accent/10 text-accent">
                    <benefit.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground">
                      {benefit.title}
                    </h4>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Code Preview */}
          <div className="bg-foreground rounded-2xl p-6 overflow-hidden">
            <div className="flex items-center gap-2 mb-4">
              <div className="h-3 w-3 rounded-full bg-red-500" />
              <div className="h-3 w-3 rounded-full bg-yellow-500" />
              <div className="h-3 w-3 rounded-full bg-green-500" />
            </div>
            <pre className="text-sm text-background/80 font-mono overflow-x-auto">
              <code>{`// Calculate income tax for any country
const result = await calcGlobal.incomeTax({
  country: "US",
  income: 85000,
  filingStatus: "single",
  deductions: {
    standard: true,
    retirement401k: 6000
  }
});

// Response
{
  federalTax: 12548,
  stateTax: 4250,
  effectiveRate: 0.198,
  marginalRate: 0.22,
  breakdown: [...]
}`}</code>
            </pre>
          </div>
        </div>
      </div>
    </section>
  );
}

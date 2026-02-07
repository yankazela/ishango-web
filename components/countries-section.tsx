const countries = [
  { name: "United States", code: "US", flag: "🇺🇸" },
  { name: "United Kingdom", code: "UK", flag: "🇬🇧" },
  { name: "Canada", code: "CA", flag: "🇨🇦" },
  { name: "Germany", code: "DE", flag: "🇩🇪" },
  { name: "France", code: "FR", flag: "🇫🇷" },
  { name: "Australia", code: "AU", flag: "🇦🇺" },
  { name: "Japan", code: "JP", flag: "🇯🇵" },
  { name: "Singapore", code: "SG", flag: "🇸🇬" },
  { name: "Netherlands", code: "NL", flag: "🇳🇱" },
  { name: "Switzerland", code: "CH", flag: "🇨🇭" },
  { name: "Ireland", code: "IE", flag: "🇮🇪" },
  { name: "Spain", code: "ES", flag: "🇪🇸" },
];

const stats = [
  { value: "50+", label: "Countries Supported" },
  { value: "99.99%", label: "Uptime SLA" },
  { value: "10M+", label: "Calculations Daily" },
  { value: "<100ms", label: "Response Time" },
];

export function CountriesSection() {
  return (
    <section id="countries" className="py-20 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-4xl lg:text-5xl font-semibold text-foreground">
                {stat.value}
              </p>
              <p className="mt-2 text-sm text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Countries Grid */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-semibold text-foreground text-balance">
            Global Coverage You Can Trust
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            We continuously expand our coverage to support businesses operating
            in new markets.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {countries.map((country) => (
            <div
              key={country.code}
              className="flex flex-col items-center gap-2 bg-card rounded-xl border border-border p-4 hover:border-accent/50 transition-colors"
            >
              <span className="text-3xl" role="img" aria-label={country.name}>
                {country.flag}
              </span>
              <span className="text-sm font-medium text-foreground">
                {country.name}
              </span>
              <span className="text-xs text-muted-foreground">
                {country.code}
              </span>
            </div>
          ))}
        </div>

        <p className="mt-8 text-center text-sm text-muted-foreground">
          And 38+ more countries with full tax and financial regulation support
        </p>
      </div>
    </section>
  );
}

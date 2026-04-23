export type CountryCalculator = {
  label: string;
  href: string;
};

export type CountryGuide = {
  code: string;
  slug: string;
  name: string;
  summary: string;
  description: string;
  articleTitle: string;
  articleIntro: string;
  overview: string[];
  highlights: string[];
  calculators: CountryCalculator[];
};

export const COUNTRY_GUIDES: CountryGuide[] = [
  {
    code: "US",
    slug: "united-states",
    name: "United States",
    summary: "Federal, state, and local rules make the U.S. one of the most configurable tax environments in our platform.",
    description: "Explore U.S. calculators for income tax, mortgage planning, capital gains, and business tax modeling.",
    articleTitle: "Financial calculators for the United States",
    articleIntro: "The United States combines federal rules with state-level variation, making it one of the most common jurisdictions for advanced calculator workflows.",
    overview: [
      "U.S. tax scenarios often depend on filing status, state of residence, deductions, and payroll timing.",
      "Mortgage affordability and capital gains planning are also high-demand use cases, especially for consumer finance and advisory tooling.",
    ],
    highlights: [
      "Federal and state tax complexity",
      "Strong mortgage and affordability demand",
      "High-value investor capital gains workflows",
    ],
    calculators: [
      { label: "Income Tax", href: "/calculators/income-tax" },
      { label: "Mortgage", href: "/calculators/mortgage" },
      { label: "Capital Gains Tax", href: "/calculators/capital-gains-tax" },
      { label: "Corporate Tax", href: "/calculators/corporate-tax" },
    ],
  },
  {
    code: "UK",
    slug: "united-kingdom",
    name: "United Kingdom",
    summary: "The UK market is a strong fit for income tax, inheritance, and mortgage calculators with clear annual thresholds.",
    description: "See how Ishango Engine supports UK use cases across personal tax, estate planning, and home financing.",
    articleTitle: "Financial calculators for the United Kingdom",
    articleIntro: "The UK is a priority region for household tax planning, inheritance scenarios, and lending affordability journeys.",
    overview: [
      "Income tax workflows often combine salary bands, allowances, and additional scenario-specific deductions.",
      "Inheritance tax and mortgage affordability remain key calculator categories for advisory and fintech experiences.",
    ],
    highlights: [
      "Strong household finance use cases",
      "Popular inheritance tax planning scenarios",
      "High mortgage comparison activity",
    ],
    calculators: [
      { label: "Income Tax", href: "/calculators/income-tax" },
      { label: "Inheritance Tax", href: "/calculators/inheritance-tax" },
      { label: "Mortgage", href: "/calculators/mortgage" },
    ],
  },
  {
    code: "CA",
    slug: "canada",
    name: "Canada",
    summary: "Canada adds provincial layers to income and corporate tax, making calculator configuration especially valuable.",
    description: "Use Canadian calculator coverage for provincial tax, mortgage planning, and business tax scenarios.",
    articleTitle: "Financial calculators for Canada",
    articleIntro: "Canadian financial planning often combines federal and provincial tax treatment, which makes localized calculators particularly useful.",
    overview: [
      "Provincial settings materially affect both personal and corporate tax estimates.",
      "Mortgage planning is another high-traffic workflow due to down payment and amortization modeling needs.",
    ],
    highlights: [
      "Provincial tax treatment",
      "Strong mortgage use cases",
      "Corporate tax localization",
    ],
    calculators: [
      { label: "Income Tax", href: "/calculators/income-tax" },
      { label: "Corporate Tax", href: "/calculators/corporate-tax" },
      { label: "Mortgage", href: "/calculators/mortgage" },
    ],
  },
  {
    code: "DE",
    slug: "germany",
    name: "Germany",
    summary: "Germany is well suited for income tax and corporate tax calculation with strong demand from international workers and SMEs.",
    description: "Model German household and business finance scenarios with tax and investment calculator support.",
    articleTitle: "Financial calculators for Germany",
    articleIntro: "Germany is a core European market where users frequently need payroll, income tax, and small business tax visibility.",
    overview: [
      "Personal tax estimation supports expatriate planning, salary benchmarking, and tax comparison workflows.",
      "Corporate tax and capital gains support also make the market attractive for operators serving SMEs and investors.",
    ],
    highlights: [
      "Strong expat tax demand",
      "SME corporate tax use cases",
      "European investment planning relevance",
    ],
    calculators: [
      { label: "Income Tax", href: "/calculators/income-tax" },
      { label: "Corporate Tax", href: "/calculators/corporate-tax" },
      { label: "Capital Gains Tax", href: "/calculators/capital-gains-tax" },
    ],
  },
  {
    code: "FR",
    slug: "france",
    name: "France",
    summary: "France is a strategic market for household tax, succession planning, and business calculation workflows.",
    description: "Access French coverage for personal tax, inheritance, and corporate calculation scenarios.",
    articleTitle: "Financial calculators for France",
    articleIntro: "French financial planning spans household tax, business structuring, and inheritance scenarios that benefit from localized tooling.",
    overview: [
      "Income and inheritance workflows are common for advisors helping families and internationally mobile users.",
      "Corporate tax support adds relevance for founders and operators expanding into the French market.",
    ],
    highlights: [
      "Personal tax complexity",
      "Estate and inheritance relevance",
      "Business expansion planning",
    ],
    calculators: [
      { label: "Income Tax", href: "/calculators/income-tax" },
      { label: "Inheritance Tax", href: "/calculators/inheritance-tax" },
      { label: "Corporate Tax", href: "/calculators/corporate-tax" },
    ],
  },
  {
    code: "AU",
    slug: "australia",
    name: "Australia",
    summary: "Australia is a high-interest region for household budgeting, mortgage planning, and tax comparisons.",
    description: "Explore Australian support for income tax, home finance, and capital gains scenarios.",
    articleTitle: "Financial calculators for Australia",
    articleIntro: "Australia remains a strong consumer finance market with recurring demand for salary, mortgage, and investment calculators.",
    overview: [
      "Mortgage and affordability modeling is especially valuable for property-focused use cases.",
      "Income tax and capital gains tools complement the broader planning journey for households and investors.",
    ],
    highlights: [
      "Property-focused finance journeys",
      "Strong household calculator demand",
      "Investor capital gains scenarios",
    ],
    calculators: [
      { label: "Income Tax", href: "/calculators/income-tax" },
      { label: "Mortgage", href: "/calculators/mortgage" },
      { label: "Capital Gains Tax", href: "/calculators/capital-gains-tax" },
    ],
  },
  {
    code: "JP",
    slug: "japan",
    name: "Japan",
    summary: "Japan benefits from structured personal and business tax scenarios alongside inheritance-related planning.",
    description: "Review Japanese market support for income, corporate, and inheritance calculator workflows.",
    articleTitle: "Financial calculators for Japan",
    articleIntro: "Japan is a strategic market for users who need predictable tax modeling across household and business cases.",
    overview: [
      "Income and corporate tax support enable financial planning for both employees and operators.",
      "Inheritance planning adds value for high-touch advisory and long-term planning experiences.",
    ],
    highlights: [
      "Business and household planning",
      "Inheritance-focused advisory value",
      "Stable annual scenario modeling",
    ],
    calculators: [
      { label: "Income Tax", href: "/calculators/income-tax" },
      { label: "Corporate Tax", href: "/calculators/corporate-tax" },
      { label: "Inheritance Tax", href: "/calculators/inheritance-tax" },
    ],
  },
  {
    code: "ZA",
    slug: "south-africa",
    name: "South Africa",
    summary: "South Africa offers strong personal tax and investment planning use cases for localized calculator experiences.",
    description: "Use South African coverage for tax, capital gains, and corporate planning workflows.",
    articleTitle: "Financial calculators for South Africa",
    articleIntro: "South Africa is an important regional market for personal tax planning, investment estimation, and SME finance tools.",
    overview: [
      "Income tax remains one of the most common planning use cases across employee and self-employed segments.",
      "Capital gains and corporate tax support strengthen the platform for investor and business users.",
    ],
    highlights: [
      "Regional tax localization",
      "Investor capital gains workflows",
      "SME-focused calculation support",
    ],
    calculators: [
      { label: "Income Tax", href: "/calculators/income-tax" },
      { label: "Capital Gains Tax", href: "/calculators/capital-gains-tax" },
      { label: "Corporate Tax", href: "/calculators/corporate-tax" },
    ],
  },
  {
    code: "IN",
    slug: "india",
    name: "India",
    summary: "India supports strong personal tax and business tax use cases with a large volume of calculation demand.",
    description: "Discover Indian support for tax, business, and mortgage-related calculator experiences.",
    articleTitle: "Financial calculators for India",
    articleIntro: "India is a large addressable market for salary planning, tax comparison, and business finance tooling.",
    overview: [
      "Income tax calculations are central to employee payroll planning and salary comparison workflows.",
      "Corporate tax and financing journeys provide additional value for operators and growing companies.",
    ],
    highlights: [
      "Large personal finance audience",
      "Growing business finance needs",
      "Mortgage and affordability support",
    ],
    calculators: [
      { label: "Income Tax", href: "/calculators/income-tax" },
      { label: "Corporate Tax", href: "/calculators/corporate-tax" },
      { label: "Mortgage", href: "/calculators/mortgage" },
    ],
  },
  {
    code: "CH",
    slug: "switzerland",
    name: "Switzerland",
    summary: "Switzerland is ideal for high-value tax planning and investment-focused financial experiences.",
    description: "View Swiss market support for tax planning and investment-oriented calculations.",
    articleTitle: "Financial calculators for Switzerland",
    articleIntro: "Switzerland is especially relevant for users prioritizing cross-border planning, wealth scenarios, and tax efficiency.",
    overview: [
      "Localized tax support is useful for both domestic planning and internationally mobile user journeys.",
      "Investment and capital-related workflows make Switzerland a strong market for premium calculator experiences.",
    ],
    highlights: [
      "High-value planning market",
      "Cross-border finance relevance",
      "Strong investor use cases",
    ],
    calculators: [
      { label: "Income Tax", href: "/calculators/income-tax" },
      { label: "Capital Gains Tax", href: "/calculators/capital-gains-tax" },
      { label: "Corporate Tax", href: "/calculators/corporate-tax" },
    ],
  },
  {
    code: "BR",
    slug: "brazil",
    name: "Brazil",
    summary: "Brazil combines strong household finance demand with business tax and investment calculation opportunities.",
    description: "Assess Brazilian support across income tax, corporate tax, and investment-related scenarios.",
    articleTitle: "Financial calculators for Brazil",
    articleIntro: "Brazil is a high-potential market for tax localization and regional financial planning experiences.",
    overview: [
      "Income tax support helps users navigate annual estimation and compare compensation scenarios.",
      "Corporate and capital gains coverage broaden the platform for business and investor use cases.",
    ],
    highlights: [
      "Regional tax localization",
      "Growing business demand",
      "Investor planning relevance",
    ],
    calculators: [
      { label: "Income Tax", href: "/calculators/income-tax" },
      { label: "Corporate Tax", href: "/calculators/corporate-tax" },
      { label: "Capital Gains Tax", href: "/calculators/capital-gains-tax" },
    ],
  },
  {
    code: "ES",
    slug: "spain",
    name: "Spain",
    summary: "Spain is useful for household tax, inheritance, and housing-oriented calculator workflows.",
    description: "Explore Spanish coverage for tax, estate, and mortgage planning scenarios.",
    articleTitle: "Financial calculators for Spain",
    articleIntro: "Spain is a strong fit for users focused on family finance, estate planning, and consumer lending use cases.",
    overview: [
      "Income tax and inheritance scenarios are especially relevant for advisory and household planning workflows.",
      "Mortgage support adds value for property-oriented user journeys across the market.",
    ],
    highlights: [
      "Family finance planning",
      "Inheritance-oriented scenarios",
      "Property finance workflows",
    ],
    calculators: [
      { label: "Income Tax", href: "/calculators/income-tax" },
      { label: "Inheritance Tax", href: "/calculators/inheritance-tax" },
      { label: "Mortgage", href: "/calculators/mortgage" },
    ],
  },
];

export const getCountryGuideBySlug = (slug: string) =>
  COUNTRY_GUIDES.find((country) => country.slug === slug);

export const getCountryFlagIconCode = (code: string) => {
  const normalized = code.toLowerCase();

  if (normalized === "uk") {
    return "gb";
  }

  return normalized;
};
export type HttpMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

export interface PathParam {
  key: string;
  example: string;
  description: string;
}

export interface Endpoint {
  name: string;
  method: HttpMethod;
  path: string;
  description: string;
  headers?: { key: string; value: string }[];
  pathParams?: PathParam[];
  body?: string;
  responseExample?: string;
  auth?: boolean;
}

export interface EndpointGroup {
  name: string;
  description: string;
  endpoints: Endpoint[];
}

export const BASE_URL = "https://api.calcglobal.com";

export const endpointGroups: EndpointGroup[] = [
  {
    name: "Ping",
    description: "Health check endpoint to verify the API is operational.",
    endpoints: [
      {
        name: "Ping",
        method: "GET",
        path: "/api/v1/ping",
        description:
          "Returns a simple health check response. Use this to verify the API server is running and reachable.",
        responseExample: JSON.stringify(
          {
            status: "ok",
            timestamp: "2026-02-21T10:30:00.000Z",
          },
          null,
          2
        ),
      },
    ],
  },
  {
    name: "Calculators",
    description:
      "Core calculator endpoints for processing income tax, mortgage, and corporate tax calculations.",
    endpoints: [
      {
        name: "List calculators",
        method: "GET",
        path: "/api/v1/calculators/",
        description:
          "Returns a list of all available calculator types with their supported countries and configuration options.",
        responseExample: JSON.stringify(
          {
            data: [
              {
                id: "income-tax",
                name: "Income Tax Calculator",
                supportedCountries: 50,
                supportedYears: ["2022", "2023", "2024", "2025", "2026"],
              },
              {
                id: "mortgage",
                name: "Mortgage Calculator",
                supportedCountries: 35,
                supportedYears: ["2024", "2025", "2026"],
              },
              {
                id: "corporate-tax",
                name: "Corporate Tax Calculator",
                supportedCountries: 45,
                supportedYears: ["2022", "2023", "2024", "2025", "2026"],
              },
            ],
          },
          null,
          2
        ),
      },
      {
        name: "Process income tax",
        method: "POST",
        path: "/api/v1/calculators/process-income-tax",
        description:
          "Calculates income tax for a given income, country, filing status, and tax year. Returns a detailed tax bracket breakdown.",
        headers: [{ key: "Content-Type", value: "application/json" }],
        body: JSON.stringify(
          {
            countryCode: "US",
            income: 85000,
            filingStatus: "single",
            taxYear: "2026",
          },
          null,
          2
        ),
        responseExample: JSON.stringify(
          {
            totalTax: 13406,
            effectiveRate: 15.77,
            netIncome: 71594,
            brackets: [
              { range: "$0 - $11,925", rate: 10, tax: 1192.5 },
              { range: "$11,925 - $48,475", rate: 12, tax: 4386 },
              { range: "$48,475 - $70,000", rate: 22, tax: 4735.5 },
            ],
            currency: "USD",
          },
          null,
          2
        ),
      },
      {
        name: "Process income tax (private)",
        method: "POST",
        path: "/api/v1/calculators/process-income-tax/private",
        description:
          "Private endpoint for processing income tax calculations. Requires API key authentication. Returns enhanced results including audit trail and comparison data.",
        auth: true,
        headers: [{ key: "Content-Type", value: "application/json" }],
        body: JSON.stringify(
          {
            countryCode: "US",
            income: 85000,
            filingStatus: "single",
            taxYear: "2026",
            includeComparison: true,
          },
          null,
          2
        ),
        responseExample: JSON.stringify(
          {
            totalTax: 13406,
            effectiveRate: 15.77,
            netIncome: 71594,
            brackets: [
              { range: "$0 - $11,925", rate: 10, tax: 1192.5 },
            ],
            comparison: {
              previousYear: { totalTax: 13524, effectiveRate: 15.91 },
              difference: -118,
            },
            auditId: "aud_x7k2m9p4",
          },
          null,
          2
        ),
      },
      {
        name: "Process mortgage",
        method: "POST",
        path: "/api/v1/calculators/process-mortgage",
        description:
          "Calculates mortgage payments including principal & interest, property tax, insurance, and PMI. Returns monthly and total payment breakdowns.",
        headers: [{ key: "Content-Type", value: "application/json" }],
        body: JSON.stringify(
          {
            countryCode: "US",
            homePrice: 450000,
            downPayment: 90000,
            interestRate: 6.5,
            loanTermYears: 30,
          },
          null,
          2
        ),
        responseExample: JSON.stringify(
          {
            monthlyPayment: {
              principalAndInterest: 2275.28,
              propertyTax: 468.75,
              insurance: 131.25,
              pmi: 0,
              total: 2875.28,
            },
            loanSummary: {
              loanAmount: 360000,
              totalPayments: 819100.8,
              totalInterest: 459100.8,
            },
            currency: "USD",
          },
          null,
          2
        ),
      },
      {
        name: "Process corporate tax",
        method: "POST",
        path: "/api/v1/calculators/process-corporate-tax",
        description:
          "Calculates corporate tax liability for a given revenue, deductions, and country. Supports various business entity types.",
        headers: [{ key: "Content-Type", value: "application/json" }],
        body: JSON.stringify(
          {
            countryCode: "UK",
            revenue: 500000,
            deductions: 120000,
            entityType: "limited-company",
            taxYear: "2026",
          },
          null,
          2
        ),
        responseExample: JSON.stringify(
          {
            taxableIncome: 380000,
            taxRate: 25,
            totalTax: 95000,
            effectiveRate: 19.0,
            netProfit: 285000,
            currency: "GBP",
          },
          null,
          2
        ),
      },
    ],
  },
  {
    name: "Countries",
    description:
      "Retrieve supported countries for specific calculator types and tax years.",
    endpoints: [
      {
        name: "List calculator countries",
        method: "GET",
        path: "/api/v1/countries/calculators/:calculatorTypeName/:year",
        description:
          "Returns a list of supported countries for a specific calculator type and year. Useful for populating country selection dropdowns.",
        pathParams: [
          {
            key: "calculatorTypeName",
            example: "income-tax",
            description:
              "The calculator type identifier (income-tax, mortgage, corporate-tax)",
          },
          {
            key: "year",
            example: "2024",
            description: "The tax year to query available countries for",
          },
        ],
        responseExample: JSON.stringify(
          {
            calculatorType: "income-tax",
            year: "2024",
            countries: [
              { code: "US", name: "United States", currency: "USD" },
              { code: "UK", name: "United Kingdom", currency: "GBP" },
              { code: "CA", name: "Canada", currency: "CAD" },
              { code: "DE", name: "Germany", currency: "EUR" },
            ],
          },
          null,
          2
        ),
      },
    ],
  },
  {
    name: "Experts",
    description:
      "Browse and filter financial experts by country and calculator specialization.",
    endpoints: [
      {
        name: "List experts by country and calculator",
        method: "GET",
        path: "/api/v1/experts/:countryCode/:calculatorType",
        description:
          "Returns a list of experts for a specific country and calculator type. Results include expert profiles, ratings, and contact information.",
        pathParams: [
          {
            key: "countryCode",
            example: "CA",
            description: "ISO 3166-1 alpha-2 country code",
          },
          {
            key: "calculatorType",
            example: "income-tax",
            description:
              "The calculator type identifier (income-tax, mortgage, corporate-tax, import-tax, loan)",
          },
        ],
        responseExample: JSON.stringify(
          {
            country: "CA",
            calculatorType: "income-tax",
            experts: [
              {
                id: "exp_k2m9",
                name: "Sarah Mitchell",
                type: "individual",
                role: "Tax Consultant",
                rating: 4.9,
                reviewCount: 142,
              },
            ],
          },
          null,
          2
        ),
      },
      {
        name: "List experts by country",
        method: "GET",
        path: "/api/v1/experts/:countryCode",
        description:
          "Returns all experts operating in a specific country, across all calculator types.",
        pathParams: [
          {
            key: "countryCode",
            example: "CA",
            description: "ISO 3166-1 alpha-2 country code",
          },
        ],
        responseExample: JSON.stringify(
          {
            country: "CA",
            total: 24,
            experts: [
              {
                id: "exp_k2m9",
                name: "Sarah Mitchell",
                type: "individual",
                specializations: ["income-tax", "corporate-tax"],
              },
              {
                id: "exp_p4n7",
                name: "Northgate Advisory",
                type: "company",
                specializations: ["mortgage", "loan"],
              },
            ],
          },
          null,
          2
        ),
      },
    ],
  },
  {
    name: "Plans",
    description:
      "Retrieve available subscription plans and pricing by currency region.",
    endpoints: [
      {
        name: "List plans",
        method: "GET",
        path: "/api/v1/plans/:currencyRegionCode",
        description:
          "Returns available subscription plans with pricing localized to the specified currency region. Includes feature lists and rate limits.",
        pathParams: [
          {
            key: "currencyRegionCode",
            example: "CA",
            description:
              "Region code for currency localization (e.g., US, CA, UK, EU)",
          },
        ],
        responseExample: JSON.stringify(
          {
            region: "CA",
            currency: "CAD",
            plans: [
              {
                id: "starter",
                name: "Starter",
                price: 65,
                interval: "month",
                calculationsPerMonth: 500,
                features: [
                  "3 calculator types",
                  "5 countries",
                  "Email support",
                ],
              },
              {
                id: "professional",
                name: "Professional",
                price: 265,
                interval: "month",
                calculationsPerMonth: 5000,
                features: [
                  "All calculators",
                  "All countries",
                  "Priority support",
                  "API access",
                ],
              },
            ],
          },
          null,
          2
        ),
      },
    ],
  },
  {
    name: "Subscriptions",
    description:
      "Manage user subscriptions including creation and plan management.",
    endpoints: [
      {
        name: "Create subscription",
        method: "POST",
        path: "/api/v1/subscriptions/",
        description:
          "Creates a new subscription for the authenticated user. Requires a valid plan ID and payment method.",
        auth: true,
        headers: [{ key: "Content-Type", value: "application/json" }],
        body: JSON.stringify(
          {
            planId: "professional",
            paymentMethodId: "pm_1234567890",
            billingInterval: "month",
          },
          null,
          2
        ),
        responseExample: JSON.stringify(
          {
            id: "sub_abc123",
            planId: "professional",
            status: "active",
            currentPeriodStart: "2026-02-21T00:00:00.000Z",
            currentPeriodEnd: "2026-03-21T00:00:00.000Z",
            cancelAtPeriodEnd: false,
          },
          null,
          2
        ),
      },
    ],
  },
];

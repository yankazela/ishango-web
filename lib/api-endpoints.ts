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
        auth: true,
        description:
          "Returns a list of all available calculator types with their supported countries and configuration options.",
        responseExample: JSON.stringify(
          {
            data: [
              {
                "id": "4ade4f6f-e9a7-431c-b4fc-22e81fc2ca4d",
                "code": "INHERITANCE_TAX",
                "description": "Inheritance Tax Calculator"
              },
              {
                "id": "89e89a90-ebae-43d4-9c57-30e9f3b4a5bd",
                "code": "INCOME_TAX",
                "description": "Income Tax Calculator"
              },
              {
                "id": "bdfdeb6b-9497-410a-8d83-8d6bd572bde4",
                "code": "MORTGAGE",
                "description": "Mortgage Calculator"
              },
              {
                "id": "de10134b-ffab-4835-b608-592934b4331e",
                "code": "CAPITAL_GAINS",
                "description": "Capital gain tax"
              },
              {
                "id": "f0a9d3dc-287b-4c5d-96a3-2acc91974079",
                "code": "CORPORATE_TAX",
                "description": "Corporate Tax"
              }
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
        auth: true,
        description:
          "Calculates income tax for a given income, country, filing status, and tax year. Returns a detailed tax bracket breakdown.",
        headers: [{ key: "Content-Type", value: "application/json" }],
        body: JSON.stringify(
          {
            income: 85000,
            year: "2026",
            countryCode: "CA",
            provinceCode: "ON",
            familyPart: 1,
            medicalAidMembers: 0,
            age: 40,
            includeMedicareLevy: true,
            isResident: true,
          },
          null,
          2
        ),
        responseExample: JSON.stringify(
          {
              "grossIncome": 50000,
              "netIncome": 30713.77,
              "incomeTax": 8286.23,
              "taxBracketBreakdown": [
                  {
                      "bracketIndex": 0,
                      "bracketName": "Bracket 1",
                      "from": 0,
                      "to": 11294,
                      "rate": 0,
                      "amountInBracket": 11294,
                      "taxOnAmount": 0
                  },
                  {
                      "bracketIndex": 1,
                      "bracketName": "Bracket 2",
                      "from": 11294,
                      "to": 28797,
                      "rate": 0.11,
                      "amountInBracket": 17503,
                      "taxOnAmount": 1925.33
                  },
                  {
                      "bracketIndex": 2,
                      "bracketName": "Bracket 3",
                      "from": 28797,
                      "to": 82341,
                      "rate": 0.3,
                      "amountInBracket": 21203,
                      "taxOnAmount": 6360.9
                  },
                  {
                      "bracketIndex": 3,
                      "bracketName": "Bracket 4",
                      "from": 82341,
                      "to": 177106,
                      "rate": 0.41,
                      "amountInBracket": 0,
                      "taxOnAmount": 0
                  }
              ]
          },
          null,
          2
        ),
      },
      {
        name: "Process mortgage",
        method: "POST",
        path: "/api/v1/calculators/process-mortgage",
        auth: true,
        description:
          "Calculates mortgage payments including principal & interest, property tax, insurance, and PMI. Returns monthly and total payment breakdowns.",
        headers: [{ key: "Content-Type", value: "application/json" }],
        body: JSON.stringify(
          {
            "countryCode": "au",
            "year": "2025",
            "details": {
                "propertyPrice": 450000,
                "downPayment": 45000,
                "interestRate": 2.5,
                "grossMonthlyIncome": 50000,
                "isPrimaryResidence": true,
                "isFirstTimeBuyer": true,
                "paymentFrequency": "MONTHLY",
                "amortizationYears": 20,
                "loanDurationYears": 20
            }
          },
          null,
          2
        ),
        responseExample: JSON.stringify(
          {
              "loanAmount": 405000,
              "lmiPremium": 4860,
              "totalMortgage": 409860,
              "monthlyPayment": 2171.859997381815,
              "totalInterestPaid": 111386.39937163558,
              "totalPaid": 521246.3993716356,
              "stampDuty": 20876,
              "amortizationSchedule": [
                  {
                      "year": 1,
                      "principal": 15998.307317236788,
                      "interest": 10064.012651344994,
                      "balance": 393861.6926827632
                  },
                  {
                      "year": 2,
                      "principal": 16402.879823634164,
                      "interest": 9659.440144947615,
                      "balance": 377458.8128591289
                  },
                  {
                      "year": 3,
                      "principal": 16817.683344456193,
                      "interest": 9244.636624125586,
                      "balance": 360641.1295146727
                  },
                  {
                      "year": 4,
                      "principal": 17242.976606271044,
                      "interest": 8819.343362310734,
                      "balance": 343398.15290840156
                  },
                  {
                      "year": 5,
                      "principal": 17679.02487844259,
                      "interest": 8383.29509013919,
                      "balance": 325719.128029959
                  },
                  {
                      "year": 6,
                      "principal": 18126.100138587575,
                      "interest": 7936.219829994205,
                      "balance": 307593.02789137146
                  },
                  {
                      "year": 7,
                      "principal": 18584.48124221703,
                      "interest": 7477.838726364749,
                      "balance": 289008.5466491545
                  },
                  {
                      "year": 8,
                      "principal": 19054.45409666757,
                      "interest": 7007.865871914213,
                      "balance": 269954.09255248704
                  },
                  {
                      "year": 9,
                      "principal": 19536.311839431197,
                      "interest": 6526.008129150584,
                      "balance": 250417.78071305578
                  },
                  {
                      "year": 10,
                      "principal": 20030.355020994768,
                      "interest": 6031.964947587011,
                      "balance": 230387.425692061
                  },
                  {
                      "year": 11,
                      "principal": 20536.891792303195,
                      "interest": 5525.428176278584,
                      "balance": 209850.5338997578
                  },
                  {
                      "year": 12,
                      "principal": 21056.238096963312,
                      "interest": 5006.081871618469,
                      "balance": 188794.29580279448
                  },
                  {
                      "year": 13,
                      "principal": 21588.717868308257,
                      "interest": 4473.602100273527,
                      "balance": 167205.57793448627
                  },
                  {
                      "year": 14,
                      "principal": 22134.663231445327,
                      "interest": 3927.656737136457,
                      "balance": 145070.91470304102
                  },
                  {
                      "year": 15,
                      "principal": 22694.41471041331,
                      "interest": 3367.9052581684696,
                      "balance": 122376.4999926277
                  },
                  {
                      "year": 16,
                      "principal": 23268.321440578507,
                      "interest": 2793.9985280032674,
                      "balance": 99108.17855204918
                  },
                  {
                      "year": 17,
                      "principal": 23856.741386401918,
                      "interest": 2205.5785821798618,
                      "balance": 75251.43716564728
                  },
                  {
                      "year": 18,
                      "principal": 24460.041564713385,
                      "interest": 1602.2784038683926,
                      "balance": 50791.39560093389
                  },
                  {
                      "year": 19,
                      "principal": 25078.5982736321,
                      "interest": 983.7216949496833,
                      "balance": 25712.79732730179
                  },
                  {
                      "year": 20,
                      "principal": 25712.79732727602,
                      "interest": 349.5226413057583,
                      "balance": 2.5768713385332376e-8
                  }
              ],
              "otherFees": {
                  "notaryFees": {
                      "value": 20876,
                      "label": "STAMP_DUTY"
                  },
                  "bankFees": {
                      "value": 0,
                      "label": "BANK_FEES"
                  },
                  "monthlyInsuranceFees": {
                      "value": 4860,
                      "label": "LMI_PREMIUM"
                  }
              }
          },
          null,
          2
        ),
      },
      {
        name: "Process corporate tax",
        method: "POST",
        path: "/api/v1/calculators/process-corporate-tax",
        auth: true,
        description:
          "Calculates corporate tax liability for a given revenue, deductions, and country. Supports various business entity types.",
        headers: [{ key: "Content-Type", value: "application/json" }],
        body: JSON.stringify(
          {
            "countryCode": "au",
            "year": "2025",
            "details": {
                "taxableIncome": 4000000,
                "annualTurnover": 10000000,
                "isSmallBusiness": false
            }
          },
          null,
          2
        ),
        responseExample: JSON.stringify(
          {
              "federalTax": {
                  "corporateTax": 1200000,
                  "effectiveTaxRate": 30,
                  "breakdowns": [
                      {
                          "from": "0",
                          "to": "Above",
                          "rate": 0.3,
                          "amount": 1200000
                      }
                  ]
              }
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
        auth: true,
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
        auth: true,
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

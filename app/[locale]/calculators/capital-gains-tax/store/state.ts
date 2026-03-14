import { GetCalCountriesResponse } from "../../types";

export interface CalculatorState {
    form: {
        countryCalculators: GetCalCountriesResponse[];
        loading: boolean;
        error: string | null;
    },
    results: {
        data: CapitalGainsResult | null;
        loading: boolean;
        error: string | null;
    }
}

export interface Breakdown {
    from: string;
    to: string;
    rate: number;
    amount: number;
}

export interface ResultItem {
    corporateTax: number;
    effectiveTaxRate: number;
    breakdowns: Breakdown[];
}

export interface CapitalGainsResult {
    taxableGain: number;
    capitalGainTax: number;
    socialContributions: number;
    totalTax: number;
    netInvestmentIncomeTax: number;
    effectiveRate: number;
    breakdowns: Breakdown[];
}



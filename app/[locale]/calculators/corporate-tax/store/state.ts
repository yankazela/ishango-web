import { GetCalCountriesResponse } from "../../types";

export interface CalculatorState {
    form: {
        countryCalculators: GetCalCountriesResponse[];
        loading: boolean;
        error: string | null;
    },
    result: {
        data: CorporateTaxResult | null;
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

export interface CorporateTaxResult {
	corporateTax: number;
	effectiveTaxRate: number;
	breakdowns: Breakdown[];
}



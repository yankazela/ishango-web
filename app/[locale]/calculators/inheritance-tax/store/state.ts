import { GetCalCountriesResponse } from "../../types";

export interface CalculatorState {
    form: {
        countryCalculators: GetCalCountriesResponse[];
        loading: boolean;
        error: string | null;
    },
    results: {
        data: InheritanceResult | null;
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

export interface InheritanceResult {
    taxableEstate: number;
    inheritanceTax: number;
    effectiveRate: number;
    breakdowns: Breakdown[];
}




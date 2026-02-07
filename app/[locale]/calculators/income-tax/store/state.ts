import { GetCalCountriesResponse } from "../../types";

export interface CalculatorState {
    form: {
        countryCalculators: GetCalCountriesResponse[];
        loading: boolean;
        error: string | null;
    },
    result: {
        data: IncomeTaxResult | null;
        loading: boolean;
        error: string | null;
    }
}

export interface BracketAllocation {
	bracketIndex: number;
	bracketName: string;
	from: number;
	to: number | null;
	rate: number;
	amountInBracket: number;
	taxOnAmount: number;
}

export interface IncomeTaxResult {
	grossIncome: number;
    netIncome: number;
	incomeTax: number;
	taxBracketBreakdown: BracketAllocation[];
}


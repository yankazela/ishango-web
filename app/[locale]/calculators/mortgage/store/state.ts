import { GetCalCountriesResponse } from "../../types";

export interface AmortizationScheduleItem {
    year: number;
    principal: number;
    interest: number;
    balance: number;
}

export interface OtherFees {
    notaryFees: {
        value: number;
        label: string;
    };
    bankFees: {
        value: number;
        label: string;
    };
    monthlyInsuranceFees: {
        value: number;
        label: string;
    };
}

export interface CalculatorState {
    form: {
        countryCalculators: GetCalCountriesResponse[];
        loading: boolean;
        error: string | null;
    },
    result: {
        data: MortgageResult | null;
        loading: boolean;
        error: string | null;
    }
}

export interface MortgageResult {
	loanAmount: number;
    monthlyPayment: number;
    totalInterestPaid: number;
    totalPaid: number;
    amortizationSchedule: AmortizationScheduleItem[];
    otherFees: OtherFees;
}


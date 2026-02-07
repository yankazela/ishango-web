import { ca } from "date-fns/locale";
import { create } from "domain";

export interface EndpointProps {
    endpoint: string;
    auth: boolean;
    headers: {
        [key: string]: string;
    }
}

export const endpoints = {
    listCountryCalculators: (name: string, year: string): EndpointProps => ({
        endpoint: `/countries/calculators/${name}/${year}`,
        auth: false,
        headers: {}
    }),
    calculateIncomeTax: (): EndpointProps => ({
        endpoint: `/calculators/process-income-tax/private`,
        auth: false,
        headers: {
            'Content-Type': 'application/json'
        }
    }),
    calculateMortgage: (): EndpointProps => ({
        endpoint: `/calculators/process-mortgage`,
        auth: false,
        headers: {
            'Content-Type': 'application/json'
        }
    }),
    calculateCorporateTax: (): EndpointProps => ({
        endpoint: `/calculators/process-corporate-tax`,
        auth: false,
        headers: {
            'Content-Type': 'application/json'
        }
    }),
    listPlans: (currencyCode: string): EndpointProps => ({
        endpoint: `/plans/${currencyCode}`,
        auth: false,
        headers: {}
    }),
    listCalculatorTypes: (): EndpointProps => ({
        endpoint: `/calculators`,
        auth: false,
        headers: {}
    }),
    createSubscription: (): EndpointProps => ({
        endpoint: `/subscriptions`,
        auth: false,
        headers: {
            'Content-Type': 'application/json'
        }
    }),
};
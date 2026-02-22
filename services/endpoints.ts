import { CalculatorType } from "@/app/[locale]/calculators/types";
import { ca } from "date-fns/locale";
import { create } from "domain";
import { get } from "http";

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
    getExperts: (countryCode: string): EndpointProps => ({
        endpoint: `/experts/${countryCode}`,
        auth: false,
        headers: {}
    }),
    getCountriesWithCalculators: (): EndpointProps => ({
        endpoint: `/countries/calculators`,
        auth: false,
        headers: {}
    }),
    createExpert: (): EndpointProps => ({
        endpoint: `/experts`,
        auth: false,
        headers: {
            'Content-Type': 'application/json'
        }
    }),
};
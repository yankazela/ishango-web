import { get } from "http";
import { features } from "process";

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
        auth: true,
        headers: {
            'Content-Type': 'application/json'
        }
    }),
    calculateMortgage: (): EndpointProps => ({
        endpoint: `/calculators/process-mortgage`,
        auth: true,
        headers: {
            'Content-Type': 'application/json'
        }
    }),
    calculateCorporateTax: (): EndpointProps => ({
        endpoint: `/calculators/process-corporate-tax`,
        auth: true,
        headers: {
            'Content-Type': 'application/json'
        }
    }),
    calculateCapitalGainsTax: (): EndpointProps => ({
        endpoint: `/calculators/process-capital-gains-tax`,
        auth: true,
        headers: {
            'Content-Type': 'application/json'
        }
    }),
    calculateInheritanceTax: (): EndpointProps => ({
        endpoint: `/calculators/process-inheritance-tax`,
        auth: true,
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
        auth: true,
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
    getCountriesArticles: (language: string): EndpointProps => ({
        endpoint: `/countries/articles/${language}`,
        auth: false,
        headers: {}
    }),
    createExpert: (): EndpointProps => ({
        endpoint: `/experts`,
        auth: false,
        headers: {}
    }),
    featureFlags: (): EndpointProps => ({
        endpoint: `/feature-flags`,
        auth: false,
        headers: {}
    }),
    getArticleCards: (language: string): EndpointProps => ({
        endpoint: `/blog/index/${language}`,
        auth: false,
        headers: {}
    }),
    getArticleContent: (slug: string): EndpointProps => ({
        endpoint: `/blog/article/${slug}`,
        auth: false,
        headers: {}
    }),
    getUserDetails: (): EndpointProps => ({
        endpoint: `/subscriptions/details`,
        auth: false,
        headers: {}
    }),
    createApiKey: (subscriptionId: string): EndpointProps => ({
        endpoint: `/subscriptions/${subscriptionId}/api-keys`,
        auth: false,
        headers: {
            'Content-Type': 'application/json'
        }
    }),
    revokeApiKey: (subscriptionId: string, apiKeyId: string): EndpointProps => ({
        endpoint: `/subscriptions/${subscriptionId}/api-keys/${apiKeyId}/deactivate`,
        auth: false,
        headers: {
            'Content-Type': 'application/json'
        }
    }),
    getCalculators: (): EndpointProps => ({
        endpoint: `/calculators`,
        auth: true,
        headers: {}
    }),
};
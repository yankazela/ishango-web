export interface Subscription {
	planId: string;
	paymentFrequencyCode: string;
	currencyRegionCode: string;
	currentCost: number;
    selectedCalculators: string;
}

export interface Client {
	firstName: string;
	lastName: string;
	email: string;
	phone: string;
	countryDialCode: string;
	company: string;
	companySize: string;
    isSso: boolean;
    password?: string;
}

export interface CreateSubscriptionRequest {
	subscription: Subscription;
	client: Client;
}

export interface PlanItem {
	id: string;
	code: string;
	monthlyCost: number | null;
	yearlyCost: number | null;
	description: string;
	maxApiCalculationsPerMonth: number | null;
	maxCountries: number | null;
    maxCalculators: number | null;
	apiType: string;
	currencySymbol: string;
    isMostPopular?: boolean;
	isCustomPrice?: boolean;
}

export interface CalculatorTypeItem {
	id: string;
	code: string;
	description: string;
}

export interface GetStartedState {
    plans: {
        items: PlanItem[];
        loading: boolean;
        error: string | null;
    };
    calculatorTypes: {
        items: CalculatorTypeItem[];
        loading: boolean;
        error: string | null;
    };
    subscriptionCreation: {
        created: boolean;
        loading: boolean;
        error: string | null;
    };
}
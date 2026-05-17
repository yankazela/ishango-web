
export interface Calculator {
	id: string;
	code: string;
	description: string;
}
export interface ApiKeyItem {
	id: string;
	name: string;
	apiKey: string;
	isActive: boolean;
	createdAt: string;
	disabledAt: string | null;
	remainingThisMonth: number;
	usedThisMonth: number;
}
export interface UserDetails {
	client: {
		id: string;
		firstName: string;
		lastName: string;
		email: string;
		phone: string;
		countryDialCode: string;
		company: string;
		companySize: string;
		isSso: boolean;
		createdAt: string;
		disabledAt: string | null;
	};
	subscription: {
		id: string;
		startDate: string;
		currentCost: number;
		currencyRegionCode: string;
		selectedCalculators: string[];
		createdAt: string;
		disabledAt: string | null;
	};
	plan: {
		id: string;
		description: string;
		code: string;
		maxApiCalculationsPerMonth: number | null;
		maxCountries: number | null;
		maxCalculators: number | null;
		apiType: string;
		isMostPopular: boolean;
		isCustomPrice: boolean;
		createdAt: string;
		disabledAt: string | null;
	};
	paymentFrequency: {
		id: string;
		description: string;
		code: string;
	};
	status: {
		id: string;
		description: string;
		code: string;
	};
	apiKeys: ApiKeyItem[];
}

export interface DashboardState {
    userDetails: {
		data: UserDetails | null;
		loading: boolean;
		error: string | null;
	};
	createApiKey: {
		loading: boolean;
		error: string | null;
		newKey: string | null;
	};
	revokeApiKey: {
		loading: boolean;
		error: string | null;
	};
	calculators: {
		data: Calculator[] | null;
		loading: boolean;
		error: string | null;
	};
}
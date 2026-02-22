export interface ExpertListItem {
	id: string;
	name: string;
	image: string;
	type: "person" | "company";
	role: string;
	rating: number;
	description: string;
	calculators: string[];
}

export interface CountryWithCalculatorsItem {
	id: string;
	name: string;
	code: string;
	currency: string;
	currencySymbol: string;
	calculators: {
		id: string;
		name: string;
	}[];
}

export interface ExpertsState {
    experts: {
        data: ExpertListItem[] | null;
        loading: boolean;
        error: string | null;
    },
	countries: {
		data: CountryWithCalculatorsItem[];
		loading: boolean;
		error: string | null;
	},
	isSubmitting: boolean;
	submissionError: string | null;
	hasSubmitted: boolean;
}

export enum ExpertTypes {
	COMPANY = 'COMPANY',
	INDIVIDUAL = 'INDIVIDUAL',
}

export interface CreateExpertRequest {
	name: string;
	email: string;
	phone: string;
	bio: string;
	profilePictureUrl: string;
	role: string;
	rating: number;
	expertType: ExpertTypes;
	calculatorCountryIds: string[];
}
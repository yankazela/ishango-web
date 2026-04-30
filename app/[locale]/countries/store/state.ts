import { CalculatorType } from '../../calculators/types';

export interface Calculator {
    id: string;
    name: CalculatorType;
}

export interface Country {
	id: string;
	name: string;
	code: string;
	currency: string;
	currencySymbol: string;
	calculators: Calculator[];
}

export type CountryArticle = {
    code: string;
    slug: string;
    name: string;
    summary: string;
    description: string;
    articleTitle: string;
    articleIntro: string;
    overview: string[];
    highlights: string[];
}

export interface CountriesState {
    countries: {
        items: Country[];
        loading: boolean;
        error: string | null;
    };
    articles: {
        items: CountryArticle[];
        loading: boolean;
        error: string | null;
    };
}
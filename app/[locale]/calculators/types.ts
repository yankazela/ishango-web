export interface Slider {
    max: number;
    min: number;
    step: number;
}

export interface InputField {
    name: string;
    type: 'number' | 'select' | 'text' | 'boolean';
    required: boolean;
    label: string;
    options?: SelectOptions[];
    unit?: string;
    isCurrency?: boolean;
    slider?: Slider;
}

export interface SelectOptions {
    label: string;
    value: string | number;
}

export interface GetCalCountriesResponse {
	id: string;
	countryId: string;
	name: string;
	code: string;
    currency: string;
    currencySymbol: string;
	withProvincial: boolean;
	provinces: CountryProvince[];
	formInputs: InputField[];
    taxBrackets: TaxBracket[];
}

export interface CountryProvince {
	id: string;
	name: string;
	code: string;
}

export interface TaxBracket {
	from: number;
	to: number | null;
	rate: number;
}

export enum CalculatorType {
    INCOME_TAX = 'INCOME_TAX',
    MORTGAGE = 'MORTGAGE',
    LOAN = 'LOAN',
    CORPORATE_TAX = 'CORPORATE_TAX',
}
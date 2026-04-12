export type CalculatorType =
  | "INCOME_TAX_CALCULATOR"
  | "CORPORATE_TAX_CALCULATOR"
  | "MORTGAGE_CALCULATOR"
  | "CAPITAL_GAINS_TAX_CALCULATOR"
  | "INHERITANCE_TAX_CALCULATOR";
  
export interface ArticleCardDetails {
	title: string;
	slug: string;
	description: string;
	country: string;
	countryCode: string;
	calculator: CalculatorType;
	date: string;
	author: string;
	tags: string[];
	locale: string;
	readingTime: number;
}

export interface ArticleData {
  frontmatter: ArticleCardDetails;
  content: string;           // raw markdown body (frontmatter stripped)
}

export interface BlogState {
    articleCards: {
        data: {
            articles: ArticleCardDetails[];
            updatedAt: string;
        } | null;
        loading: boolean;
        error: string | null;
    };
    currentArticle: {
        data: ArticleData | null;
        loading: boolean;
        error: string | null;
    };
}
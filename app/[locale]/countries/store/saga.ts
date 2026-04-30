import { AxiosResponse } from "axios";
import { takeLatest, put, call } from "redux-saga/effects";
import { PayloadAction } from '@reduxjs/toolkit';
import { endpoints } from "@/services/endpoints";
import { getRequest } from "@/services/requests";
import { EbaseUrls } from "@/services/requests/types";
import { Country, CountryArticle } from "./state";
import {
    fetchCountries,
    fetchCountriesSuccess,
    fetchCountriesFailure,
    fetchArticles,
    fetchArticlesSuccess,
    fetchArticlesFailure
} from "./slice";

const getArticles = async (language: string): Promise<CountryArticle[]> => {
    try {
        const path = endpoints.getCountriesArticles(language);

        const response: AxiosResponse<CountryArticle[]> = await getRequest({
            path: path.endpoint,
            auth: path.auth,
            headers: path.headers,
        }, EbaseUrls.ISHANGO_BE);

        return response.data;
    } catch (error: any) {
        console.log(error);
        throw new Error(error.message || 'An error occurred while fetching articles');
    }
};

const getCountriesWithCalculators = async (): Promise<Country[]> => {
    try {
        const path = endpoints.getCountriesWithCalculators();

        const response: AxiosResponse<Country[]> = await getRequest({
            path: path.endpoint,
            auth: path.auth,
            headers: path.headers,
        }, EbaseUrls.ISHANGO_BE
        );

        return response.data;
    } catch (error: any) {
        console.log(error);
        throw new Error(error.message || 'An error occurred while fetching countries with calculators');
    }
};


function* handleFetchCountries() {
    try {
        const countries: Country[] = yield call(getCountriesWithCalculators);
        yield put(fetchCountriesSuccess(countries));
    } catch (error: any) {
        yield put(fetchCountriesFailure(error.message || 'An error occurred while fetching countries'));
    }
}

function* handleFetchArticles(action: PayloadAction<{ language: string }>) {
    try {
        const articles: CountryArticle[] = yield call(getArticles, action.payload.language);
        yield put(fetchArticlesSuccess(articles));
    } catch (error: any) {
        yield put(fetchArticlesFailure(error.message || 'An error occurred while fetching articles'));
    }
}

function* countriesSaga() {
    yield takeLatest(fetchCountries.type, handleFetchCountries);
    yield takeLatest(fetchArticles.type, handleFetchArticles);
}
export default countriesSaga;

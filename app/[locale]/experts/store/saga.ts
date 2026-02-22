import { AxiosResponse } from "axios";
import { takeLatest, put, call } from "redux-saga/effects";
import { PayloadAction } from '@reduxjs/toolkit';
import { endpoints } from "@/services/endpoints";
import { getRequest, postRequest } from "@/services/requests";
import { EbaseUrls } from "@/services/requests/types";
import { CountryWithCalculatorsItem, CreateExpertRequest, ExpertListItem } from "./state";
import {
    fetchExpertsStart,
    fetchExpertsSuccess,
    fetchExpertsFailure,
    fetchCountriesStart,
    fetchCountriesSuccess,
    fetchCountriesFailure,
    createExpertFailure,
    createExpertStart,
    createExpertSuccess
} from "./slice";

const getCountriesWithCalculators = async (): Promise<CountryWithCalculatorsItem[]> => {
    try {
        const path = endpoints.getCountriesWithCalculators();

        const response: AxiosResponse<CountryWithCalculatorsItem[]> = await getRequest({
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


const getExperts = async (countryCode: string): Promise<ExpertListItem[]> => {
    try {
        const path = endpoints.getExperts(countryCode);

        const response: AxiosResponse<ExpertListItem[]> = await getRequest({
                path: path.endpoint,
                auth: path.auth,
                headers: path.headers,
            },
            EbaseUrls.ISHANGO_BE
        );

        return response.data;
    } catch (error: any) {
        console.log(error);
        throw new Error(error.message || 'An error occurred while fetching experts');
    }
};

const createExpertApi = async (payload: CreateExpertRequest): Promise<void> => {
    try {
        const path = endpoints.createExpert();

        await postRequest({
                path: path.endpoint,
                auth: path.auth,
                headers: path.headers,
                data: payload,
            },
            EbaseUrls.ISHANGO_BE
        );
    } catch (error: any) {
        console.log(error);
        throw new Error(error.message || 'An error occurred while creating expert');
    }
};

function* handleFetchExperts(action: PayloadAction<{ countryCode: string }>) {
    try {
        const { countryCode } = action.payload;

        const response: ExpertListItem[] = yield call(getExperts, countryCode);
        yield put(fetchExpertsSuccess(response));
    } catch (error: any) {
        yield put(fetchExpertsFailure(error.message));
    }
}

function* handleFetchCountries() {
    try {
        const response: CountryWithCalculatorsItem[] = yield call(getCountriesWithCalculators);
        yield put(fetchCountriesSuccess(response));
    } catch (error: any) {
        yield put(fetchCountriesFailure(error.message));
    }
}

function* handleCreateExpert(action: PayloadAction<CreateExpertRequest>) {
    try {
        const { payload } = action;
        yield call(createExpertApi, payload);
        yield put(createExpertSuccess());
    } catch (error: any) {
        yield put(createExpertFailure(error.message));
    }
}

function* expertsSaga() {
    yield takeLatest(fetchExpertsStart.type, handleFetchExperts);
    yield takeLatest(fetchCountriesStart.type, handleFetchCountries);
    yield takeLatest(createExpertStart.type, handleCreateExpert);
}
export default expertsSaga;

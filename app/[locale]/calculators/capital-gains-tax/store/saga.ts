import { AxiosResponse } from "axios";
import { takeLatest, put, call } from "redux-saga/effects";
import { PayloadAction } from '@reduxjs/toolkit';
import { endpoints } from "../../../../../services/endpoints";
import { getRequest, postRequest } from "../../../../../services/requests";
import { EbaseUrls } from "../../../../../services/requests/types";

import {
    fetchCalculatorsStart,
    fetchCalculatorsSuccess,
    fetchCalculatorsFailure,
    calculateCapitalGainsTax,
    calculateCapitalGainsTaxSuccess,
    calculateCapitalGainsTaxFailure
} from "./slice";
import { CapitalGainsResult } from "./state";
import { GetCalCountriesResponse } from "../../types";

const getCalculators = async (calculatorTypeName: string, year: string): Promise<GetCalCountriesResponse[]> => {
    try {
        const path = endpoints.listCountryCalculators(calculatorTypeName, year);

        const response: AxiosResponse<GetCalCountriesResponse[]> = await getRequest({
                path: path.endpoint,
                auth: path.auth,
                headers: path.headers,
            },
            EbaseUrls.ISHANGO_BE
        );

        return response.data;
    } catch (error: any) {
        console.log(error);
        throw new Error(error.message || 'An error occurred while resending email');
    }
}

const postCapitalGainsTaxCalculation = async (inputs: { [key: string]: any }): Promise<CapitalGainsResult> => {
    try {
        const path = endpoints.calculateCapitalGainsTax();

        const response: AxiosResponse<CapitalGainsResult> = await postRequest({
                path: path.endpoint,
                auth: path.auth,
                headers: path.headers,
                data: inputs
            },
            EbaseUrls.ISHANGO_BE
        );

        return response.data;
    } catch (error: any) {
        throw new Error(error.message);
    }
};

function* handleFetchCalculators(action: PayloadAction<{ year: string }>) {
    try {
        const { year } = action.payload;

        const response: GetCalCountriesResponse[] = yield call(getCalculators, "capital_gains", year);
        yield put(fetchCalculatorsSuccess(response));
    } catch (error: any) {
        yield put(fetchCalculatorsFailure(error.message));
    }
}

function* handleCalculateCapitalGainsTax(action: PayloadAction<{ [key: string]: any } >) {
    try {
        const response: CapitalGainsResult = yield call(postCapitalGainsTaxCalculation, action.payload);
        yield put(calculateCapitalGainsTaxSuccess(response));
    } catch (error: any) {
        yield put(calculateCapitalGainsTaxFailure(error.message));
    }
}

function* capitalGainsTaxSaga() {
    yield takeLatest(fetchCalculatorsStart.type, handleFetchCalculators);
    yield takeLatest(calculateCapitalGainsTax.type, handleCalculateCapitalGainsTax);
}

export default capitalGainsTaxSaga;
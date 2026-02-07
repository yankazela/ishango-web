import { takeLatest, put, call } from "redux-saga/effects";
import { PayloadAction } from '@reduxjs/toolkit';
import { endpoints } from "../../../../../services/endpoints";
import { getRequest, postRequest } from "../../../../../services/requests";
import { EbaseUrls } from "../../../../../services/requests/types";

import {
    fetchCalculatorsStart,
    fetchCalculatorsSuccess,
    fetchCalculatorsFailure,
    calculateCorporateTax,
    calculateCorporateTaxSuccess,
    calculateCorporateTaxFailure
} from "./slice";
import { CorporateTaxResult } from "./state";
import { GetCalCountriesResponse } from "../../types";
import { AxiosResponse } from "axios";

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

const postCorporateTaxCalculation = async (inputs: { [key: string]: any }): Promise<any> => {
    try {
        const path = endpoints.calculateCorporateTax();

        const response: AxiosResponse<CorporateTaxResult> = await postRequest({
                path: path.endpoint,
                auth: path.auth,
                headers: path.headers,
                data: inputs
            },
            EbaseUrls.ISHANGO_BE
        );

        return response.data;
    } catch (error: any) {
        console.log(error);
        throw new Error(error.message || 'An error occurred while calculating income tax');
    }
}

function* handleFetchCalculators(action: PayloadAction<{ year: string }>) {
    try {
        const { year } = action.payload;

        const response: GetCalCountriesResponse[] = yield call(getCalculators, "income_tax", year);
        yield put(fetchCalculatorsSuccess(response));
    } catch (error: any) {
        yield put(fetchCalculatorsFailure(error.message));
    }
}

function* handleCalcuateCorporateTax(action: PayloadAction<{ inputs: { [key: string]: any } }>) {
    try {
        const { inputs } = action.payload;
        const response: CorporateTaxResult = yield call(postCorporateTaxCalculation, inputs);
        yield put(calculateCorporateTaxSuccess(response));
    } catch (error: any) {
        yield put(calculateCorporateTaxFailure(error.message));
    }
}

function* corporateTaxSaga() {
    yield takeLatest(fetchCalculatorsStart.type, handleFetchCalculators);
    yield takeLatest(calculateCorporateTax.type, handleCalcuateCorporateTax); 
}

export default corporateTaxSaga;

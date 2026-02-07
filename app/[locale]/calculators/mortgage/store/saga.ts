import { takeLatest, put, call } from "redux-saga/effects";
import { PayloadAction } from '@reduxjs/toolkit';
import { endpoints } from "../../../../../services/endpoints";
import { getRequest, postRequest } from "../../../../../services/requests";
import { EbaseUrls } from "../../../../../services/requests/types";

import {
    fetchCalculatorsStart,
    fetchCalculatorsSuccess,
    fetchCalculatorsFailure,
    calculateMortgageFailure,
    calculateMortgageSuccess,
    calculateMortgage
} from "./slice";
import { MortgageResult } from "./state";
import { AxiosResponse } from "axios";
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

const postMortgageCalculation = async (inputs: { [key: string]: any }): Promise<any> => {
    try {
        const path = endpoints.calculateMortgage();

        const response: AxiosResponse<MortgageResult> = await postRequest({
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

        const response: GetCalCountriesResponse[] = yield call(getCalculators, "mortgage", year);
        yield put(fetchCalculatorsSuccess(response));
    } catch (error: any) {
        yield put(fetchCalculatorsFailure(error.message));
    }
}

function* handleCalculateMortgage(action: PayloadAction<{ [key: string]: any }>) {
    try {
        const inputs = action.payload;
        const response: MortgageResult = yield call(postMortgageCalculation, inputs);
        yield put(calculateMortgageSuccess(response));
    } catch (error: any) {
        yield put(calculateMortgageFailure(error.message));
    }
}

function* mortgageCalculatorSaga() {
    yield takeLatest(fetchCalculatorsStart.type, handleFetchCalculators);
    yield takeLatest(calculateMortgage.type, handleCalculateMortgage); 
}

export default mortgageCalculatorSaga;

import { call, put, takeLatest } from "redux-saga/effects";
import { PayloadAction } from '@reduxjs/toolkit';
import { getRequest, postRequest } from "../../../../../services/requests";
import { endpoints } from "../../../../../services/endpoints";
import { EbaseUrls } from "../../../../../services/requests/types";

import {
    fetchCalculatorsStart,
    fetchCalculatorsSuccess,
    fetchCalculatorsFailure,
    calculateInheritanceTax,
    calculateInheritanceTaxSuccess,
    calculateInheritanceTaxFailure
} from "./slice";
import { InheritanceResult } from "./state";
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
        throw new Error(error.message);
    }
};

const calculateInheritanceTaxApi = async (inputs: { [key: string]: any }): Promise<InheritanceResult> => {
    try {
        const path = endpoints.calculateInheritanceTax();

        const response: AxiosResponse<InheritanceResult> = await postRequest({
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
        const response: GetCalCountriesResponse[] = yield call(getCalculators, "inheritance_tax", year);
        yield put(fetchCalculatorsSuccess(response));
    } catch (error: any) {
        yield put(fetchCalculatorsFailure(error.message));
    }
}

function* handleCalculateInheritanceTax(action: PayloadAction<{ [key: string]: any }>) {
    try {
        const response: InheritanceResult = yield call(calculateInheritanceTaxApi, action.payload);
        yield put(calculateInheritanceTaxSuccess(response));
    } catch (error: any) {
        yield put(calculateInheritanceTaxFailure(error.message));
    }
}

function* inheritanceTaxSaga() {
    yield takeLatest(fetchCalculatorsStart.type, handleFetchCalculators);
    yield takeLatest(calculateInheritanceTax.type, handleCalculateInheritanceTax);
}

export default inheritanceTaxSaga;
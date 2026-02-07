import { takeLatest, put, call } from "redux-saga/effects";
import { PayloadAction } from '@reduxjs/toolkit';
import { endpoints } from "../../../../services/endpoints";
import { getRequest, postRequest } from "../../../../services/requests";
import { EbaseUrls } from "../../../../services/requests/types";

import {
    fetchPlansStart,
    fetchPlansSuccess,
    fetchPlansFailure,
    fetchCalculatorTypesStart,
    fetchCalculatorTypesSuccess,
    fetchCalculatorTypesFailure,
    submitSubscriptionStart,
    submitSubscriptionSuccess,
    submitSubscriptionFailure
} from "./slice";
import { CalculatorTypeItem, CreateSubscriptionRequest, PlanItem } from "../store/state";
import { AxiosResponse } from "axios";


const getPlans = async (currencyCode: string): Promise<PlanItem[]> => {
    try {
        const path = endpoints.listPlans(currencyCode);

        const response: AxiosResponse<PlanItem[]> = await getRequest({
            path: path.endpoint,
            auth: path.auth,
            headers: path.headers,
        }, EbaseUrls.ISHANGO_BE);

        return response.data;
    } catch (error) {
        throw error;
    }
};

const getCalculatorTypes = async (): Promise<CalculatorTypeItem[]> => {
    try {
        const path = endpoints.listCalculatorTypes();

        const response: AxiosResponse<CalculatorTypeItem[]> = await getRequest({
            path: path.endpoint,
            auth: path.auth,
            headers: path.headers,
        }, EbaseUrls.ISHANGO_BE);

        return response.data;
    } catch (error) {
        throw error;
    }
};

const postCreateSubscription = async (data: CreateSubscriptionRequest): Promise<void> => {
    try {
        const path = endpoints.createSubscription();

        await postRequest({
            path: path.endpoint,
            auth: path.auth,
            headers: path.headers,
            data: data,
        }, EbaseUrls.ISHANGO_BE);
    } catch (error) {
        throw error;
    }
};

function* handleFetchPlans(action: PayloadAction<string>) {
    try {
        const response: PlanItem[] = yield call(getPlans, action.payload);
        yield put(fetchPlansSuccess(response));
    } catch (error: any) {
        yield put(fetchPlansFailure(error.message));
    }
}

function* handleFetchCalculatorTypes() {
    try {
        const response: CalculatorTypeItem[] = yield call(getCalculatorTypes);
        yield put(fetchCalculatorTypesSuccess(response));
    } catch (error: any) {
        yield put(fetchCalculatorTypesFailure(error.message));
    }
}

function* handleSubmitSubscription(action: PayloadAction<CreateSubscriptionRequest>) {
    try {
        console.log("Saga: handleSubmitSubscription started", action.payload);
        yield call(postCreateSubscription, action.payload);
        console.log("Saga: subscription created successfully");
        yield put(submitSubscriptionSuccess());
    } catch (error: any) {
        console.error("Saga: subscription creation failed", error);
        yield put(submitSubscriptionFailure(error.message));
    }
}

function* getStartedSaga() {
    yield takeLatest(fetchPlansStart.type, handleFetchPlans);
    yield takeLatest(fetchCalculatorTypesStart.type, handleFetchCalculatorTypes);
    yield takeLatest(submitSubscriptionStart.type, handleSubmitSubscription);
}

export default getStartedSaga;

import { takeLatest, put, call } from "redux-saga/effects";
import { PayloadAction } from '@reduxjs/toolkit';
import { endpoints } from "@/services/endpoints";
import { getRequest, postRequest, patchRequest, putRequest } from "@/services/requests";
import { EbaseUrls } from "@/services/requests/types";

import { UserDetails, ApiKeyItem, Calculator } from "./state";
import {
    fetchUserDetails,
    fetchUserDetailsSuccess,
    fetchUserDetailsFailure,
    createApiKeyRequest,
    createApiKeySuccess,
    createApiKeyFailure,
    revokeApiKeyRequest,
    revokeApiKeySuccess,
    revokeApiKeyFailure,
    fetchCalculators,
    fetchCalculatorsSuccess,
    fetchCalculatorsFailure,
} from "./slice";

const getUserDetails = async (email: string): Promise<UserDetails> => {
    try {
        const path = endpoints.getUserDetails();

        const response = await postRequest<UserDetails>(
            {
                path: path.endpoint,
                headers: path.headers,
                auth: path.auth,
                data: { email }
            },
            EbaseUrls.ISHANGO_BE
        );
        return response.data;
    } catch (error) {
        throw error;
    }
};

const getCalculators = async (): Promise<Calculator[]> => {
    try {
        const path = endpoints.getCalculators();

        const response = await getRequest<Calculator[]>(
             {
                path: path.endpoint,
                headers: path.headers,
                auth: path.auth,
            },
            EbaseUrls.ISHANGO_BE
        );
        return response.data;
    } catch (error) {
        throw error;
    }
};

function* collectUserDetails(action: PayloadAction<{ email: string }>) {
    try {
        const userDetails: UserDetails = yield call(getUserDetails, action.payload.email);
        yield put(fetchUserDetailsSuccess(userDetails));
    } catch (error) {
        yield put(fetchUserDetailsFailure(error instanceof Error ? error.message : String(error)));
    }
}

function* userDetailsSaga() {
    yield takeLatest(fetchUserDetails.type, collectUserDetails);
}

const createApiKey = async (name: string, subscriptionId: string): Promise<ApiKeyItem> => {
    const path = endpoints.createApiKey(subscriptionId);
    const response = await postRequest<ApiKeyItem>(
        { 
            path: path.endpoint,
            headers: path.headers,
            auth: path.auth,
            data: { name } 
        },
        EbaseUrls.ISHANGO_BE
    );
    return response.data;
};

function* handleCreateApiKey(action: PayloadAction<{ name: string; subscriptionId: string }>) {
    try {
        const result: ApiKeyItem = yield call(
            createApiKey,
            action.payload.name,
            action.payload.subscriptionId
        );
        yield put(createApiKeySuccess(result));
    } catch (error) {
        yield put(createApiKeyFailure(error instanceof Error ? error.message : String(error)));
    }
}

const revokeApiKey = async (subscriptionId: string, apiKeyId: string): Promise<void> => {
    const path = endpoints.revokeApiKey(subscriptionId, apiKeyId);
    await patchRequest(
        {
            path: path.endpoint,
            headers: path.headers,
            auth: path.auth,
            data: {}
        },
        EbaseUrls.ISHANGO_BE
    );
};

function* handleRevokeApiKey(action: PayloadAction<{ subscriptionId: string; apiKeyId: string }>) {
    try {
        yield call(revokeApiKey, action.payload.subscriptionId, action.payload.apiKeyId);
        yield put(revokeApiKeySuccess(action.payload));
    } catch (error) {
        yield put(revokeApiKeyFailure(error instanceof Error ? error.message : String(error)));
    }
}

function* handleFetchCalculators() {
    try {
        const calculators: Calculator[] = yield call(getCalculators);
        yield put(fetchCalculatorsSuccess(calculators));
    } catch (error) {
        yield put(fetchCalculatorsFailure(error instanceof Error ? error.message : String(error)));
    }
}

function* dashboardSaga() {
    yield takeLatest(fetchUserDetails.type, collectUserDetails);
    yield takeLatest(createApiKeyRequest.type, handleCreateApiKey);
    yield takeLatest(revokeApiKeyRequest.type, handleRevokeApiKey);
    yield takeLatest(fetchCalculators.type, handleFetchCalculators);
}

export default dashboardSaga;
import { AxiosResponse } from "axios";
import { takeLatest, put, call } from "redux-saga/effects";
import { PayloadAction } from '@reduxjs/toolkit';
import { endpoints } from "@/services/endpoints";
import { getRequest } from "@/services/requests";

import { EbaseUrls } from "@/services/requests/types";
import { FeatureFlags } from "./state";
import {
    fetchFeatureFlagsStart,
    fetchFeatureFlagsSuccess,
    fetchFeatureFlagsFailure,
} from "./slice";

const getFeatureFlags = async (): Promise<FeatureFlags> => {
    try {
        const path = endpoints.featureFlags();

        const response: AxiosResponse<FeatureFlags> = await getRequest({
                path: path.endpoint,
                auth: path.auth,
                headers: path.headers,
            },
            EbaseUrls.ISHANGO_BE
        );
        return response.data;
    } catch (error) {
        throw error;
    }
};

function* fetchFeatureFlags() {
    try {
        console.log("Fetching feature flags...");
        const featureFlags: FeatureFlags = yield call(getFeatureFlags);
        yield put(fetchFeatureFlagsSuccess(featureFlags));
    } catch (error) {
        yield put(fetchFeatureFlagsFailure(error));
    }
}

export function* featureFlagsSaga() {
    yield takeLatest(fetchFeatureFlagsStart.type, fetchFeatureFlags);
}

export default featureFlagsSaga;
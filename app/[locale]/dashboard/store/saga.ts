import { takeLatest, put, call } from "redux-saga/effects";
import { PayloadAction } from '@reduxjs/toolkit';
import { endpoints } from "@/services/endpoints";
import { postRequest } from "@/services/requests";
import { EbaseUrls } from "@/services/requests/types";

import { UserDetails } from "./state";
import {
    fetchUserDetails,
    fetchUserDetailsSuccess,
    fetchUserDetailsFailure,
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

export default userDetailsSaga;
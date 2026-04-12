import { createSlice } from "@reduxjs/toolkit";
import { FeatureFlagsState } from "./state";

const initialState: FeatureFlagsState = {
    featureFlags: {
        data: null,
        loading: false,
        error: null,
    }
};

const featureFlagsSlice = createSlice({
    name: "featureFlags",
    initialState,
    reducers: {
        fetchFeatureFlagsStart(state) {
            state.featureFlags.loading = true;
            state.featureFlags.error = null;
        },
        fetchFeatureFlagsSuccess(state, action) {
            state.featureFlags.data = action.payload;
            state.featureFlags.loading = false;
        },
        fetchFeatureFlagsFailure(state, action) {
            state.featureFlags.error = action.payload;
            state.featureFlags.loading = false;
        },
    },
});

export const {
    fetchFeatureFlagsStart,
    fetchFeatureFlagsSuccess,
    fetchFeatureFlagsFailure,
} = featureFlagsSlice.actions;

export default featureFlagsSlice.reducer;

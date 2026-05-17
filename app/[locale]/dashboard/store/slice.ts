import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserDetails, ApiKeyItem, DashboardState, Calculator } from "./state";

const initialState: DashboardState = {
    userDetails: {
        data: null,
        loading: false,
        error: null,
    },
    createApiKey: {
        loading: false,
        error: null,
        newKey: null,
    },
    revokeApiKey: {
        loading: false,
        error: null,
    },
    calculators: {
        data: null,
        loading: false,
        error: null,
    },
};

const dashboardSlice = createSlice({
    name: 'dashboard',
    initialState,
    reducers: {
        fetchUserDetails(state, action: PayloadAction<{ email: string }>) {
            state.userDetails.loading = true;
            state.userDetails.error = null;
        },
        fetchUserDetailsSuccess(state, action: PayloadAction<UserDetails>) {
            state.userDetails.data = action.payload;
            state.userDetails.loading = false;
        },
        fetchUserDetailsFailure(state, action: PayloadAction<string>) {
            state.userDetails.error = action.payload;
            state.userDetails.loading = false;
        },
        logout(state) {
            state.userDetails = {
                data: null,
                loading: false,
                error: null,
            };
        },
        createApiKeyRequest(state, action: PayloadAction<{ name: string; subscriptionId: string }>) {
            state.createApiKey.loading = true;
            state.createApiKey.error = null;
            state.createApiKey.newKey = null;
        },
        createApiKeySuccess(state, action: PayloadAction<ApiKeyItem>) {
            state.createApiKey.loading = false;
            state.createApiKey.newKey = action.payload.apiKey;
            if (state.userDetails.data) {
                state.userDetails.data.apiKeys = [action.payload, ...state.userDetails.data.apiKeys];
            }
        },
        createApiKeyFailure(state, action: PayloadAction<string>) {
            state.createApiKey.loading = false;
            state.createApiKey.error = action.payload;
        },
        clearNewKey(state) {
            state.createApiKey.newKey = null;
        },
        revokeApiKeyRequest(state, action: PayloadAction<{ subscriptionId: string; apiKeyId: string }>) {
            state.revokeApiKey.loading = true;
            state.revokeApiKey.error = null;
        },
        revokeApiKeySuccess(state, action: PayloadAction<{ subscriptionId: string; apiKeyId: string }>) {
            state.revokeApiKey.loading = false;
            if (state.userDetails.data) {
                state.userDetails.data.apiKeys = state.userDetails.data.apiKeys.map((key) =>
                    key.id === action.payload.apiKeyId
                        ? { ...key, isActive: false, disabledAt: new Date().toISOString() }
                        : key
                );
            }
        },
        revokeApiKeyFailure(state, action: PayloadAction<string>) {
            state.revokeApiKey.loading = false;
            state.revokeApiKey.error = action.payload;
        },
        fetchCalculators(state) {
            state.calculators.loading = true;
            state.calculators.error = null;
        },
        fetchCalculatorsSuccess(state, action: PayloadAction<Calculator[]>) {
            state.calculators.data = action.payload;
            state.calculators.loading = false;
        },
        fetchCalculatorsFailure(state, action: PayloadAction<string>) {
            state.calculators.error = action.payload;
            state.calculators.loading = false;
        },
    },
});

export const {
    fetchUserDetails,
    fetchUserDetailsSuccess,
    fetchUserDetailsFailure,
    logout,
    createApiKeyRequest,
    createApiKeySuccess,
    createApiKeyFailure,
    clearNewKey,
    revokeApiKeyRequest,
    revokeApiKeySuccess,
    revokeApiKeyFailure,
    fetchCalculators,
    fetchCalculatorsSuccess,
    fetchCalculatorsFailure,
} = dashboardSlice.actions;

export default dashboardSlice.reducer;


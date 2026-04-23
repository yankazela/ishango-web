import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserDetails, DashboardState } from "./state";

const initialState: DashboardState = {
    userDetails: {
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
    },
});

export const { fetchUserDetails, fetchUserDetailsSuccess, fetchUserDetailsFailure, logout } = dashboardSlice.actions;

export default dashboardSlice.reducer;


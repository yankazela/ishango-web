import { CalculatorState, CapitalGainsResult } from "./state";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: CalculatorState = {
    form: {
        countryCalculators: [],
        loading: false,
        error: null
    },
    results: {
        data: null,
        loading: false,
        error: null
    }
};

export const capitalGainsTaxCalculatorSlice = createSlice({
    name: "capitalGainsTaxCalculator",
    initialState,
    reducers: {
        fetchCalculatorsStart(state, action: PayloadAction<{ year: string }>) {
            state.form.loading = true;
            state.form.error = null;
        },
        fetchCalculatorsSuccess(state, action) {
            state.form.countryCalculators = action.payload;
            state.form.loading = false;
        },
        fetchCalculatorsFailure(state, action) {
            state.form.loading = false;
            state.form.error = action.payload;
        },
        calculateCapitalGainsTax(state, action: PayloadAction<{ [key: string]: any } >) {
            state.results.loading = true;
            state.results.error = null;
        },
        calculateCapitalGainsTaxSuccess(state, action: PayloadAction<CapitalGainsResult>) {
            state.results.loading = false;
            state.results.data = action.payload;
        },
        calculateCapitalGainsTaxFailure(state, action) {
            state.results.loading = false;
            state.results.error = action.payload;
        },
        resetResult(state) {
            state.results = initialState.results;
        }
    },
});

export const {
    fetchCalculatorsStart,
    fetchCalculatorsSuccess,
    fetchCalculatorsFailure,
    calculateCapitalGainsTax,
    calculateCapitalGainsTaxSuccess,
    calculateCapitalGainsTaxFailure,
    resetResult
} = capitalGainsTaxCalculatorSlice.actions;

export default capitalGainsTaxCalculatorSlice.reducer;
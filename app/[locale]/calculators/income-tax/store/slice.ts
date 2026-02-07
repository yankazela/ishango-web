import { CalculatorState, IncomeTaxResult } from "./state";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: CalculatorState = {
    form: {
        countryCalculators: [],
        loading: false,
        error: null
    },
    result: {
        data: null,
        loading: false,
        error: null
    }
};

export const incomeTaxCalculatorSlice = createSlice({
    name: "incomeTaxCalculator",
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
        calculateIncomeTax(state, action: PayloadAction<{ inputs: { [key: string]: any } }>) {
            state.result.loading = true;
            state.result.error = null;
        },
        calculateIncomeTaxSuccess(state, action: PayloadAction<IncomeTaxResult>) {
            state.result.loading = false;
            state.result.data = action.payload;
        },
        calculateIncomeTaxFailure(state, action) {
            state.result.loading = false;
            state.result.error = action.payload;
        },
        resetResult(state) {
            state.result = initialState.result;
        }
    },
});

export const {
    fetchCalculatorsStart,
    fetchCalculatorsSuccess,
    fetchCalculatorsFailure,
    calculateIncomeTax,
    calculateIncomeTaxSuccess,
    calculateIncomeTaxFailure,
    resetResult
} = incomeTaxCalculatorSlice.actions;

export default incomeTaxCalculatorSlice.reducer;
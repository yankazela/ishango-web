import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
    CountryWithCalculatorsItem,
    ExpertListItem,
    ExpertsState,
    CreateExpertRequest,
    ExpertTypes
} from "./state";
import { CalculatorType } from "../../calculators/types";

const initialState: ExpertsState = {
    experts: {
        data: null,
        loading: false,
        error: null
    },
    countries: {
        data: [],
        loading: false,
        error: null
    },
    isSubmitting: false,
    submissionError: null,
    hasSubmitted: false,
};

export const expertsSlice = createSlice({
    name: "experts",
    initialState,
    reducers: {
        fetchExpertsStart(state, action: PayloadAction<{ countryCode: string }>) {
            state.experts.loading = true;
            state.experts.error = null;
        },
        fetchExpertsSuccess(state, action: PayloadAction<ExpertListItem[]>) {
            state.experts.data = action.payload;
            state.experts.loading = false;
        },
        fetchExpertsFailure(state, action: PayloadAction<string>) {
            state.experts.loading = false;
            state.experts.error = action.payload;
        },
        fetchCountriesStart(state) {
            state.countries.loading = true;
            state.countries.error = null;
        },
        fetchCountriesSuccess(state, action: PayloadAction<CountryWithCalculatorsItem[]>) {
            state.countries.data = action.payload;
            state.countries.loading = false;
        },
        fetchCountriesFailure(state, action: PayloadAction<string>) {
            state.countries.loading = false;
            state.countries.error = action.payload;
        },
        createExpertStart(state, action: PayloadAction<CreateExpertRequest>) {
            state.isSubmitting = true;
            state.submissionError = null;
            state.hasSubmitted = false;
        },
        createExpertSuccess(state) {
            state.isSubmitting = false;
            state.hasSubmitted = true;
        },
        createExpertFailure(state, action: PayloadAction<string>) {
            state.isSubmitting = false;
            state.submissionError = action.payload;
        },
    },
});

export const {
    fetchExpertsStart,
    fetchExpertsSuccess,
    fetchExpertsFailure,
    fetchCountriesStart,
    fetchCountriesSuccess,
    fetchCountriesFailure,
    createExpertFailure,
    createExpertStart,
    createExpertSuccess
} = expertsSlice.actions;

export default expertsSlice.reducer;
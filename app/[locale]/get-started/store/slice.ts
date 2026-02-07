import { CalculatorTypeItem, CreateSubscriptionRequest, GetStartedState, PlanItem } from '../store/state';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: GetStartedState = {
    plans: {
        items: [],
        loading: false,
        error: null,
    },
    calculatorTypes: {
        items: [],
        loading: false,
        error: null,
    },
    subscriptionCreation: {
        created: false,
        loading: false,
        error: null,
    },
};

export const getStartedSlice = createSlice({
    name: 'getStarted',
    initialState,
    reducers: {
        fetchPlansStart(state, action: PayloadAction<string>) {
            state.plans.loading = true;
            state.plans.error = null;
        },
        fetchPlansSuccess(state, action: PayloadAction<PlanItem[]>) {
            state.plans.items = action.payload;
            state.plans.loading = false;
        },
        fetchPlansFailure(state, action: PayloadAction<string>) {
            state.plans.loading = false;
            state.plans.error = action.payload;
        },
        fetchCalculatorTypesStart(state) {
            state.calculatorTypes.loading = true;
            state.calculatorTypes.error = null;
        },
        fetchCalculatorTypesSuccess(state, action: PayloadAction<CalculatorTypeItem[]>) {
            state.calculatorTypes.items = action.payload;
            state.calculatorTypes.loading = false;
        },
        fetchCalculatorTypesFailure(state, action: PayloadAction<string>) {
            state.calculatorTypes.loading = false;
            state.calculatorTypes.error = action.payload;
        },
        submitSubscriptionStart(state, action: PayloadAction<CreateSubscriptionRequest>) {
            state.subscriptionCreation.loading = true;
        },
        submitSubscriptionSuccess(state) {
            state.subscriptionCreation.created = true;
            state.subscriptionCreation.loading = false;
        },
        submitSubscriptionFailure(state, action: PayloadAction<string>) {
            state.subscriptionCreation.loading = false;
            state.subscriptionCreation.error = action.payload;
        },
    },
});

export const {
    fetchPlansStart,
    fetchPlansSuccess,
    fetchPlansFailure,
    fetchCalculatorTypesStart,
    fetchCalculatorTypesSuccess,
    fetchCalculatorTypesFailure,
    submitSubscriptionStart,
    submitSubscriptionSuccess,
    submitSubscriptionFailure,
} = getStartedSlice.actions;

export default getStartedSlice.reducer;
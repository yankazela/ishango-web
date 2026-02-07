import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './rootSaga';
import incomeTaxCalculatorReducer from '../app/[locale]/calculators/income-tax/store/slice';
import mortgageCalculatorReducer from '../app/[locale]/calculators/mortgage/store/slice';
import getStartedReducer from '../app/[locale]/get-started/store/slice';
import corporateTaxCalculatorReducer from '../app/[locale]/calculators/corporate-tax/store/slice';


const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
    reducer: {
        incomeTaxCalculator: incomeTaxCalculatorReducer,
        mortgageCalculator: mortgageCalculatorReducer,
        getStarted: getStartedReducer,
        corporateTaxCalculator: corporateTaxCalculatorReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware),
    devTools: process.env.NODE_ENV === 'development',
});

sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;

export default store;
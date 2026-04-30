import { all } from 'redux-saga/effects';
import incomeTaxSaga from '../app/[locale]/calculators/income-tax/store/saga';
import mortgageSaga from '../app/[locale]/calculators/mortgage/store/saga';
import getStartedSaga from '../app/[locale]/get-started/store/saga';
import corporateTaxSaga from '../app/[locale]/calculators/corporate-tax/store/saga';
import expertsSaga from '../app/[locale]/experts/store/saga';
import capitalGainsSaga from '../app/[locale]/calculators/capital-gains-tax/store/saga';
import inheritanceTaxSaga from '../app/[locale]/calculators/inheritance-tax/store/saga';
import featureFlagsSaga from '../app/[locale]/store/saga';
import blogSaga from '@/app/[locale]/resources/store/saga';
import dashboardSaga from '@/app/[locale]/dashboard/store/saga';
import countriesSaga from '@/app/[locale]/countries/store/saga';

// Root saga
function* rootSaga() {
    yield all([
		incomeTaxSaga(),
		mortgageSaga(),
		getStartedSaga(),
		corporateTaxSaga(),
		expertsSaga(),
		capitalGainsSaga(),
		inheritanceTaxSaga(),
		featureFlagsSaga(),
		blogSaga(),
		dashboardSaga(),
		countriesSaga(),
		// add other sagas here
    ]);
}

export default rootSaga;
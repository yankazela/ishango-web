import { all } from 'redux-saga/effects';
import incomeTaxSaga from '../app/[locale]/calculators/income-tax/store/saga';
import mortgageSaga from '../app/[locale]/calculators/mortgage/store/saga';
import getStartedSaga from '../app/[locale]/get-started/store/saga';
import corporateTaxSaga from '../app/[locale]/calculators/corporate-tax/store/saga';
import expertsSaga from '../app/[locale]/experts/store/saga';

// Root saga
function* rootSaga() {
    yield all([
		incomeTaxSaga(),
		mortgageSaga(),
		getStartedSaga(),
		corporateTaxSaga(),
		expertsSaga()
		// add other sagas here
    ]);
}

export default rootSaga;
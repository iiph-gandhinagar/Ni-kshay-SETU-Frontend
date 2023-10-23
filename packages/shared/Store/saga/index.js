import { all } from 'redux-saga/effects';
import { assessmentSaga } from './assessmentSaga';
import { userSaga } from './usersSaga';
import { watchAuthSagas } from './auth.saga';
import { materialSaga } from './materialsSaga';
import { algorithmSaga } from './algorithmSaga';
import { cgcSaga } from './cgcSaga';
import { screeningSaga } from './screeningSaga';
import { healthFacilitySaga } from './healthFacilitySaga';
import { chatSaga } from './chatSaga';
import { appSaga } from './appSaga';
import { watchleaderBoardSaga } from './LederboardSaga';
import { watchSurveySaga } from './SurveySaga';
import { mastersearchSaga } from './masterSearchSaga';
export default function* rootSaga() {
  yield all([
    userSaga(),
    watchAuthSagas(),
    assessmentSaga(),
    materialSaga(),
    algorithmSaga(),
    cgcSaga(),
    screeningSaga(),
    healthFacilitySaga(),
    chatSaga(),
    appSaga(),
    watchleaderBoardSaga(),
    watchSurveySaga(),
    mastersearchSaga()
  ]);
} 

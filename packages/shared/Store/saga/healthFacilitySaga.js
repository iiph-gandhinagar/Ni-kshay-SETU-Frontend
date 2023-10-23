import { call, put, takeEvery } from "redux-saga/effects";
import { getFilterDetailsApi } from "../../utils/Api";
import { processErrorAndRespond } from "../../utils/functions";
import { getFilterDetailsSuccess } from "../action/healthFacilityAction";
import { GET_FILTER_DETAILS } from "../types";

function* getFilterDetailsSaga(action) {
    // console.log(" getFilterDetails Saga", action);

    // yield put(showAppLoader());
    try {
        const response = yield call(getFilterDetailsApi, action.obj);
        if (response.data.success) {
            yield put(getFilterDetailsSuccess(response.data?.data));
        }

        // action.callBack(response);
    } catch (error) {
        console.log(error?.response);
        console.log("API Error:- ", processErrorAndRespond(error));
        // yield put(authFailed(error.response.data));

    }
    // yield put(hideAppLoader());
}
export function* healthFacilitySaga() {
    [
        yield takeEvery(GET_FILTER_DETAILS, getFilterDetailsSaga),
    ];
}
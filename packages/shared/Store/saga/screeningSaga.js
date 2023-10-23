import { call, put, takeEvery, select } from "redux-saga/effects";
import {
    getAllSymptomsApi, storeUserScreeningApi
} from "../../utils/Api";
import { processErrorAndRespond } from "../../utils/functions";
import {
    getAllSymptomsSuccess, storeUserScreeningSuccess
} from "../action/screeningAction";
import {
    GET_ALL_SYMPTOMS, STORE_USER_SCREENING
} from "../types";

function* getAllSymptomsSaga() {
    // yield put(showAppLoader());
    // console.log("getAllSymptomsSaga ");
    try {
        const response = yield call(getAllSymptomsApi);
        // console.log("getAllSymptomsSaga response", response);
        if (response.data.status) {
            yield put(getAllSymptomsSuccess(response.data.data));
        }
        // action.callBack(response);
    } catch (error) {
        console.log(error?.response);
        console.log("API Error:- ", processErrorAndRespond(error));
        // yield put(authFailed(error.response.data));

    }
    // yield put(hideAppLoader());
}
function* storeUserScreeningSaga(action) {
    console.log("storeUserScreeningSaga ==>", action.payload);
    try {
        const response = yield call(storeUserScreeningApi, action.payload);
        console.log("storeUserScreeningSaga response", response);
        if (response.status) {
            yield put(storeUserScreeningSuccess());
            action?.callBack(response);
        }

    } catch (error) {
        console.log(error?.response);
        console.log("API Error:- ", processErrorAndRespond(error));
        // yield put(authFailed(error.response.data));

    }
    // yield put(hideAppLoader());
}
export function* screeningSaga() {
    [
        yield takeEvery(GET_ALL_SYMPTOMS, getAllSymptomsSaga),
        yield takeEvery(STORE_USER_SCREENING, storeUserScreeningSaga),
    ];
}
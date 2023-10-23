import { call, put, takeEvery } from "redux-saga/effects";
import { getAllChaptersApi, getAllChaptersByIdApi } from "../../utils/Api";
import { getAllChaptersSuccess, getAllChaptersByIdSuccess } from "../action/cgcAction";
import { GET_ALL_CHAPTERS, GET_ALL_CHAPTERS_BY_ID } from "../types";
import { processErrorAndRespond } from "../../utils/functions";

function* getAllChaptersSaga() {
    // yield put(showAppLoader());
    try {
        const response = yield call(getAllChaptersApi);
        
        if (response.data.status) {
            // console.log("response", response.data.data);
            yield put(getAllChaptersSuccess(response.data.data));
        }
        // action.callBack(response);
    } catch (error) {
        console.log(error?.response);
        console.log("API Error:- ", processErrorAndRespond(error));
        // yield put(authFailed(error.response.data));

    }
    // yield put(hideAppLoader());
}

function* getAllChaptersByIdSaga(action) {
    // yield put(showAppLoader());
    try {
        const response = yield call(getAllChaptersByIdApi, action.id);
        
        if (response.data.status) {
            // console.log("response", response.data.data);
            yield put(getAllChaptersByIdSuccess(response.data.data));
        }
        // action.callBack(response);
    } catch (error) {
        console.log(error?.response);
        console.log("API Error:- ", processErrorAndRespond(error));
        // yield put(authFailed(error.response.data));

    }
    // yield put(hideAppLoader());
}
export function* cgcSaga() {
    [
        yield takeEvery(GET_ALL_CHAPTERS, getAllChaptersSaga),
        yield takeEvery(GET_ALL_CHAPTERS_BY_ID, getAllChaptersByIdSaga),
    ];
}
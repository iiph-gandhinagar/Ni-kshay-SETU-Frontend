import {
    getMaterialsApi, getRootFoldersApi
} from "../../utils/Api";
import {
    getMaterialsSuccess, getRootFoldersSuccess
} from "../action/materialsAction";
import {
    GET_MATERIALS, GET_ROOT_FOLDERS
} from "../types";
import { call, put, takeEvery, select } from "redux-saga/effects";
import { processErrorAndRespond } from "../../utils/functions";

function* getMaterialsSaga(action) {
    // yield put(showAppLoader());
    try {
        const response = yield call(getMaterialsApi, action.payload);

        if (response.data.status) {
            // console.log("response", response.data.data);
            yield put(getMaterialsSuccess(response.data.data));
        }
        // action.callBack(response);
    } catch (error) {
        console.log(error?.response);
        console.log("API Error:- ", processErrorAndRespond(error));
        // yield put(authFailed(error.response.data));

    }
    // yield put(hideAppLoader());
}
function* getRootFoldersSaga() {
    try {
        const response = yield call(getRootFoldersApi);
        if (response.data.status) {
            yield put(getRootFoldersSuccess(response.data.data));
        }
    } catch (error) {
        console.log(error?.response);
        console.log("API Error:- ", processErrorAndRespond(error));
    }
}
export function* materialSaga() {
    [
        yield takeEvery(GET_MATERIALS, getMaterialsSaga),
        yield takeEvery(GET_ROOT_FOLDERS, getRootFoldersSaga),
    ];
}
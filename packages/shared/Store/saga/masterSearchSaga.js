import { call, put, takeEvery, takeLatest } from "redux-saga/effects";
import { getFAQMasterSearchApi, getMasterSearchApi, getModuleMasterSearchApi, getRMMasterSearchApi, getSubModuleMasterSearchApi } from "../../utils/Api";
import { getFaqMasterSearchSuccess, getMasterSearchSuccess, getModuleMasterSearchSuccess, getRMMasterSearchSuccess, getSubModuleMasterSearchSuccess, masterSearchErr } from "../action/masterSearchAction";
import { GET_MASTER_SEARCH, GET_MODULE_MASTER_SEARCH, GET_SUB_MODULE_MASTER_SEARCH, GET_RM_MASTER_SEARCH, GET_FAQ_MASTER_SEARCH } from "../types";

function* getMasterSearchSaga(action) {
    try {
        const response = yield call(getMasterSearchApi, action.payload);
        if (response.data.status) {
            yield put(getMasterSearchSuccess(response.data.data));
        }
    } catch (error) {
        console.log("getMasterSearchSaga Error :- ", error?.response);
        yield put(masterSearchErr());
    }
}
function* getModuleMasterSearchSaga(action) {
    try {
        const response = yield call(getModuleMasterSearchApi, action.payload);
        if (response.data.status) {
            yield put(getModuleMasterSearchSuccess(response.data.data?.modules));
        }
    } catch (error) {
        console.log("getModuleMasterSearchSaga Error :- ", error?.response);
        yield put(masterSearchErr());
    }
}
function* getSubModuleMasterSearchSaga(action) {
    try {
        const response = yield call(getSubModuleMasterSearchApi, action.payload);
        if (response.data.status) {
            yield put(getSubModuleMasterSearchSuccess(response.data.data?.sub_modules));
        }
    } catch (error) {
        console.log("getSubModuleMasterSearchSaga Error :- ", error?.response);
        yield put(masterSearchErr());
    }
}
function* getRMMasterSearchSaga(action) {
    try {
        const response = yield call(getRMMasterSearchApi, action.payload);
        if (response.data.status) {
            yield put(getRMMasterSearchSuccess(response.data.data?.resource_material));
        }
    } catch (error) {
        console.log("getRMMasterSearchSaga Error :- ", error?.response);
        yield put(masterSearchErr());
    }
}
function* getFaqMasterSearchSaga(action) {
    try {
        const response = yield call(getFAQMasterSearchApi, action.payload);
        if (response.data.status) {
            yield put(getFaqMasterSearchSuccess(response.data.data?.chat_question));
        }
    } catch (error) {
        console.log("getFaqMasterSearchSaga Error :- ", error?.response);
        yield put(masterSearchErr());
    }
}
export function* mastersearchSaga() {
    [yield takeLatest(GET_MASTER_SEARCH, getMasterSearchSaga),
    yield takeLatest(GET_MODULE_MASTER_SEARCH, getModuleMasterSearchSaga),
    yield takeLatest(GET_SUB_MODULE_MASTER_SEARCH, getSubModuleMasterSearchSaga),
    yield takeLatest(GET_RM_MASTER_SEARCH, getRMMasterSearchSaga),
    yield takeLatest(GET_FAQ_MASTER_SEARCH, getFaqMasterSearchSaga),
    ];
}
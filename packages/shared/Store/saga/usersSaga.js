import { call, put, takeEvery, select } from "redux-saga/effects";
import { getAllStateApi, getDistrictByStateApi, getBlockByDistrictApi, getAllCadreApi, getHealthByBlockApi, getAllCadreTypeApi, getUserDataApi, apiupdateUserDataRequest } from "../../utils/Api";
import { processErrorAndRespond } from "../../utils/functions";
import { getAllStateSuccess, getDistrictByStateSuccess, getBlockByDistrictSuccess, getAllCadreSuccess, getHealthByBlockSuccess, getAllCadreTypeSuccess, getUserDataSuccess, updateUserDataSuccess } from "../action/usersActions";
import { GET_ALL_STATE, GET_DISTRICT_BY_STATE, GET_BLOCK_BY_DISTRICT, GET_ALL_CADRE, GET_HEALTH_BY_BLOCK, GET_ALL_CADRE_TYPE, GET_USERDATA, UPDATE_USER_DATA } from "../types";

function* getAllStateSaga() {
    // yield put(showAppLoader());
    console.log("getAllStateSaga");
    try {
        const response = yield call(getAllStateApi);
        // console.log("getAllStateSaga response", response);
        yield put(getAllStateSuccess(response.data.data));
        // action.callBack(response);
    } catch (error) {
        console.log(error?.response);
        console.log("API Error:- ", processErrorAndRespond(error));
        // yield put(authFailed(error.response.data));

    }
    // yield put(hideAppLoader());
}

function* getDistrictByStateSaga(action) {
    // yield put(showAppLoader());
    try {
        const response = yield call(getDistrictByStateApi, action.id);
        // console.log("response", response);
        yield put(getDistrictByStateSuccess(response.data.data));
        // action.callBack(response);
    } catch (error) {
        console.log(error?.response);
        console.log("API Error:- ", processErrorAndRespond(error));
        // yield put(authFailed(error.response.data));

    }
    // yield put(hideAppLoader());
}

function* getBlockByDistrictSaga(action) {
    // yield put(showAppLoader());
    // console.log("getBlockByDistrictSaga");
    try {
        const response = yield call(getBlockByDistrictApi, action.id);
        // console.log("response", response);
        yield put(getBlockByDistrictSuccess(response.data.data));
        // action.callBack(response);
    } catch (error) {
        console.log(error?.response);
        console.log("API Error:- ", processErrorAndRespond(error));
        // yield put(authFailed(error.response.data));

    }
    // yield put(hideAppLoader());
}

function* getAllCadreSaga(action) {
    // yield put(showAppLoader());
    console.log("getAllCadreSaga");
    try {
        const response = yield call(getAllCadreApi, action.selectedCadreType);
        // console.log("response", response);
        yield put(getAllCadreSuccess(response.data.data));
        // action.callBack(response);
    } catch (error) {
        console.log(error?.response);
        console.log("API Error:- ", processErrorAndRespond(error));
        // yield put(authFailed(error.response.data));

    }
    // yield put(hideAppLoader());
}

function* getAllCadreTypeSaga() {
    // yield put(showAppLoader());
    console.log("getAllCadreTypeSaga");
    try {
        const response = yield call(getAllCadreTypeApi);
        // console.log("response", response);
        yield put(getAllCadreTypeSuccess(response.data.data));
        // action.callBack(response);
    } catch (error) {
        console.log(error?.response);
        console.log("API Error:- ", processErrorAndRespond(error));
        // yield put(authFailed(error.response.data));

    }
    // yield put(hideAppLoader());
}

function* getHealthByBlockSaga(action) {
    // yield put(showAppLoader());
    console.log("getHealthByBlockSaga");
    try {
        const response = yield call(getHealthByBlockApi, action.id);
        // console.log("response", response);
        yield put(getHealthByBlockSuccess(response.data.data));
        // action.callBack(response);
    } catch (error) {
        console.log(error?.response);
        console.log("API Error:- ", processErrorAndRespond(error));
        // yield put(authFailed(error.response.data));

    }
    // yield put(hideAppLoader());
}

function* getUserDataSaga() {
    // yield put(showAppLoader());
    // console.log("getUserDataSaga");

    try {
        const response = yield call(getUserDataApi);
        // console.log("response", response);
        yield put(getUserDataSuccess(response.data.data));
        // action.callBack(response);
    } catch (error) {
        console.log(error?.response);
        console.log("API Error:- ", processErrorAndRespond(error));
        // yield put(authFailed(error.response.data));

    }
    // yield put(hideAppLoader());
}
function* updateUserDataSaga(action) {
    try {
        const response = yield call(apiupdateUserDataRequest, action.payload);
        yield put(updateUserDataSuccess());
        action.callBack(response);
    } catch (error) {
        console.log(error?.response);
        console.log("API Error:- ", processErrorAndRespond(error));
    }
}

export function* userSaga() {
    [
        yield takeEvery(GET_ALL_STATE, getAllStateSaga),
        yield takeEvery(GET_DISTRICT_BY_STATE, getDistrictByStateSaga),
        yield takeEvery(GET_BLOCK_BY_DISTRICT, getBlockByDistrictSaga),
        yield takeEvery(GET_ALL_CADRE, getAllCadreSaga),
        yield takeEvery(GET_ALL_CADRE_TYPE, getAllCadreTypeSaga),
        yield takeEvery(GET_HEALTH_BY_BLOCK, getHealthByBlockSaga),
        yield takeEvery(GET_USERDATA, getUserDataSaga),
        yield takeEvery(UPDATE_USER_DATA, updateUserDataSaga),
    ];
}

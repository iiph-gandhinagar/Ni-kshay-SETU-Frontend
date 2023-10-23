import { call, put, takeEvery, select } from "redux-saga/effects";
import { getAllAssessmentApi, getAssessmentPerformace, getAssessmentWithQuestionApi, getFutureAssessmentApi, getUserAssessmentDetailsApi, getUserAssessmentResultApi, getUserPastAssessmentsApi, storeAssesmentEnrollnmentApi, storeAssesmentResultApi } from "../../utils/Api";
import { processErrorAndRespond } from "../../utils/functions";
import { AssessmentError, getAllAssessmentSuccess, getAssessmentPerformaceSuccess, getAssessmentWithQuestionsSuccess, getFutureAssessmentSuccess, getUserAssessmentDetailsSuccess, getUserAssessmentResultSuccess, getUserPastAssessmentSuccess, storeAssessmentEnrollnmentSuccess, storeAssessmentresultSuccess } from "../action/assessmentAction";
import { GET_ALL_ASSESSMENT, GET_ASSESSMENT_WITH_QUESTION, GET_ASSESSMENT_PERFORMANCE, GET_USER_PAST_ASSESSMENT, GET_USER_ASSESSMENT_RESULT, STORE_ASSESSMENT_RESULT, GET_USER_ASSESSMENT_DETAILS, GET_USER_FUTURE_ASSESSMENT, STORE_ASSESSMENT_ENROLLNMENT } from "../types";

function* getAllAssessmentSaga() {
    // yield put(showAppLoader());
    try {
        const response = yield call(getAllAssessmentApi);
        // console.log("getAllAssessmentSaga response", response);
        yield put(getAllAssessmentSuccess(response.data.data));
        // action.callBack(response);
    } catch (error) {
        console.log("Error:- ", error?.response);
        console.log("API Error:- ", processErrorAndRespond(error));
        yield put(AssessmentError());
    }
    // yield put(hideAppLoader());
}

function* getAssessmentWithQuestionSaga(action) {
    // yield put(showAppLoader());
    try {
        const response = yield call(getAssessmentWithQuestionApi, action.id);
        if (response.data.data) {
            //  console.log("response", response.data.data);
            yield put(getAssessmentWithQuestionsSuccess(response.data.data));
        }
        // action.callBack(response);
    } catch (error) {
        console.log("Error:- ", error?.response);
        console.log("API Error:- ", processErrorAndRespond(error));
        yield put(AssessmentError());
    }
    // yield put(hideAppLoader());
}

function* storeAssessmentResultSaga(action) {
    // yield put(showAppLoader());
    console.log(" action.payload", action.payload);
    console.log('storeAssessmentResultSaga', action);
    try {
        const response = yield call(storeAssesmentResultApi, action.payload);
        // console.log("response", response.data);
        if (response.data) {

            yield put(storeAssessmentresultSuccess(response.data.data));
        }
        action.callBack(response);
    } catch (error) {
        console.log("Error:- ", error?.response);
        action.callBack(error);
        console.log("API Error:- ", processErrorAndRespond(error));
        yield put(AssessmentError());
    }
    // yield put(hideAppLoader());
}
function* getUserAssessmentResultSaga(action) {
    // yield put(showAppLoader());
    try {
        const response = yield call(getUserAssessmentResultApi, action.id);
        if (response.data.data) {
            // console.log("response", response.data.data);
            yield put(getUserAssessmentResultSuccess(response.data.data));
        }
        // action.callBack(response);
    } catch (error) {
        console.log("Error:- ", error?.response);
        console.log("API Error:- ", processErrorAndRespond(error));
        yield put(AssessmentError());
    }
    // yield put(hideAppLoader());
}
function* getUserPastAssessmentsSaga() {
    // yield put(showAppLoader());
    try {
        const response = yield call(getUserPastAssessmentsApi);
        if (response.data.code == 200) {
            yield put(getUserPastAssessmentSuccess(response.data.data));
        }
        // action.callBack(response);
    } catch (error) {
        console.log("Error:- ", error?.response);
        console.log("API Error:- ", processErrorAndRespond(error));
        yield put(AssessmentError());
    }
    // yield put(hideAppLoader());
}
function* getUserAssessmentDetailsSaga(action) {
    // yield put(showAppLoader());
    try {
        const response = yield call(getUserAssessmentDetailsApi, action.obj);
        // console.log("getUserAssessmentDetailsSaga response", action);
        if (response.status && response.code === 200) {
            yield put(getUserAssessmentDetailsSuccess());
            action.callBack(response);
        }
        // action.callBack(response);
    } catch (error) {
        console.log("Error:- ", error?.response);
        console.log("API Error:- ", processErrorAndRespond(error));
        yield put(AssessmentError());
    }
    // yield put(hideAppLoader());
}
function* getFutureAssessmentSaga() {
    try {
        const response = yield call(getFutureAssessmentApi);
        if (response.data.code == 200) {
            yield put(getFutureAssessmentSuccess(response.data.data));
        }
    } catch (error) {
        console.log("Error:- ", error?.response);
        console.log("API Error:- ", processErrorAndRespond(error));
        yield put(AssessmentError());
    }
}

function* getAssessmentPerformaceSaga() {
    try {
        const response = yield call(getAssessmentPerformace);
        if (response.data.status) {
            yield put(getAssessmentPerformaceSuccess(response.data.data));
        }
        // action.callBack(response);
    } catch (error) {
        console.log("Error:- ", error?.response);
        console.log("getAssessmentPerformace API Error:- ", processErrorAndRespond(error));
        // yield put(authFailed(error.response.data));
    }
    // yield put(hideAppLoader());
}
function* storeAssessmentEnrollnmentSaga(action) {
    try {
        const response = yield call(storeAssesmentEnrollnmentApi, action.payload);
        if (response.data) {
            yield put(storeAssessmentEnrollnmentSuccess(response.data));
            action.callBack(response);
        }
    } catch (error) {
        yield put(AssessmentError());
    }
}
export function* assessmentSaga() {
    [
        yield takeEvery(GET_ALL_ASSESSMENT, getAllAssessmentSaga),
        yield takeEvery(GET_ASSESSMENT_PERFORMANCE, getAssessmentPerformaceSaga),
        yield takeEvery(GET_ASSESSMENT_WITH_QUESTION, getAssessmentWithQuestionSaga),
        yield takeEvery(STORE_ASSESSMENT_RESULT, storeAssessmentResultSaga),
        yield takeEvery(GET_USER_ASSESSMENT_RESULT, getUserAssessmentResultSaga),
        yield takeEvery(GET_USER_PAST_ASSESSMENT, getUserPastAssessmentsSaga),
        yield takeEvery(GET_USER_ASSESSMENT_DETAILS, getUserAssessmentDetailsSaga),
        yield takeEvery(GET_USER_FUTURE_ASSESSMENT, getFutureAssessmentSaga),
        yield takeEvery(STORE_ASSESSMENT_ENROLLNMENT, storeAssessmentEnrollnmentSaga),
    ];
}

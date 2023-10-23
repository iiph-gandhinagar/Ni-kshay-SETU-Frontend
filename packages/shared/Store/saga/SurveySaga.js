import { call, put, takeEvery, select } from "redux-saga/effects";
import {
    getAllQuestionApi, getAllSurveyApi, storeSurveyQuestionApi
} from "../../utils/Api";
import { processErrorAndRespond } from "../../utils/functions";
import {
    getAllQuestionSuccess, getAllSurvey, getAllSurveySuccess
} from "../action/SurveyActions";
import {
    GET_ALL_QUESTION, GET_ALL_SURVEY, STORE_SURVEY_QUESTION
} from "../types";

function* getAllQuestionsSaga(action) {
    // yield put(showAppLoader());
    // console.log("getAllSymptomsSaga ");
    try {
        const response = yield call(getAllQuestionApi, action.id);
        //   console.log("getAllQuestionsSaga response", response.data.data);
        if (response.data.status) {
            yield put(getAllQuestionSuccess(response.data.data));
        }
        // action.callBack(response);
    } catch (error) {
        console.log(error?.response);
        console.log("AllQuestionsAPI Error:- ", processErrorAndRespond(error));
        // yield put(authFailed(error.response.data));

    }
    // yield put(hideAppLoader());
}


function* getAllSurveySaga() {
    // yield put(showAppLoader());
    // console.log("getAllSymptomsSaga ");
    try {
        const response = yield call(getAllSurveyApi);
        //  console.log("getAllSurveySaga response", response);
        if (response.data.status) {
            yield put(getAllSurveySuccess(response.data.data));
        }
        // action.callBack(response);
    } catch (error) {
        console.log(error?.response);
        console.log("API Error:- ", processErrorAndRespond(error));
        // yield put(authFailed(error.response.data));

    }
    // yield put(hideAppLoader());
}
function* storeSurveyQuestionsSaga(action) {
    try {
        const response = yield call(storeSurveyQuestionApi, action.payload);
        if (response.data) {
            yield put(getAllSurveySuccess(response.data));
            yield put(getAllSurvey());
        }
        action.callBack(response)
    } catch (error) {
        action.callBack(error)
        console.log(error?.response);
        console.log("API Error:- ", processErrorAndRespond(error));
    }
}
export function* watchSurveySaga() {
    [
        yield takeEvery(GET_ALL_QUESTION, getAllQuestionsSaga),
        yield takeEvery(GET_ALL_SURVEY, getAllSurveySaga),
        yield takeEvery(STORE_SURVEY_QUESTION, storeSurveyQuestionsSaga),
    ];
}
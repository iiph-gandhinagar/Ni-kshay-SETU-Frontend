import { call, put, takeEvery } from "redux-saga/effects";
import {
    getkeywordsApi,
    getQuestionsBykeywordApi,
    loadMoreApi,
    postQuestionHitApi,
    searchByKeywordkeywordApi,
    sendFeedbackApi
} from "../../utils/Api";
import { processErrorAndRespond } from "../../utils/functions";
import {
    getkeywordsSuccess,
    getQuestionsBykeywordSuccess,
    loadMoreSuccess, popLoader, postQuestionHitSuccess, searchByKeywordStaticSuccess, searchByKeywordSuccess, sendFeedbackSuccess
} from "../action/chatActions";
import {
    GET_KEYWORDS,
    GET_QUESTIONS_BY_KEYWORD,
    LOAD_MORE_DATA,
    SEARCH_BY_KEYWORDS,
    SEND_FEEDBACK,
    SUBMIT_QUESTIONS_HIT
} from "../types";
function* getkeywordsSaga(action) {
    try {
        const response = yield call(getkeywordsApi, action.token);
        if (response.data.success) {
            yield put(popLoader());
            yield put(getkeywordsSuccess(response.data?.data));
        }
    } catch (error) {
        yield put(popLoader());
        console.log("Error  getkeywordsSaga:- ", error?.response);
        console.log("API Error:- ", processErrorAndRespond(error));
    }
}
function* getQuestionsBykeywordSaga(action) {
    try {
        const response = yield call(getQuestionsBykeywordApi, action.obj);
        if (response.data.success) {
            yield put(popLoader());
            yield put(getQuestionsBykeywordSuccess(response.data.data));
        }
    } catch (error) {
        yield put(popLoader());
        yield put(searchByKeywordStaticSuccess({ error: true}));
        console.log("Error getQuestionsBykeywordSaga:- ", error?.response);
        console.log("API Error:- ", processErrorAndRespond(error));
    }
}
function* postQuestionHitSaga(action) {
    try {
        const response = yield call(postQuestionHitApi, action.payload);
        if (response.success) {
            yield put(postQuestionHitSuccess(response?.data?.activity_id));
        }
    } catch (error) {
        console.log("Error postQuestionHitSaga:- ", error?.response);
        console.log("API Error:- ", processErrorAndRespond(error));
    }
}
function* loadMoreSaga(action) {
    try {
        const response = yield call(loadMoreApi, action.url);
        if (response.data.success) {
            yield put(popLoader());
            yield put(loadMoreSuccess(response?.data?.data, action.data_type));
        }
    } catch (error) {
        yield put(popLoader());
        console.log("Error loadMoreSaga:- ", error?.response);
        console.log("API Error:- ", processErrorAndRespond(error));
    }
}
function* searchByKeywordSaga(action) {
    try {
        const response = yield call(searchByKeywordkeywordApi, action.obj);
        if (response.data.success) {
            console.log("searchByKeywordSaga-",response?.data?.data);
            yield put(popLoader());
            if (response?.data?.data?.is_fix_response) {
                yield put(searchByKeywordStaticSuccess(response.data.data));
            } else if (response?.data?.data?.questions || response?.data?.data?.modules || response?.data?.data?.resource_material|| response?.data?.data?.external_idefeat) {
                yield put(searchByKeywordSuccess(response.data.data));
            } else {
                yield put(searchByKeywordStaticSuccess({ error: true}));
            }
        }
    } catch (error) {
        yield put(popLoader());
        yield put(searchByKeywordStaticSuccess({ error: true}));
        console.log("Error searchByKeywordSaga:- ", error?.response);
        console.log("API Error:- ", processErrorAndRespond(error));
    }
}
function* sendFeedbackSaga(action) {
    try {
        const response = yield call(sendFeedbackApi, action.obj);
        if (response.success) {
            yield put(sendFeedbackSuccess(action.obj));
        }
    } catch (error) {
        console.log("Error sendFeedbackSaga:- ", error);
        console.log("API Error:- ", processErrorAndRespond(error));
    }
}
export function* chatSaga() {
    [
        yield takeEvery(GET_KEYWORDS, getkeywordsSaga),
        yield takeEvery(GET_QUESTIONS_BY_KEYWORD, getQuestionsBykeywordSaga),
        yield takeEvery(SUBMIT_QUESTIONS_HIT, postQuestionHitSaga),
        yield takeEvery(LOAD_MORE_DATA, loadMoreSaga),
        yield takeEvery(SEARCH_BY_KEYWORDS, searchByKeywordSaga),
        yield takeEvery(SEND_FEEDBACK, sendFeedbackSaga),
    ];
}
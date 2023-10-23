import { call, put, takeEvery } from "redux-saga/effects";
import { getAchivementApi, getAllCertificatesApi, getLeaderboardDetailesApi, getLeaderboardTaskListApi } from "../../utils/Api";
import {
  getAchivementSuccess,
  getAllCertificatesSuccess,
  getLeaderboardDetailesSuccess, getLeaderboardTaskListSuccess
} from "../action/leaderBoardAction";
import { processErrorAndRespond } from "../../utils/functions";
import {
  GET_ACHIVEMENT,
  GET_ALL_CERTIFICATES,
  LEADERBOARD_DATA,
  LEADERBOARD_TASK_LIST,
} from "../types";
function* leaderBoardSaga(action) {
  try {
    const response = yield call(getLeaderboardDetailesApi, action?.payload);
    if (response.data.status) {
      yield put(getLeaderboardDetailesSuccess(response.data?.data));
    }
  } catch (error) {
    console.log("Error.Response:- ", error.response);
    // action.callBack(error);
    console.log("API Error:- ", processErrorAndRespond(error));
  }
}

function* leaderBoardTaskListSaga(action) {
  try {
    const response = yield call(getLeaderboardTaskListApi, action);

    if (response?.data?.status) {

      yield put(getLeaderboardTaskListSuccess(response.data?.data));
    }
  } catch (error) {
    console.log("Error.Response:- ", error.response);
    console.log("API Error:- ", processErrorAndRespond(error));
  }
}
function* getAchivementSaga() {
  try {
    const response = yield call(getAchivementApi);

    if (response?.data?.status) {
      yield put(getAchivementSuccess(response.data?.data));
    }
  } catch (error) {
    console.log("Error.Response:- ", error.response);
    console.log("API Error:- ", processErrorAndRespond(error));
  }
}
function* getAllCertificatesSaga() {
  try {
    const response = yield call(getAllCertificatesApi);

    if (response?.data?.status) {
      yield put(getAllCertificatesSuccess(response.data?.data));
    }
  } catch (error) {
    console.log("Error.Response:- ", error.response);
    console.log("API Error:- ", processErrorAndRespond(error));
  }
}



export function* watchleaderBoardSaga() {
  [
    yield takeEvery(LEADERBOARD_DATA, leaderBoardSaga),
    yield takeEvery(LEADERBOARD_TASK_LIST, leaderBoardTaskListSaga),
    yield takeEvery(GET_ACHIVEMENT, getAchivementSaga),
    yield takeEvery(GET_ALL_CERTIFICATES, getAllCertificatesSaga),
  ];
}

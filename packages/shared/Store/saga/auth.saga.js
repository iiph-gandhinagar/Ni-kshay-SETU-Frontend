import { call, put, takeEvery } from "redux-saga/effects";
import { apiRegisterRequest, apiLoginRequest, contactUsApi,changePasswordApi, forgotPasswordApi, verifiedForgotPasswordOtpApi } from "../../utils/Api";
import { processErrorAndRespond } from "../../utils/functions";
import { registerUserSuccess, handleLoginSuccess, contactUsSuccess, changePasswordSuccess, forgotPasswordSuccess, verifiedForgotPasswordOtpSuccess } from "../action/authActions";
import { REQUEST_REGISTER, REQUEST_LOGIN, CONTACT_US, CHANGE_PASSWORD, FORGOT_PASSWORD, VERIFIED_FORGOT_PASSWORD_OTP } from "../types";

function* loginSaga(action) {
  // yield put(showAppLoader());
  //  console.log("saga",action);
  try {
    const response = yield call(apiLoginRequest, action.loginObj);
    console.log('loginSaga status', response);
    if (response.status) {
      yield put(handleLoginSuccess(response.data));
      // console.log("response", response);
    }
    action.callBack(response); 
    // yield put(setNextCtx(response.data.token));
    //  yield put(setToken(response.data.token));

    // yield put(showNotification(response.data.message, "success"));

    //  yield cookie.set("token", response.data.token, { expires: 1 }); //TODO take from Config
    //getting user
    //  yield put(getUserFromToken(null));
    //now navigate to home

    // if (
    //   action.redirectTo &&
    //   action.redirectTo.redirectTo &&
    //   action.redirectTo.redirectTo != ""
    // ) {
    //   Router.push(action.redirectTo.redirectTo);
    // } else {
    //   Router.push("/");
    // }
  } catch (error) {
    console.log("Error.Response:- ", error.response);
    action.callBack(error);
    console.log("API Error:- ", processErrorAndRespond(error));
    //  yield put(authFailed(error.response.data));
    // yield put(showNotification(error.response.data.message.email?error.response.data.message.email[0]:processErrorAndRespond(error)[1], "error"));
  }
  // yield put(hideAppLoader());
}

function* registerSaga(action) {
  //  yield put(showAppLoader());
  // console.log("saga",action);
  try {
    const response = yield call(apiRegisterRequest, action.registrationDetails);
    if (response.status) {
      yield put(registerUserSuccess(response.data));
    }
    action.callBack(response);
  } catch (error) {
    console.log("API Error:- ", processErrorAndRespond(error));
    //  yield put(authFailed(error.response.data));
    // yield put(showNotification(error.response.data, "error"));
  }
  //  yield put(hideAppLoader());
}

function* contactUsSaga(action) {
  //  yield put(showAppLoader());
  // console.log("saga",action);
  try {
    const response = yield call(contactUsApi, action.contactUsObj);
    if (response.status) {
      yield put(contactUsSuccess(response.data));
    }
    action.callBack(response);
  } catch (error) {
    console.log("API Error:- ", processErrorAndRespond(error));
    //  yield put(authFailed(error.response.data));
    // yield put(showNotification(error.response.data, "error"));
  }
  //  yield put(hideAppLoader());
}

function* changePasswordSaga(action) {
  //  yield put(showAppLoader());
  // console.log("saga",action);
  try {
    const response = yield call(changePasswordApi, action.changePasswordObj);
    if (response.status) {
      yield put(changePasswordSuccess(response.data));
    }
    action.callBack(response);
  } catch (error) {
    console.log("API Error:- ", processErrorAndRespond(error));
    //  yield put(authFailed(error.response.data));
    // yield put(showNotification(error.response.data, "error"));
  }
  //  yield put(hideAppLoader());
}
function* forgotPasswordSaga(action) {

  try {
    const response = yield call(forgotPasswordApi, action.obj);
    if (response.status) {
      yield put(forgotPasswordSuccess(response.data));
    }
    action.callBack(response);
  } catch (error) {
    console.log("API Error:- ", processErrorAndRespond(error));
    //  yield put(authFailed(error.response.data));
    // yield put(showNotification(error.response.data, "error"));
  }
  //  yield put(hideAppLoader());
}
function* verifiedForgotPasswordOtpSaga(action) {

  try {
    const response = yield call(verifiedForgotPasswordOtpApi, action.obj);
    if (response.status) {
      yield put(verifiedForgotPasswordOtpSuccess());
    }
    action.callBack(response);
  } catch (error) {
    console.log("API Error:- ", processErrorAndRespond(error));
    //  yield put(authFailed(error.response.data));
    // yield put(showNotification(error.response.data, "error"));
  }
  //  yield put(hideAppLoader());
}


export function* watchAuthSagas() {
  [
    yield takeEvery(REQUEST_LOGIN, loginSaga),
    yield takeEvery(REQUEST_REGISTER, registerSaga),
    yield takeEvery(CONTACT_US, contactUsSaga),
    yield takeEvery(CHANGE_PASSWORD, changePasswordSaga),
    yield takeEvery(FORGOT_PASSWORD, forgotPasswordSaga),
    yield takeEvery(VERIFIED_FORGOT_PASSWORD_OTP, verifiedForgotPasswordOtpSaga),
  ];
}

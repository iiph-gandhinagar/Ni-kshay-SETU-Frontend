import {
  REQUEST_LOGIN,
  REQUEST_LOGIN_SUCCESS,
  REQUEST_REGISTER,
  REQUEST_REGISTER_SUCCESS,
  SET_USER_TOKEN,
  CONTACT_US,
  CONTACT_US_SUCCESS,
  CHANGE_PASSWORD,
  CHANGE_PASSWORD_SUCCESS,
  FORGOT_PASSWORD,
  FORGOT_PASSWORD_SUCCESS,
  VERIFIED_FORGOT_PASSWORD_OTP,
  VERIFIED_FORGOT_PASSWORD_OTP_SUCCESS
} from "../types";

export function handleLogin(loginObj, callBack) {
  console.log('handleLogin ACTION==>', loginObj);
  return {
    type: REQUEST_LOGIN,
    loginObj,
    callBack,
  };
}

export function handleLoginSuccess(authUser) {
  return { type: REQUEST_LOGIN_SUCCESS, authUser };
}

export function registerUser(registrationDetails, callBack) {
  console.log('registerUser ACTION==>', registrationDetails);
  return {
    type: REQUEST_REGISTER,
    registrationDetails,
    callBack
  };
}

export function registerUserSuccess(registrationDetails) {
  return {
    type: REQUEST_REGISTER_SUCCESS,
    registrationDetails
  };
}
export function setUserToken(token) {
  return {
    type: SET_USER_TOKEN,
    token: token
  };
}

export function contactUs(contactUsObj, callBack) {
  console.log("contactUsObj => ", contactUsObj);
  return {
    type: CONTACT_US,
    contactUsObj,
    callBack
  };
}

export function contactUsSuccess(msg) {
  return {
    type: CONTACT_US_SUCCESS,
    msg
  };
}

export function changePassword(changePasswordObj, callBack) {
  console.log("changePasswordObj => ", changePasswordObj);
  return {
    type: CHANGE_PASSWORD,
    changePasswordObj,
    callBack
  };
}

export function changePasswordSuccess(msg) {
  return {
    type: CHANGE_PASSWORD_SUCCESS,
    msg
  };
}
export function forgotPassword(obj, callBack) {
  return {
    type: FORGOT_PASSWORD,
    obj,
    callBack
  };
}

export function forgotPasswordSuccess(msg) {
  return {
    type: FORGOT_PASSWORD_SUCCESS,
    msg
  };
}
export function verifiedForgotPasswordOtp(obj, callBack) {
  return {
    type: VERIFIED_FORGOT_PASSWORD_OTP,
    obj,
    callBack
  };
}

export function verifiedForgotPasswordOtpSuccess() {
  return {
    type: VERIFIED_FORGOT_PASSWORD_OTP_SUCCESS,
  };
}
import {
  CLEAR_APP_NOTIFICATION,
  CLEAR_APP_TOUR, CLEAR_FEEDBACK_DETAILS, GENERATE_OTP,
  GENERATE_OTP_SUCCESS, GET_ALL_SIMILAR_APPS, GET_ALL_SIMILAR_APPS_SUCCESS, GET_APP_CONFIG,
  GET_APP_CONFIG_SUCCESS, GET_APP_DYNAMIC_ALGO,
  GET_APP_DYNAMIC_ALGO_SUCCESS, GET_APP_ERROR, GET_APP_HEALTH_STATUS, GET_APP_HEALTH_STATUS_ERROR,
  GET_APP_HEALTH_STATUS_SUCCESS, GET_APP_LANGUAGES_SUCCESS, GET_APP_LEADERBOARD_INFO_SUCCESS, GET_APP_MASTER_CMS_SUCCESS, GET_APP_NOTIFICATION, GET_APP_NOTIFICATION_SUCCESS, GET_APP_TOUR, GET_APP_TOUR_SUCCESS, GET_APP_TRANSLATIONS_SUCCESS, GET_FEEDBACK_DETAILS, GET_FEEDBACK_DETAILS_SUCCESS, GET_FLASH_NEWS, GET_FLASH_NEWS_SUCCESS, GET_RECENTLY_ADDED, GET_RECENTLY_ADDED_SUCCESS, GET_TOP_MODULE, GET_TOP_MODULE_SUCCESS, REMOVE_NOTIFICATION_TOKEN, SET_APP_LANG,
  SET_APP_PLATFORM, SET_APP_SCROLLING, SET_APP_UNDER_MAINTENANCE, SET_NOTIFICATION_POPUP, STORE_APP_TIME, STORE_FEEDBACK_DETAILS, STORE_FEEDBACK_DETAILS_SUCCESS, STORE_MODULE_USAGE, STORE_MODULE_USAGE_SUCCESS, STORE_OLD_APP_TOURID, STORE_USER_ACTIVITY, STORE_USER_DEVICE_TOKENS,
  VERIFIED_OTP, VERIFIED_OTP_SUCCESS
} from "../types";
export const getAppConfig = () => {
  // console.log("getAllState");
  return {
    type: GET_APP_CONFIG,
  };
};
export const getAppConfigSuccess = (obj) => {
  // console.log("getAppConfigSuccess",obj);
  return {
    type: GET_APP_CONFIG_SUCCESS,
    payload: obj,
  };
};
export const getAppTranslationsSuccess = (obj) => {
  // console.log("getAppTranslationsSuccess",obj);
  return {
    type: GET_APP_TRANSLATIONS_SUCCESS,
    payload: obj,
  };
};
export const getAppLanguagesSuccess = (obj) => {
  return {
    type: GET_APP_LANGUAGES_SUCCESS,
    payload: obj,
  };
};
export const getAppMasterCmsSuccess = (arr) => {
  // console.log("getAppTranslationsSuccess",obj);
  return {
    type: GET_APP_MASTER_CMS_SUCCESS,
    payload: arr,
  };
};
export const storeUserActivity = (name) => {
  // console.log("getAllState");
  return {
    type: STORE_USER_ACTIVITY,
    name,
  };
};
export const generateOtp = (token) => {
  return {
    type: GENERATE_OTP,
    payload: token,
  };
};
export const generateOtpSuccess = () => {
  return {
    type: GENERATE_OTP_SUCCESS
  };
};
export const verifiedOtp = (obj, callBack) => {
  return {
    type: VERIFIED_OTP,
    payload: obj,
    callBack,
  };
};
export const verifiedOtpSuccess = () => {
  return {
    type: VERIFIED_OTP_SUCCESS
  };
};
export const setAppLang = (lang) => {
  return {
    type: SET_APP_LANG,
    payload: lang
  };
};
export const setAppPlatform = (payload) => {
  return {
    type: SET_APP_PLATFORM,
    payload
  };
};
export const StoreUserDeviceToken = (obj, callBack) => {
  return {
    type: STORE_USER_DEVICE_TOKENS,
    payload: obj,
    callBack,
  };
};
export const setAppUnderMaintenance = () => {
  return {
    type: SET_APP_UNDER_MAINTENANCE,
  };
};
export const getAppHelthStatus = (version) => {
  return {
    type: GET_APP_HEALTH_STATUS,
    payload: version,
  };
};
export const getAppHelthStatusSuccess = (obj) => {
  return {
    type: GET_APP_HEALTH_STATUS_SUCCESS,
    payload: obj,
  };
};
export const getAppHelthStatusError = (obj) => {
  return {
    type: GET_APP_HEALTH_STATUS_ERROR,
    payload: obj,
  };
};
export const getAppDynamicAlgo = () => {
  // console.log("getAllState");
  return {
    type: GET_APP_DYNAMIC_ALGO,
  };
};
export const getAppDynamicAlgoSuccess = (obj) => {
  // console.log("getAppConfigSuccess",obj);
  return {
    type: GET_APP_DYNAMIC_ALGO_SUCCESS,
    payload: obj,
  };
};
export const getAppError = (obj) => {
  return {
    type: GET_APP_ERROR,
    payload: obj,
  };
};
export const removeNotificationToken = (obj, callBack) => {
  return {
    type: REMOVE_NOTIFICATION_TOKEN,
    payload: obj,
    callBack
  };
};
export const getAppLeaderBoardInformationSuccess = (obj) => {
  return {
    type: GET_APP_LEADERBOARD_INFO_SUCCESS,
    payload: obj,
  };
};
export const getFlashNews = () => {
  return {
    type: GET_FLASH_NEWS,
  };
};
export const getFlashNewsSuccess = (obj) => {
  return {
    type: GET_FLASH_NEWS_SUCCESS,
    payload: obj,
  };
};
export const getAllSimilarApps = () => {
  return {
    type: GET_ALL_SIMILAR_APPS,
  };
};
export const getAllSimilarAppsSuccess = (obj) => {
  return {
    type: GET_ALL_SIMILAR_APPS_SUCCESS,
    payload: obj,
  };
};
export const getFeedbackDetails = (obj) => {
  return {
    type: GET_FEEDBACK_DETAILS,
    payload: obj,
  };
};
export const getFeedbackDetailsSuccess = (obj) => {
  return {
    type: GET_FEEDBACK_DETAILS_SUCCESS,
    payload: obj,
  };
};
export const clearFeedbackDetails = () => {
  return {
    type: CLEAR_FEEDBACK_DETAILS,
  };
};
export const storeFeedbackDetails = (obj, callBack) => {
  return {
    type: STORE_FEEDBACK_DETAILS,
    payload: obj,
    callBack
  };
};
export const storeFeedbackDetailsSuccess = (obj) => {
  return {
    type: STORE_FEEDBACK_DETAILS_SUCCESS,
    payload: obj,
  };
};
export const storeModuleUsage = (obj, callBack) => {
  return {
    type: STORE_MODULE_USAGE,
    payload: obj,
    callBack
  };
};
export const storeModuleUsageSuccess = (obj) => {
  return {
    type: STORE_MODULE_USAGE_SUCCESS,
    payload: obj,
  };
};
export const getTopModule = () => {
  return {
    type: GET_TOP_MODULE,
  };
};
export const getTopModuleSuccess = (obj) => {
  return {
    type: GET_TOP_MODULE_SUCCESS,
    payload: obj,
  };
};
export const getRecentlyAdded = () => {
  return {
    type: GET_RECENTLY_ADDED,
  };
};
export const getRecentlyAddedSuccess = (obj) => {
  return {
    type: GET_RECENTLY_ADDED_SUCCESS,
    payload: obj,
  };
};
export const storeApptime = (payload) => {
  return {
    type: STORE_APP_TIME,
    payload
  };
};
export const setAppScrolling = (obj) => {
  return {
    type: SET_APP_SCROLLING,
    payload: obj,
  };
};
export const setNotificationPop = (obj) => {
  return {
    type: SET_NOTIFICATION_POPUP,
    payload: obj,
  };
};
export const setOldAppTourID = (payload) => {
  return {
    type: STORE_OLD_APP_TOURID,
    payload
  };
};
export const getAppTour = () => {
  return {
    type: GET_APP_TOUR,
  };
};
export const getAppTourSuccess = (obj) => {
  return {
    type: GET_APP_TOUR_SUCCESS,
    payload: obj,
  };
};
export const clearAppTour = () => {
  return {
    type: CLEAR_APP_TOUR,
  };
};
export const getAppNotification = (payload) => {
  return {
    type: GET_APP_NOTIFICATION,
    payload
  };
};
export const getAppNotificationSuccess = (obj) => {
  return {
    type: GET_APP_NOTIFICATION_SUCCESS,
    payload: obj,
  };
};
export const clearAppNotification = () => {
  return {
    type: CLEAR_APP_NOTIFICATION,
  };
};
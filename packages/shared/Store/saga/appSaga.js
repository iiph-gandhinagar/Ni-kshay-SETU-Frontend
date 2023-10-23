import { call, put, takeEvery, takeLatest } from "redux-saga/effects";
import { generateOtpApi, getAllSimilarAppsApi, getAppCGCAlgoApi, getAppConfigApi, getAppDynamicAlgoApi, getAppHelthStatusApi, getAppNotificationApi, getAppTourApi, getFeedbackDetailsApi, getFlashNewsApi, getMasterSearchApi, getRecentlyAddedApi, getRootFoldersApi, getTopModuleApi, removeNotificationTokenApi, storeFeedbackDetailsApi, storeModuleUsageApi, storeUserActivityApi, StoreUserDeviceTokenApi, verifiedOtpApi } from "../../utils/Api";
import { processErrorAndRespond } from "../../utils/functions";
import { generateOtpSuccess, getAllSimilarAppsSuccess, getAppConfigSuccess, getAppDynamicAlgoSuccess, getAppError, getAppHelthStatusError, getAppHelthStatusSuccess, getAppLanguagesSuccess, getAppLeaderBoardInformationSuccess, getAppMasterCmsSuccess, getAppNotificationSuccess, getAppTourSuccess, getAppTranslationsSuccess, getFeedbackDetails, getFeedbackDetailsSuccess, getFlashNewsSuccess, getMasterSearchSuccess, getRecentlyAddedSuccess, getTopModuleSuccess, setAppUnderMaintenance, storeFeedbackDetailsSuccess, storeModuleUsageSuccess, verifiedOtpSuccess } from "../action/appActions";
import { setUserToken } from "../action/authActions";
import { GENERATE_OTP, GET_ALL_SIMILAR_APPS, GET_APP_CONFIG, GET_APP_DYNAMIC_ALGO, GET_APP_HEALTH_STATUS, GET_APP_NOTIFICATION, GET_APP_TOUR, GET_FEEDBACK_DETAILS, GET_FLASH_NEWS, GET_MASTER_SEARCH, GET_RECENTLY_ADDED, GET_TOP_MODULE, REMOVE_NOTIFICATION_TOKEN, STORE_FEEDBACK_DETAILS, STORE_MODULE_USAGE, STORE_USER_ACTIVITY, STORE_USER_DEVICE_TOKENS, VERIFIED_OTP } from "../types";


function* getAppConfigSaga() {
  try {
    const response = yield call(getAppConfigApi);
    if (response.data.status) {
      yield put(
        getAppConfigSuccess(response.data.data?.health_facility_mapping)
      );
      yield put(
        getAppTranslationsSuccess(response.data.data?.app_translations)
      );
      yield put(
        getAppLeaderBoardInformationSuccess(
          response.data.data?.Leader_Board_Information
        )
      )
      if (response?.data?.data?.languages?.length > 0) {
        yield put(getAppLanguagesSuccess(response.data.data?.languages))
      }
      yield put(getAppMasterCmsSuccess(response.data.data?.master_cms));
    }
  } catch (error) {
    if (error?.response?.status === 503) {
      yield put(setAppUnderMaintenance());
    } else {
      yield put(getAppError());
    }
    console.log("getAppConfigSaga Error :- ", error, error?.response);
  }
}
function* storeUserActivitySaga(action) {
  try {
    const response = yield call(storeUserActivityApi, action.name);
    // console.log("storeUserActivitySaga response", response?.data?.data);
  } catch (error) {
    console.log("storeUserActivitySaga API Error:- ", error, error?.response);
    if (error?.response) {
      if (error?.response?.status === 503) {
        yield put(getAppHelthStatusError(
          {
            "alertCategory": "Server Error",
            "errorCode": error?.response?.status,
          }
        ));
      }
    } else {
      yield put(getAppHelthStatusError(
        {
          "alertCategory": "Server Error",
          "errorCode": 503,
        }
      ));
    }
  }
}
function* generateOtpSaga(action) {
  try {
    const response = yield call(generateOtpApi, action.payload);
    // console.log("generateOtp response", response);
    if (response.data.status) {
      yield put(generateOtpSuccess());
    }
  } catch (error) {
    console.log("Error :- ", error?.response);
    console.log("API Error:- ", processErrorAndRespond(error));
  }
}
function* verifiedOtpSaga(action) {
  try {
    const response = yield call(verifiedOtpApi, action.payload);
    // console.log("generateOtp response", response);
    action.callBack(response)

    yield put(verifiedOtpSuccess());

  } catch (error) {
    console.log("Error :- ", error?.response);
    console.log("API Error:- ", processErrorAndRespond(error));
  }
}
function* StoreUserDeviceTokenSaga(action) {
  try {
    const response = yield call(StoreUserDeviceTokenApi, action.payload);
    // console.log("StoreUserDeviceToken response", response);
    action.callBack(response, action.payload)
  } catch (error) {
    console.log("Error :- ", error?.response);
    console.log("API Error:- ", processErrorAndRespond(error));
  }
}
function* getAppDynamicAlgoSaga() {
  try {
    const response = yield call(getAppDynamicAlgoApi);
    const response2 = yield call(getAppCGCAlgoApi);
    const response3 = yield call(getRootFoldersApi);
    if (response.data.success && response2?.data?.success && response3.data.status) {
      yield put(getAppDynamicAlgoSuccess(
        {
          PMT: response.data.data?.filter((e) => e.section === 'Patient Management Tool'),
          LEARN: response.data.data?.filter((e) => e.section === 'Learn About Case Findings'),
          NTEP: response2.data.data,
          RESOURCE_MATERIALS: response3.data.data
        }
      ));
    } else if (response.data.success) {
      yield put(getAppDynamicAlgoSuccess(
        {
          PMT: response.data.data?.filter((e) => e.section === 'Patient Management Tool'),
          LEARN: response.data.data?.filter((e) => e.section === 'Learn About Case Findings'),
        }
      ));
    }
    else if (response2.data.success) {
      yield put(getAppDynamicAlgoSuccess({ NTEP: response2.data.data }));
    }
  } catch (error) {
    console.log("getAppDynamicAlgoSaga Error :- ", error, error?.response?.data);
    yield put(getAppError());
  }
}
function* getAppHelthStatusSaga(action) {
  try {
    const response = yield call(getAppHelthStatusApi, action.payload);
    if (response.data?.errorCode == 200) {
      yield put(getAppHelthStatusSuccess({}));
      yield put(getFeedbackDetails({
        ismodal: true,
        val: 1,
      }))
    } else if (response.data) {
      yield put(getAppHelthStatusSuccess(response.data));
    }
  } catch (error) {
    if (error?.response) {
      if (error?.response?.status === 503) {
        yield put(getAppHelthStatusError(
          {
            "alertCategory": "Server Error",
            "errorCode": error?.response?.status,
          }
        ));
      }
    } else {
      yield put(getAppHelthStatusError(
        {
          "alertCategory": "Server Error",
          "errorCode": 503,
        }
      ));
    }
    yield put(getAppError());
  }
}
function* removeNotificationTokenSaga(action) {
  try {
    const response = yield call(removeNotificationTokenApi, action.payload);
    if (response.data) {
      action.callBack()
    }
  } catch (error) {
    console.log("removeNotificationToken---------error --------", error, error?.response);
    action.callBack()
    yield put(getAppError());
  }
}
function* getFlashNewsSaga() {
  try {
    const response = yield call(getFlashNewsApi);
    // console.log("getFlashNewsSaga response.data",response.data );
    if (response.data.status) {
      yield put(getFlashNewsSuccess(response.data.data));
    }
  } catch (error) {
    console.log("getFlashNewsSaga Error :- ", error?.response);
    yield put(getAppError());
  }
}
function* getAllSimilarAppsSaga() {
  try {
    const response = yield call(getAllSimilarAppsApi);
    // console.log("getAllSimilarAppsSaga response.data",response.data );
    if (response.data.status) {
      yield put(getAllSimilarAppsSuccess(response.data.data));
    }
  } catch (error) {
    console.log("getAllSimilarAppsSaga Error :- ", error?.response);
    yield put(getAppError());
  }
}
function* getFeedbackDetailsSaga(action) {
  try {
    const response = yield call(getFeedbackDetailsApi, action.payload);
    if (response.data.status) {
      if (action.payload?.ismodal) {
        yield put(getFeedbackDetailsSuccess({
          modal: response.data.data?.length > 0 ? true : false,
          data: response.data.data
        }));
      } else
        yield put(getFeedbackDetailsSuccess({
          modal: false,
          data: response.data.data
        }));
    }
  } catch (error) {
    console.log("getFeedbackDetailsSaga Error :- ", error, error?.response?.data);
    yield put(getAppError());
  }
}
function* storeFeedbackDetailsSaga(action) {
  try {
    const response = yield call(storeFeedbackDetailsApi, action.payload);
    if (response.status) {
      yield put(storeFeedbackDetailsSuccess());
      action.callBack()
    }
  } catch (error) {
    console.log("storeFeedbackDetailsSaga Error :- ", error, error?.response?.data);
    yield put(getAppError());
  }
}
function* storeModuleUsageSaga(action) {
  try {
    const response = yield call(storeModuleUsageApi, action.payload);
    if (response.status) {
      action?.callBack(response?.data)
      yield put(storeModuleUsageSuccess(response?.data));
    }
  } catch (error) {
    console.log("storeModuleUsageSaga Error :- ", error, error?.response?.data);
    yield put(getAppError());
  }
}
function* getTopModuleSaga() {
  try {
    const response = yield call(getTopModuleApi);
    // console.log("getTopModuleSaga response.data",response.data );
    if (response.data.status) {
      yield put(getTopModuleSuccess(response.data.data));
    }
  } catch (error) {
    console.log("getTopModuleSaga Error :- ", error?.response);
    yield put(getAppError());
  }
}
function* getRecentlyAddedSaga() {
  try {
    const response = yield call(getRecentlyAddedApi);
    // console.log("getRecentlyAddedSaga response.data",response.data );
    if (response.data.status) {
      yield put(getRecentlyAddedSuccess(response.data.data));
    }
  } catch (error) {
    console.log("getRecentlyAddedSaga Error :- ", error?.response);
    yield put(getAppError());
  }
}
function* getAppTourSaga() {
  try {
    const response = yield call(getAppTourApi);
    // console.log("getAppTourSaga response.data",response.data );
    if (response.data.status) {
      yield put(getAppTourSuccess(response.data.data));
    }
  } catch (error) {
    console.log("getAppTourSaga Error :- ", error?.response);
    yield put(getAppError());
  }
}
function* getAppNotificationSaga(action) {
  try {
    const response = yield call(getAppNotificationApi, action.payload);
    if (response.data.status) {
      yield put(getAppNotificationSuccess(response.data?.data));
    }
  } catch (error) {
    console.log("getAppNotification", error?.response);
    yield put(getAppError());
  }
}
export function* appSaga() {
  [
    yield takeEvery(GET_APP_NOTIFICATION, getAppNotificationSaga),
    yield takeEvery(GET_APP_CONFIG, getAppConfigSaga),
    yield takeEvery(GET_APP_HEALTH_STATUS, getAppHelthStatusSaga),
    yield takeEvery(STORE_USER_ACTIVITY, storeUserActivitySaga),
    yield takeEvery(GENERATE_OTP, generateOtpSaga),
    yield takeEvery(VERIFIED_OTP, verifiedOtpSaga),
    yield takeEvery(GET_APP_DYNAMIC_ALGO, getAppDynamicAlgoSaga),
    yield takeEvery(STORE_USER_DEVICE_TOKENS, StoreUserDeviceTokenSaga),
    yield takeEvery(REMOVE_NOTIFICATION_TOKEN, removeNotificationTokenSaga),
    yield takeEvery(GET_FLASH_NEWS, getFlashNewsSaga),
    yield takeEvery(GET_ALL_SIMILAR_APPS, getAllSimilarAppsSaga),
    yield takeEvery(GET_FEEDBACK_DETAILS, getFeedbackDetailsSaga),
    yield takeEvery(STORE_FEEDBACK_DETAILS, storeFeedbackDetailsSaga),
    yield takeEvery(STORE_MODULE_USAGE, storeModuleUsageSaga),
    yield takeEvery(GET_TOP_MODULE, getTopModuleSaga),
    yield takeEvery(GET_RECENTLY_ADDED, getRecentlyAddedSaga),
    yield takeEvery(GET_APP_TOUR, getAppTourSaga),
  ];
}

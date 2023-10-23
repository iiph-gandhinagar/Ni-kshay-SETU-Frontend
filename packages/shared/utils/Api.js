import NetworkClient from './NetworkClient';
import urls from './urls';
import { BASE_URL } from '../globles';

export async function getAllStateApi() {
    return NetworkClient.get(
        `${BASE_URL}${urls.GET_ALL_STATE}`,
        (status, response) => {
            return response;
        },
    );
}

export async function getDistrictByStateApi(id) {
    return NetworkClient.get(
        `${BASE_URL}${urls.GET_DISTRICT_BY_STATE}/${id}`,
        (status, response) => {
            return response;
        },
    );
}

export async function getAllCadreApi(selectedCadreType) {
    return NetworkClient.get(
        `${BASE_URL}${urls.GET_ALL_CADRE}/${selectedCadreType}`,
        (status, response) => {
            return response;
        },
    );
}

export async function getAllCadreTypeApi() {
    return NetworkClient.get(
        `${BASE_URL}${urls.GET_ALL_CADRE_TYPE}`,
        (status, response) => {
            return response;
        },
    );
}

export async function getHealthByBlockApi(id) {
    return NetworkClient.get(
        `${BASE_URL}${urls.GET_HEALTH_BY_BLOCK}/${id}`,
        (status, response) => {
            return response;
        },
    );
}

export async function getBlockByDistrictApi(id) {
    return NetworkClient.get(
        `${BASE_URL}${urls.GET_BLOCK_BY_DISTRICT}/${id}`,
        (status, response) => {
            return response;
        },
    );
}

export async function apiLoginRequest(loginObj) {
    return NetworkClient.post(
        `${BASE_URL}${urls.LOGIN}`,
        loginObj,
        (status, response) => {
            return response;
        }
    );
}

export async function apiRegisterRequest(registrationDetails) {
    return NetworkClient.postAsFormData(
        `${BASE_URL}${urls.REGISTER}`,
        registrationDetails,
        (status, response) => {
            return response;
        },
        { 'Content-Type': 'multipart/form-data', otherHeader: 'foo' }
    );
}
export async function apiupdateUserDataRequest(useObj) {
    return NetworkClient.post(
        `${BASE_URL}${urls.UPDATE_USER_DATA}`,
        useObj,
        (status, response) => {
            return response;
        }
    );
}

// assessment Api
export async function getAllAssessmentApi() {
    return NetworkClient.get(
        `${BASE_URL}${urls.GET_ALL_ASSESSMENT}`,
        (status, response) => {
            return response;
        },
    );
}
export async function getAssessmentWithQuestionApi(id) {
    return NetworkClient.get(
        `${BASE_URL}${urls.GET_ASSESSMENT_WITH_QUESTION}/${id}`,
        (status, response) => {
            return response;
        },
    );
}

export async function storeAssesmentResultApi(obj) {
    return NetworkClient.post(
        `${BASE_URL}${urls.STORE_ASSESSMENT_RESULT}`, obj,
        (status, response) => {
            return response;
        },
    );
}
export async function storeAssesmentEnrollnmentApi(obj) {
    return NetworkClient.post(
        `${BASE_URL}${urls.STORE_ASSESSMENT_ENROLLNMENT}`, obj,
        (status, response) => {
            return response;
        },
    );
}
export async function getUserAssessmentResultApi(id) {
    return NetworkClient.get(
        `${BASE_URL}${urls.GET_USER_ASSESSMENT_RESULT}/${id}`,
        (status, response) => {
            return response;
        },
    );
}
export async function getUserAssessmentDetailsApi(obj) {
    return NetworkClient.post(
        `${BASE_URL}${urls.GET_USER_ASSESSMENT_DETAILS}`, obj,
        (status, response) => {
            return response;
        },
    );
}
export async function getUserPastAssessmentsApi() {
    return NetworkClient.get(
        `${BASE_URL}${urls.GET_USER_PAST_ASSESSMENTS}`,
        (status, response) => {
            return response;
        },
    );
}
export async function getFutureAssessmentApi() {
    return NetworkClient.get(
        `${BASE_URL}${urls.GET_USER_FUTURE_ASSESSMENT}`,
        (status, response) => {
            return response;
        },
    );
}
// Material APi
export async function getMaterialsApi(data) {
    return NetworkClient.get(
        `${BASE_URL}${urls.GET_MATERIALS}/${data?.type}?filter=${data?.filter}`,
        (status, response) => {
            return response;
        },
    );
}
export async function getRootFoldersApi() {
    return NetworkClient.get(
        `${BASE_URL}${urls.GET_ROOT_FOLDERS}`,
        (status, response) => {
            return response;
        },
    );
}
// Algorithms Api
export async function getAlgorithmsMasterNodeApi(type) {
    if (type == 'Diagnosis Algorithm') {
        return NetworkClient.get(
            `${BASE_URL}${urls.GET_DIAGNOSES_ALGORITHMS_MASTER_NODES}`,
            (status, response) => {
                return response;
            },
        );
    } else if (type == 'Guidance on ADR') {
        return NetworkClient.get(
            `${BASE_URL}${urls.GET_GUIDANCE_ON_ADR_ALGORITHMS_MASTER_NODES}`,
            (status, response) => {
                return response;
            },
        );
    } else if (type == 'Treatment Algorithm') {
        return NetworkClient.get(
            `${BASE_URL}${urls.GET_TREATMENT_ALGORITHMS_MASTER_NODES}`,
            (status, response) => {
                return response;
            },
        );
    } else if (type == 'Latent TB Infection') {
        return NetworkClient.get(
            `${BASE_URL}${urls.GET_LATENT_TB_INFECTION_ALGORITHMS_MASTER_NODES}`,
            (status, response) => {
                return response;
            },
        );
    } else if (type == 'Case Definition') {
        return NetworkClient.get(
            `${BASE_URL}${urls.GET_CASE_DEFINATION_ALGORITHMS_MASTER_NODES}`,
            (status, response) => {
                return response;
            },
        );
    } else if (type == 'CGC') {
        return NetworkClient.get(
            `${BASE_URL}${urls.GET_CGC_ALGORITHMS_MASTER_NODES}`,
            (status, response) => {
                return response;
            },
        );
    }
    else if (type == 'Differentiated Care Of TB Patients') {
        return NetworkClient.get(
            `${BASE_URL}${urls.GET_DIFFERENTIAL_CARE_ALGORITHMS_MASTER_NODES}`,
            (status, response) => {
                return response;
            },
        );
    }
}
export async function getAlgorithmsDependentApi(obj) {
    if (obj?.type == 'Diagnosis Algorithm') {
        return NetworkClient.get(
            `${BASE_URL}${urls.GET_DIAGNOSES_ALGORITHMS_DEPENDENT_NODES}/${obj?.id}`,
            (status, response) => {
                return response;
            },
        );
    } else if (obj?.type == 'Guidance on ADR') {
        return NetworkClient.get(
            `${BASE_URL}${urls.GET_GUIDANCE_ON_ADR_ALGORITHMS_DEPENDENT_NODES}/${obj?.id}`,
            (status, response) => {
                return response;
            },
        );
    } else if (obj?.type == 'Treatment Algorithm') {
        return NetworkClient.get(
            `${BASE_URL}${urls.GET_TREATMENT_ALGORITHMS_DEPENDENT_NODES}/${obj?.id}`,
            (status, response) => {
                return response;
            },
        );
    } else if (obj?.type == 'Latent TB Infection') {
        return NetworkClient.get(
            `${BASE_URL}${urls.GET_LATENT_TB_INFECTION_ALGORITHMS_DEPENDENT_NODES}/${obj?.id}`,
            (status, response) => {
                return response;
            },
        );
    }
    else if (obj?.type == 'Case Definition') {
        return NetworkClient.get(
            `${BASE_URL}${urls.GET_CASE_DEFINATION_ALGORITHMS_DEPENDENT_NODES}/${obj?.id}`,
            (status, response) => {
                return response;
            },
        );
    } else if (obj?.type == 'CGC') {
        return NetworkClient.get(
            `${BASE_URL}${urls.GET_CGC_ALGORITHMS_DEPENDENT_NODES}/${obj?.id}`,
            (status, response) => {
                return response;
            },
        );
    } else if (obj?.type == 'Differentiated Care Of TB Patients') {
        return NetworkClient.get(
            `${BASE_URL}${urls.GET_DIFFERENTIAL_CARE_ALGORITHMS_DEPENDENT_NODES}/${obj?.id}`,
            (status, response) => {
                return response;
            },
        );
    }

}
export async function getLatentTbAlgorithmNodeApi() {
    return NetworkClient.get(
        `${BASE_URL}${urls.GET_LATENT_TB_NODES}`,
        (status, response) => {
            return response;
        },
    );
}
export async function getkeywordsApi(token) {
    return NetworkClient.get(
        `${BASE_URL}${urls.GET_KEYWORDS}?session_token=${token}`,
        (status, response) => {
            return response;
        },
    );
}
export async function getQuestionsBykeywordApi(obj) {
    return NetworkClient.get(
        `${BASE_URL}${urls.GET_QUESTIONS_BY_KEYWORD}/${obj?.id}?page=${obj?.page || 1}&&session_token=${obj.token}&&NTEP=1`,
        (status, response) => {
            return response;
        },
    );
}
export async function getLeaderboardDetailesApi(obj) {
    return NetworkClient.get(
        `${BASE_URL}${urls.GET_LEADERBOARD_DETAILS}?per_page=${obj?.pageSize || 10}&orderBy=id&orderDirection=asc&page=${obj?.page || 1}`,
        (status, response) => {
            return response;
        },
    );

} export async function getLeaderboardTaskListApi(obj) {
    return NetworkClient.get(
        `${BASE_URL}${urls.GET_LEADERBOARD_TASK_LIST}`,
        (status, response) => {
            return response;
        },
    );
}
export async function getAchivementApi() {
    return NetworkClient.get(
        `${BASE_URL}${urls.GET_ACHIVEMENT}`,
        (status, response) => {
            return response;
        },
    );
}
export async function getAllCertificatesApi() {
    return NetworkClient.get(
        `${BASE_URL}${urls.GET_ALL_CERTIFICATES}`,
        (status, response) => {
            return response;
        },
    );
}
export async function postQuestionHitApi(obj) {
    return NetworkClient.post(
        `${BASE_URL}${urls.SUBMIT_QUESTIONS_HIT}`,
        obj,
        (status, response) => {
            return response;
        },
    );
}
export async function loadMoreApi(url) {
    return NetworkClient.get(url,
        (status, response) => {
            return response;
        },
    );
}

export async function searchByKeywordkeywordApi(obj) {
    return NetworkClient.get(
        `${BASE_URL}${urls.SEARCH_BY_KEYWORDS}?session_token=${obj.token}&query=${encodeURI(obj.keyword)}&NTEP=1`,
        (status, response) => {
            return response;
        },
    );
}
export async function sendFeedbackApi(obj) {
    return NetworkClient.post(
        `${BASE_URL}${urls.SEND_FEEDBACK}`, obj,
        (status, response) => {
            return response;
        },
    );
}
export async function getDynamicAlgoNodeApi(key) {
    return NetworkClient.get(
        `${BASE_URL}${urls.GET_DYNAMIC_ALGORITHMS_MASTER_NODES}/${key}`,
        (status, response) => {
            return response;
        },
    );
}
export async function getDynamicAlgoDependentNodeApi(obj) {
    return NetworkClient.get(
        `${BASE_URL}${urls.GET_DYNAMIC_ALGORITHMS_DEPENDENT_NODES}/${obj?.algo_Id}/${obj?.id}`,
        (status, response) => {
            return response;
        },
    );
}
// Chapters Api  
export async function getAllChaptersApi() {
    return NetworkClient.get(
        `${BASE_URL}${urls.GET_ALL_CHAPTERS}`,
        (status, response) => {
            return response;
        },
    );
}

export async function getAllChaptersByIdApi(id) {
    return NetworkClient.get(
        `${BASE_URL}${urls.GET_ALL_CHAPTERS_BY_ID}/${id}`,
        (status, response) => {
            return response;
        },
    );
}
// Screening
export async function getAllSymptomsApi() {
    return NetworkClient.get(
        `${BASE_URL}${urls.GET_ALL_SYMPTOMS}`,
        (status, response) => {
            return response;
        },
    );

}
export async function storeUserScreeningApi(obj) {
    return NetworkClient.post(
        `${BASE_URL}${urls.STORE_USER_SCREENING}`,
        obj,
        (status, response) => {
            return response;
        },
    );
}
// Filter
export async function getFilterDetailsApi(obj) {
    return NetworkClient.get(
        `${BASE_URL}${urls.GET_FILTER_DETAILS}?page=${obj?.page || 1}&health_facility=${obj?.HF || ''}&search_term=${obj?.ST || ''}&state_id=${obj?.stateID > 0 ? obj?.stateID : ''}&district_id=${obj?.districtID > 0 ? obj?.districtID : ''}&block_id=${obj?.blockID > 0 ? obj?.blockID : ''}&sort=${obj?.sort}`,
        (status, response) => {
            return response;
        },
    );
}

// User
export async function getUserDataApi() {
    return NetworkClient.get(
        `${BASE_URL}${urls.GET_USER_V3}`,
        (status, response) => {
            return response;
        },
    );
}
// apps
export async function getAppConfigApi() {
    return NetworkClient.get(
        `${BASE_URL}${urls.GET_APP_CONFIG}`,
        (status, response) => {
            return response;
        },
    );
}
export async function storeUserActivityApi(name) {
    return NetworkClient.post(
        `${BASE_URL}${urls.STORE_USER_ACTIVITY}`, { action: name },
        (status, response) => {
            return response;
        }
    );
}
export async function generateOtpApi(token) {
    return NetworkClient.get(
        `${BASE_URL}${urls.GENERATE_OTP}`,
        (status, response) => {
            return response;
        },
        {
            Authorization: 'Bearer ' + token
        }
    );
}
export async function verifiedOtpApi(obj) {
    return NetworkClient.post(
        `${BASE_URL}${urls.VERIFIED_OTP}`, { otp: obj.otp },
        (status, response) => {
            return response;
        },
        {
            Authorization: 'Bearer ' + obj.token
        }
    );
}
export async function getAppDynamicAlgoApi() {
    return NetworkClient.get(
        `${BASE_URL}${urls.GET_APP_DYNAMIC_ALGO}`,
        (status, response) => {
            return response;
        },
    );
}
export async function getAppCGCAlgoApi() {
    return NetworkClient.get(
        `${BASE_URL}${urls.GET_CGC_ALGORITHMS_MASTER_NODES}`,
        (status, response) => {
            return response;
        },
    );
}
export async function StoreUserDeviceTokenApi(obj) {
    return NetworkClient.post(
        `${BASE_URL}${urls.STORE_USER_DEVICE_TOKENS}`, obj,
        (status, response) => {
            return response;
        }
    );
}
export async function getAppHelthStatusApi(version) {
    return NetworkClient.post(
        `${BASE_URL}${urls.GET_APP_HEALTH_STATUS}`, {
        app_version: version
    },
        (status, response) => {
            return response;
        },
    );
}
export async function removeNotificationTokenApi(obj) {
    return NetworkClient.post(
        `${BASE_URL}${urls.REMOVE_NOTIFICATION_TOKEN}`, obj,
        (status, response) => {
            return response;
        },
    );
}
export async function getFlashNewsApi() {
    return NetworkClient.get(
        `${BASE_URL}get-all-flash-news`,
        (status, response) => {
            return response;
        },
    );
}
export async function getMasterSearchApi(obj) {
    return NetworkClient.get(
        `${BASE_URL}${urls.GET_MASTER_SEARCH}?search_text=${obj.search}`,
        (status, response) => {
            return response;
        },
    );
}
export async function getModuleMasterSearchApi(text) {
    return NetworkClient.get(
        `${BASE_URL}${urls.GET_MODULE_MASTER_SEARCH}?search_text=${text}`,
        (status, response) => {
            return response;
        },
    );
}
export async function getSubModuleMasterSearchApi(text) {
    return NetworkClient.get(
        `${BASE_URL}${urls.GET_SUB_MODULE_MASTER_SEARCH}?search_text=${text}`,
        (status, response) => {
            return response;
        },
    );
}
export async function getRMMasterSearchApi(text) {
    return NetworkClient.get(
        `${BASE_URL}${urls.GET_RM_MASTER_SEARCH}?search_text=${text}`,
        (status, response) => {
            return response;
        },
    );
}
export async function getFAQMasterSearchApi(text) {
    return NetworkClient.get(
        `${BASE_URL}${urls.GET_FAQ_MASTER_SEARCH}?search_text=${text}`,
        (status, response) => {
            return response;
        },
    );
}
export async function getAllSimilarAppsApi() {
    return NetworkClient.get(
        `${BASE_URL}${urls.GET_ALL_SIMILAR_APPS}`,
        (status, response) => {
            return response;
        },
    );
}
export async function getFeedbackDetailsApi({ val }) {
    return NetworkClient.get(
        `${BASE_URL}${urls.GET_FEEDBACK_DETAILS}${val}`,
        (status, response) => {
            return response;
        },
    );
}
export async function storeFeedbackDetailsApi(obj) {
    return NetworkClient.post(
        `${BASE_URL}${urls.STORE_FEEDBACK_DETAILS}`, obj,
        (status, response) => {
            return response;
        }
    );
}
export async function storeModuleUsageApi(obj) {
    return NetworkClient.post(
        `${BASE_URL}${urls.STORE_MODULE_USAGE}`, obj,
        (status, response) => {
            return response;
        }
    );
}
export async function getTopModuleApi() {
    return NetworkClient.get(
        `${BASE_URL}${urls.GET_TOP_MODULE}`,
        (status, response) => {
            return response;
        },
    );
}
export async function getRecentlyAddedApi() {
    return NetworkClient.get(
        `${BASE_URL}${urls.GET_RECENTLY_ADDED}`,
        (status, response) => {
            return response;
        },
    );
}
export async function getAppTourApi() {
    return NetworkClient.get(
        `${BASE_URL}${urls.GET_APP_TOUR}`,
        (status, response) => {
            return response;
        },
    );
}
export async function getAppNotificationApi(page) {
    return NetworkClient.get(
        `${BASE_URL}${urls.GET_APP_NOTIFICATION}?page=${page || 1}`,
        (status, response) => {
            return response;
        },
    );
}
// Contact Us
export async function contactUsApi(contactUsObj) {
    return NetworkClient.post(
        `${BASE_URL}${urls.CONTACT_US}`, contactUsObj,
        (status, response) => {
            return response;
        }
    );
}
// Change Password
export async function changePasswordApi(changePasswordObj) {
    return NetworkClient.post(
        `${BASE_URL}${urls.CHANGE_PASSWORD}`, changePasswordObj,
        (status, response) => {
            return response;
        }
    );
}
export async function forgotPasswordApi(Obj) {
    return NetworkClient.post(
        `${BASE_URL}${urls.FORGOT_PASSWORD}`, Obj,
        (status, response) => {
            return response;
        }
    );
}
export async function verifiedForgotPasswordOtpApi(Obj) {
    return NetworkClient.post(
        `${BASE_URL}${urls.VERIFIED_FORGOT_PASSWORD_OTP}`, Obj,
        (status, response) => {
            return response;
        }
    );
}
// Survey
export async function getAllSurveyApi() {
    return NetworkClient.get(
        `${BASE_URL}${urls.GET_SURVEY_FORM}`,
        (status, response) => {
            return response;
        },
    );
}

export async function getAllQuestionApi(id) {
    return NetworkClient.get(
        `${BASE_URL}${urls.GET_SURVEY_BY_ID}/${id}`,
        (status, response) => {
            return response;
        },
    );
}

export async function storeSurveyQuestionApi(obj) {
    return NetworkClient.post(
        `${BASE_URL}${urls.STORE_SURVEY_QUESTION}`, obj,
        (status, response) => {
            return response;
        },
    );
}

// get-assessment-performace

export async function getAssessmentPerformace() {
    return NetworkClient.get(
        `${BASE_URL}${urls.GET_ASSESSMENT_PERFORMANCE}`,
        (status, response) => {
            return response;
        },
    );
}
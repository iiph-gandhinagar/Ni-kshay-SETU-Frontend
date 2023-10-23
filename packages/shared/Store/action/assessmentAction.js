import {
    ASSESSMENT_ERROR,
    GET_ALL_ASSESSMENT,
    GET_ALL_ASSESSMENT_SUCCESS,
    GET_ASSESSMENT_WITH_QUESTION,
    GET_ASSESSMENT_WITH_QUESTION_SUCCESS,
    GET_USER_PAST_ASSESSMENT,
    GET_USER_ASSESSMENT_DETAILS,
    GET_USER_ASSESSMENT_DETAILS_SUCCESS,
    GET_USER_ASSESSMENT_RESULT,
    GET_USER_ASSESSMENT_RESULT_SUCCESS,
    GET_USER_PAST_ASSESSMENT_SUCCESS,
    STORE_ASSESSMENT_RESULT,
    STORE_ASSESSMENT_RESULT_SUCCESS,
    CLEAR_CURRENT_ASSESSMENT,
    CLEAR_PAST_ASSESSMENT,
    GET_USER_FUTURE_ASSESSMENT,
    GET_USER_FUTURE_ASSESSMENT_SUCCESS,
    CLEAR_FUTURE_ASSESSMENT,
    GET_ASSESSMENT_PERFORMANCE,
    GET_ASSESSMENT_PERFORMANCE_SUCCESS,
    STORE_ASSESSMENT_ENROLLNMENT,
    STORE_ASSESSMENT_ENROLLNMENT_SUCCESS

} from "../types";
export const getAllAssessment = () => {
    return {
        type: GET_ALL_ASSESSMENT,
    };
};
export const getAllAssessmentSuccess = (allAssessment) => {
    return {
        type: GET_ALL_ASSESSMENT_SUCCESS,
        payload: allAssessment
    };
};

export const getAssessmentWithQuestions = (id) => {
    return {
        type: GET_ASSESSMENT_WITH_QUESTION,
        id: id
    };
};
export const getAssessmentWithQuestionsSuccess = (assessment) => {
    return {
        type: GET_ASSESSMENT_WITH_QUESTION_SUCCESS,
        payload: assessment
    };
};

export const storeAssessmentresult = (obj, callBack) => {
    return {
        type: STORE_ASSESSMENT_RESULT,
        payload: obj,
        callBack
    };
};
export const storeAssessmentresultSuccess = (result) => {
    return {
        type: STORE_ASSESSMENT_RESULT_SUCCESS,
        payload: result
    };
};
export const getUserAssessmentDetails = (obj, callBack) => {
    return {
        type: GET_USER_ASSESSMENT_DETAILS,
        obj,
        callBack
    };
};
export const getUserAssessmentDetailsSuccess = () => {
    return {
        type: GET_USER_ASSESSMENT_DETAILS_SUCCESS,
    };
};
export const getUserAssessmentResult = (id) => {
    return {
        type: GET_USER_ASSESSMENT_RESULT,
        id: id
    };
};
export const getUserAssessmentResultSuccess = (result) => {
    return {
        type: GET_USER_ASSESSMENT_RESULT_SUCCESS,
        payload: result
    };
};
export const getUserAssessment = () => {
    return {
        type: GET_USER_PAST_ASSESSMENT
    };
};
export const getUserPastAssessmentSuccess = (result) => {
    return {
        type: GET_USER_PAST_ASSESSMENT_SUCCESS,
        payload: result
    };
};
export const AssessmentError = () => {
    return {
        type: ASSESSMENT_ERROR
    };
};
export const clearCurrentAssessments = () => {
    console.log("clearCurrentAssessments");
    return {
        type: CLEAR_CURRENT_ASSESSMENT,
    };
};
export const ClearPastAssessment = () => {
    return {
        type: CLEAR_PAST_ASSESSMENT,
    };
};
export const getFutureAssessment = () => {
    return {
        type: GET_USER_FUTURE_ASSESSMENT
    };
};
export const getFutureAssessmentSuccess = (result) => {
    return {
        type: GET_USER_FUTURE_ASSESSMENT_SUCCESS,
        payload: result
    };
};
export const ClearFutureAssessment = () => {
    return {
        type: CLEAR_FUTURE_ASSESSMENT,
    };
};
export const getAssessmentPerformace = () => {
    return {
        type: GET_ASSESSMENT_PERFORMANCE
    };
};
export const getAssessmentPerformaceSuccess = (result) => {
    return {
        type: GET_ASSESSMENT_PERFORMANCE_SUCCESS,
        payload: result
    };
};
export const storeAssessmentEnrollnment = (payload, callBack) => {
    return {
        type: STORE_ASSESSMENT_ENROLLNMENT,
        payload,
        callBack
    };
};
export const storeAssessmentEnrollnmentSuccess = (result) => {
    return {
        type: STORE_ASSESSMENT_ENROLLNMENT_SUCCESS,
        payload: result
    };
};
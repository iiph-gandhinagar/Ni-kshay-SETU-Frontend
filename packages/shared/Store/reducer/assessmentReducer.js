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
    CLEAR_FUTURE_ASSESSMENT,
    GET_USER_FUTURE_ASSESSMENT_SUCCESS,
    GET_USER_FUTURE_ASSESSMENT,
    GET_ASSESSMENT_PERFORMANCE_SUCCESS,
    GET_ASSESSMENT_PERFORMANCE,
    STORE_ASSESSMENT_ENROLLNMENT,
    STORE_ASSESSMENT_ENROLLNMENT_SUCCESS,
} from "../types";

const INIT_STATE = {
    loader: false,
    allAssessment: [],
    assessmentQuestions: [],
    userAssessmentResult: [],
    userPastAssessments: [],
    futureAssessments: [],
    assessmentPerformance: [],
};

export default (state = INIT_STATE, action) => {
    switch (action.type) {
        case GET_ALL_ASSESSMENT: {
            return {
                ...state,
                loader: true,
                userAssessmentResult: [],
                assessmentQuestions: [],
            };
        }
        case GET_ALL_ASSESSMENT_SUCCESS: {
            return {
                ...state,
                loader: false,
                allAssessment: action.payload
            };
        }
        case GET_ASSESSMENT_WITH_QUESTION: {
            return {
                ...state,
                loader: true
            };
        }
        case GET_ASSESSMENT_WITH_QUESTION_SUCCESS: {
            return {
                ...state,
                loader: false,
                assessmentQuestions: action.payload
            };
        }
        case GET_USER_ASSESSMENT_DETAILS: {
            return {
                ...state,
                loader: true
            };
        }
        case GET_USER_ASSESSMENT_DETAILS_SUCCESS: {
            return {
                ...state,
                loader: false
            };
        }
        case STORE_ASSESSMENT_RESULT: {
            return {
                ...state,
                // loader: true
            };
        }
        case STORE_ASSESSMENT_RESULT_SUCCESS: {
            return {
                ...state,
                // loader: false,
            };
        }
        case GET_USER_ASSESSMENT_RESULT: {
            return {
                ...state,
                loader: true
            };
        }
        case GET_USER_ASSESSMENT_RESULT_SUCCESS: {
            return {
                ...state,
                loader: false,
                userAssessmentResult: action.payload
            };
        }
        case GET_USER_PAST_ASSESSMENT: {
            return {
                ...state,
                loader: true
            };
        }
        case GET_USER_PAST_ASSESSMENT_SUCCESS: {
            return {
                ...state,
                loader: false,
                userPastAssessments: action.payload,
                userAssessmentResult: [],
            };
        }
        case ASSESSMENT_ERROR: {
            return {
                ...state,
                loader: false,
            };
        }
        case CLEAR_CURRENT_ASSESSMENT: {
            return {
                ...state,
                allAssessment: [],
            };
        }
        case CLEAR_PAST_ASSESSMENT: {
            return {
                ...state,
                userPastAssessments: [],
            };
        }
        case GET_USER_FUTURE_ASSESSMENT: {
            return {
                ...state,
                loader: true,
                futureAssessments: []
            };
        }
        case GET_USER_FUTURE_ASSESSMENT_SUCCESS: {
            return {
                ...state,
                loader: false,
                futureAssessments: action.payload,
            };
        }
        case CLEAR_FUTURE_ASSESSMENT: {
            return {
                ...state,
                futureAssessments: [],
            };
        }
        case GET_ASSESSMENT_PERFORMANCE: {
            return {
                ...state,
                loader: true,
            };
        }
        case GET_ASSESSMENT_PERFORMANCE_SUCCESS: {
            return {
                ...state,
                loader: false,
                assessmentPerformance: action.payload
            };
        }
        case STORE_ASSESSMENT_ENROLLNMENT: {
            return {
                ...state,
                loader: true,
            };
        }
        case STORE_ASSESSMENT_ENROLLNMENT_SUCCESS: {
            return {
                ...state,
                loader: false,
            };
        }
        default:
            return state;
    }
};

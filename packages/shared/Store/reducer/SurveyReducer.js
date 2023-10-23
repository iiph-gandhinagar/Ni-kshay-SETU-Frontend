import {
    GET_ALL_SURVEY_SUCCESS,
    GET_ALL_SURVEY,
    GET_ALL_QUESTION,
    GET_ALL_QUESTION_SUCCESS,
    CLEAR_SURVEY,
    CLEAR_ALL_QUESTION,
    STORE_SURVEY_QUESTION,
    STORE_SURVEY_QUESTION_SUCCESS
} from "../types";

const INIT_STATE = {
    loader: false,
    QuestionList: [],
    SurveyList: [],
};
export default (state = INIT_STATE, action) => {
    switch (action.type) {
        case GET_ALL_SURVEY: {
            return {
                ...state,
                loader: true
            };
        }
        case GET_ALL_SURVEY_SUCCESS: {
            return {
                ...state,
                loader: false,
                SurveyList: action.payload
            };
        }
        case GET_ALL_QUESTION: {
            return {
                ...state,
                loader: true
            };
        }
        case GET_ALL_QUESTION_SUCCESS: {
            return {
                ...state,
                loader: false,
                QuestionList: action.payload
            };
        }
        case CLEAR_SURVEY: {
            return {
                ...state,
                SurveyList: [],
            };
        }
        case CLEAR_ALL_QUESTION: {
            return {
                ...state,
                QuestionList: [],
            };
        }
        case STORE_SURVEY_QUESTION: {
            return {
                ...state,
                loader: true
            };
        }
        case STORE_SURVEY_QUESTION_SUCCESS: {
            return {
                ...state,
                loader: false,
                QuestionList: [],
            };
        }
        default: {
            return state;
        }
    }
};
import {
    GET_ALL_SURVEY,
    GET_ALL_SURVEY_SUCCESS,
    GET_ALL_QUESTION,
    GET_ALL_QUESTION_SUCCESS,
    CLEAR_ALL_QUESTION,
    CLEAR_SURVEY,
    STORE_SURVEY_QUESTION,
    STORE_SURVEY_QUESTION_SUCCESS
} from "../types";

export const getAllSurvey = () => {
    // console.log("getAllSurvey");
    return {
        type: GET_ALL_SURVEY,
    };
};
export const getAllSurveySuccess = (data) => {
    // console.log("getAllSurveySuccess");
    return {
        type: GET_ALL_SURVEY_SUCCESS,
        payload: data
    };
};


export const getAllQuestion = (id) => {
    return {
        type: GET_ALL_QUESTION,
        id: id
    };
};
export const getAllQuestionSuccess = (result) => {
    return {
        type: GET_ALL_QUESTION_SUCCESS,
        payload: result
    };
};
export const clearSurvey = () => {
    return {
        type: CLEAR_SURVEY,
    };
};
export const ClearAllQuestions = () => {
    return {
        type: CLEAR_ALL_QUESTION,
    };
};
export const storeSurveyQuestion = (payload, callBack) => {
    return {
        type: STORE_SURVEY_QUESTION,
        payload,
        callBack
    };
};
export const storeSurveyQuestionSuccess = (result) => {
    return {
        type: STORE_SURVEY_QUESTION_SUCCESS,
        payload: result
    };
};
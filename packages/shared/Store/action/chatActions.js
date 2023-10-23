import {
    CLEAN_CHAT_FLOW, GET_KEYWORDS,
    GET_KEYWORDS_SUCCESS,
    GET_QUESTIONS_BY_KEYWORD,
    GET_QUESTIONS_BY_KEYWORD_SUCCESS,
    LOAD_MORE_DATA,
    LOAD_MORE_DATA_SUCCESS,
    POP_LOADER,
    PUSH_LOADER,
    PUSH_TO_CHAT_FLOW,
    SEARCH_BY_KEYWORDS,
    SEARCH_BY_KEYWORDS_STATIC_SUCCESS,
    SEARCH_BY_KEYWORDS_SUCCESS,
    SEND_FEEDBACK,
    SEND_FEEDBACK_SUCCESS,
    SUBMIT_QUESTIONS_HIT,
    SUBMIT_QUESTIONS_HIT_SUCCESS
} from "../types";

export const getkeywords = (token) => {
    return {
        type: GET_KEYWORDS,
        token: token
    };
};
export const getkeywordsSuccess = (keyWords) => {
    return {
        type: GET_KEYWORDS_SUCCESS,
        payload: keyWords
    };
};
export const getQuestionsBykeyword = (obj) => {
    return {
        type: GET_QUESTIONS_BY_KEYWORD,
        obj: obj
    };
};
export const getQuestionsBykeywordSuccess = (questions) => {
    return {
        type: GET_QUESTIONS_BY_KEYWORD_SUCCESS,
        payload: questions
    };
};
export const postQuestionHit = (obj) => {
    return {
        type: SUBMIT_QUESTIONS_HIT,
        payload: obj
    };
};
export const postQuestionHitSuccess = (id) => {
    return {
        type: SUBMIT_QUESTIONS_HIT_SUCCESS,
        payload: id
    };
};
export const pushToChatFlow = (obj) => {
    return {
        type: PUSH_TO_CHAT_FLOW,
        type_obj: obj.type,
        payload: obj.data,
        isPop: obj.isPop
    };
};
export const clearChatFlow = () => {
    return {
        type: CLEAN_CHAT_FLOW,
    };
};
export const loadMore = (url, type) => {
    return {
        type: LOAD_MORE_DATA,
        url: url,
        data_type: type
    };
};
export const loadMoreSuccess = (data, type) => {
    return {
        type: LOAD_MORE_DATA_SUCCESS,
        payload: data,
        dataType: type
    };
};
export const searchByKeyword = (obj) => {
    return {
        type: SEARCH_BY_KEYWORDS,
        obj: obj
    };
};
export const searchByKeywordSuccess = (questions) => {
    return {
        type: SEARCH_BY_KEYWORDS_SUCCESS,
        payload: questions
    };
};
export const searchByKeywordStaticSuccess = (questions) => {
    return {
        type: SEARCH_BY_KEYWORDS_STATIC_SUCCESS,
        payload: questions
    };
};
export const pushLoader = () => {
    return {
        type: PUSH_LOADER
    };
};
export const popLoader = () => {
    return {
        type: POP_LOADER
    };
};
export const sendFeedback = (obj) => {
    return {
        type: SEND_FEEDBACK,
        obj: obj,
    };
};
export const sendFeedbackSuccess = (payload) => {
    return {
        type: SEND_FEEDBACK_SUCCESS,
        payload: payload
    };
};
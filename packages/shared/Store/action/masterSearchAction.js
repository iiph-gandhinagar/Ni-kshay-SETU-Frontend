import { CLEAR_MASTER_SEARCH, GET_FAQ_MASTER_SEARCH, GET_FAQ_MASTER_SEARCH_SUCCESS, GET_MASTER_SEARCH, GET_MASTER_SEARCH_SUCCESS, GET_MODULE_MASTER_SEARCH, GET_MODULE_MASTER_SEARCH_SUCCESS, GET_RM_MASTER_SEARCH, GET_RM_MASTER_SEARCH_SUCCESS, GET_SUB_MODULE_MASTER_SEARCH, GET_SUB_MODULE_MASTER_SEARCH_SUCCESS, MASTER_SEARCH_ERROR } from "../types";

export const getMasterSearch = (obj) => {
    return {
        type: GET_MASTER_SEARCH,
        payload: obj,
    };
};
export const getMasterSearchSuccess = (obj) => {
    return {
        type: GET_MASTER_SEARCH_SUCCESS,
        payload: obj,
    };
};
export const clearMasterSearch = () => {
    return {
        type: CLEAR_MASTER_SEARCH,
    };
};
export const masterSearchErr = () => {
    return {
        type: MASTER_SEARCH_ERROR,
    };
};
export const getModuleMasterSearch = (obj) => {
    return {
        type: GET_MODULE_MASTER_SEARCH,
        payload: obj,
    };
};
export const getModuleMasterSearchSuccess = (obj) => {
    return {
        type: GET_MODULE_MASTER_SEARCH_SUCCESS,
        payload: obj,
    };
};
export const getSubModuleMasterSearch = (obj) => {
    return {
        type: GET_SUB_MODULE_MASTER_SEARCH,
        payload: obj,
    };
};
export const getSubModuleMasterSearchSuccess = (obj) => {
    return {
        type: GET_SUB_MODULE_MASTER_SEARCH_SUCCESS,
        payload: obj,
    };
};
export const getRMMasterSearch = (obj) => {
    return {
        type: GET_RM_MASTER_SEARCH,
        payload: obj,
    };
};
export const getRMMasterSearchSuccess = (obj) => {
    return {
        type: GET_RM_MASTER_SEARCH_SUCCESS,
        payload: obj,
    };
};
export const getFaqMasterSearch = (obj) => {
    return {
        type: GET_FAQ_MASTER_SEARCH,
        payload: obj,
    };
};
export const getFaqMasterSearchSuccess = (obj) => {
    return {
        type: GET_FAQ_MASTER_SEARCH_SUCCESS,
        payload: obj,
    };
};
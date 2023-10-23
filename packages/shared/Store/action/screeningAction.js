import {
    GET_ALL_SYMPTOMS,
    GET_ALL_SYMPTOMS_SUCCESS,
    STORE_USER_SCREENING,
    STORE_USER_SCREENING_SUCCESS
} from "../types";

export const getAllSymptoms = () => {
    // console.log("getAllState");
    return {
        type: GET_ALL_SYMPTOMS,
    };
};
export const getAllSymptomsSuccess = (data) => {
    // console.log("getAllStateSuccess");
    return {
        type: GET_ALL_SYMPTOMS_SUCCESS,
        payload: data
    };
};
export const storeUserScreening = (submitObj, callBack) => {

    return {
        type: STORE_USER_SCREENING,
        payload: submitObj,
        callBack,
    };
};
export const storeUserScreeningSuccess = () => {
    return {
        type: STORE_USER_SCREENING_SUCCESS,
        // payload: data
    };
};
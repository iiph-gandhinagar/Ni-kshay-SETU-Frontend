import {
    GET_ALL_SYMPTOMS,
    GET_ALL_SYMPTOMS_SUCCESS,
    STORE_USER_SCREENING,
    STORE_USER_SCREENING_SUCCESS
} from "../types";

const INIT_STATE = {
    loader: false,
    symptomsList: [],
};
export default (state = INIT_STATE, action) => {
    switch (action.type) {
        case GET_ALL_SYMPTOMS: {
            return {
                ...state,
                loader: true
            };
        }
        case GET_ALL_SYMPTOMS_SUCCESS: {
            return {
                ...state,
                loader: false,
                symptomsList: action.payload
            };
        }
        case STORE_USER_SCREENING: {
            return {
                ...state,
                loader: true
            };
        }
        case STORE_USER_SCREENING_SUCCESS: {
            return {
                ...state,
                loader: false
            };
        }
        default: {
            return state;
        }
    }
};
import { CLEAR_MASTER_SEARCH, GET_FAQ_MASTER_SEARCH, GET_FAQ_MASTER_SEARCH_SUCCESS, GET_MASTER_SEARCH, GET_MASTER_SEARCH_SUCCESS, GET_MODULE_MASTER_SEARCH, GET_MODULE_MASTER_SEARCH_SUCCESS, GET_RM_MASTER_SEARCH, GET_RM_MASTER_SEARCH_SUCCESS, GET_SUB_MODULE_MASTER_SEARCH, GET_SUB_MODULE_MASTER_SEARCH_SUCCESS, MASTER_SEARCH_ERROR } from "../types";


const INIT_STATE = {
    loader: false,
    moduleLoader: false,
    subModuleLoader: false,
    rmLoader: false,
    faqLoader: false,
    masterSearchData: {},
    moduleData: [],
    subModuleData: [],
    rmData: [],
    faqData: []

};
export default (state = INIT_STATE, action) => {
    switch (action.type) {
        case GET_MASTER_SEARCH: {
            return {
                ...state,
                loader: true,
            };
        }
        case GET_MASTER_SEARCH_SUCCESS: {
            return {
                ...state,
                loader: false,
                masterSearchData: action.payload,
            };
        }
        case GET_MODULE_MASTER_SEARCH: {
            return {
                ...state,
                moduleLoader: true,
            };
        }
        case GET_MODULE_MASTER_SEARCH_SUCCESS: {
            return {
                ...state,
                moduleLoader: false,
                moduleData: action.payload,
            };
        }
        case GET_SUB_MODULE_MASTER_SEARCH: {
            return {
                ...state,
                subModuleLoader: true,
            };
        }
        case GET_SUB_MODULE_MASTER_SEARCH_SUCCESS: {
            return {
                ...state,
                subModuleLoader: false,
                subModuleData: action.payload,
            };
        }
        case GET_RM_MASTER_SEARCH: {
            return {
                ...state,
                rmLoader: true,
            };
        }
        case GET_RM_MASTER_SEARCH_SUCCESS: {
            return {
                ...state,
                rmLoader: false,
                rmData: action.payload,
            };
        }
        case GET_FAQ_MASTER_SEARCH: {
            return {
                ...state,
                faqLoader: true,
            };
        }
        case GET_FAQ_MASTER_SEARCH_SUCCESS: {
            return {
                ...state,
                faqLoader: false,
                faqData: action.payload,
            };
        }
        case CLEAR_MASTER_SEARCH: {
            return {
                ...state,
                loader: false,
                moduleLoader: false,
                subModuleLoader: false,
                rmLoader: false,
                faqLoader: false,
                masterSearchData: {},
                moduleData: [],
                subModuleData: [],
                rmData: [],
                faqData: []
            };
        }
        case MASTER_SEARCH_ERROR: {
            return {
                ...state,
                loader: false,
            };
        }
        default:
            return state;
    }
};
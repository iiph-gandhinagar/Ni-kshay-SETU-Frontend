import { GET_ALL_STATE, GET_ALL_STATE_SUCCESS, GET_DISTRICT_BY_STATE, GET_DISTRICT_BY_STATE_SUCCESS, GET_BLOCK_BY_DISTRICT, GET_BLOCK_BY_DISTRICT_SUCCESS, GET_ALL_CADRE, GET_ALL_CADRE_SUCCESS, GET_HEALTH_BY_BLOCK, GET_HEALTH_BY_BLOCK_SUCCESS, GET_ALL_CADRE_TYPE, GET_ALL_CADRE_TYPE_SUCCESS, CLEAR_DISTRICT, CLEAR_BLOCK, CLEAR_HELTH, CLEAR_CRADE, GET_USERDATA, GET_USERDATA_SUCCESS, UPDATE_USER_DATA, UPDATE_USER_DATA_SUCCESS } from "../types";


const INIT_STATE = {
    loader: false,
    State: [],
    allDistricts: [],
    allBlocks: [],
    allCadres: [],
    allCadresType: [],
    allHealths: [],
    userData: [],
};

export default (state = INIT_STATE, action) => {
    switch (action.type) {
        case GET_ALL_STATE: {
            return {
                ...state,
                loader: true
            };
        }
        case GET_ALL_STATE_SUCCESS: {
            return {
                ...state,
                loader: false,
                State: action.payload
            };
        }
        case GET_DISTRICT_BY_STATE: {
            return {
                ...state,
                loader: true
            };
        }
        case GET_DISTRICT_BY_STATE_SUCCESS: {
            return {
                ...state,
                loader: false,
                allDistricts: action.payload
            };
        }
        case GET_BLOCK_BY_DISTRICT: {
            return {
                ...state,
                loader: true
            };
        }
        case GET_BLOCK_BY_DISTRICT_SUCCESS: {
            return {
                ...state,
                loader: false,
                allBlocks: action.payload
            };
        }
        case GET_ALL_CADRE: {
            return {
                ...state,
                loader: true
            };
        }
        case GET_ALL_CADRE_SUCCESS: {
            return {
                ...state,
                loader: false,
                allCadres: action.payload
            };
        }
        case GET_ALL_CADRE_TYPE: {
            return {
                ...state,
                loader: true
            };
        }
        case GET_ALL_CADRE_TYPE_SUCCESS: {
            return {
                ...state,
                loader: false,
                allCadresType: action.payload
            };
        }
        case GET_HEALTH_BY_BLOCK: {
            return {
                ...state,
                loader: true
            };
        }
        case GET_HEALTH_BY_BLOCK_SUCCESS: {
            return {
                ...state,
                loader: false,
                allHealths: action.payload
            };
        }
        case CLEAR_DISTRICT: {
            return {
                ...state,
                allDistricts: []
            };
        }
        case CLEAR_BLOCK: {
            return {
                ...state,
                allBlocks: []
            };
        }
        case CLEAR_HELTH: {
            return {
                ...state,
                allHealths: []
            };
        }
        case CLEAR_CRADE: {
            return {
                ...state,
                allCadres: []
            };
        }

        case GET_USERDATA: {
            return {
                ...state,
                loader: true
            };
        }
        case GET_USERDATA_SUCCESS: {
            return {
                ...state,
                loader: false,
                userData: action.payload
            };
        }
        case UPDATE_USER_DATA: {
            return {
                ...state,
                loader: true
            };
        }
        case UPDATE_USER_DATA_SUCCESS: {
            return {
                ...state,
                loader: false,
            };
        }
        default:
            return state;
    }
};

import {
    CLEAR_MATERIALS,
    GET_MATERIALS,
    GET_MATERIALS_SUCCESS,
    GET_ROOT_FOLDERS,
    GET_ROOT_FOLDERS_SUCCESS
} from "../types";


const INIT_STATE = {
    loader: false,
    materialsList: [],
    rootFolders: [],
};
export default (state = INIT_STATE, action) => {
    switch (action.type) {
        case GET_MATERIALS: {
            return {
                ...state,
                loader: true
            };
        }
        case GET_MATERIALS_SUCCESS: {
            return {
                ...state,
                loader: false,
                materialsList: action.payload
            };
        }
        case GET_ROOT_FOLDERS: {
            return {
                ...state,
                loader: true
            };
        }
        case GET_ROOT_FOLDERS_SUCCESS: {
            return {
                ...state,
                loader: false,
                rootFolders: action.payload
            };
        }
        case CLEAR_MATERIALS: {
            console.log("CLEAR_MATERIALS reducer");
            return {
                ...state,
                materialsList: []
            };
        }
        default: {
            return state;
        }
    }
};
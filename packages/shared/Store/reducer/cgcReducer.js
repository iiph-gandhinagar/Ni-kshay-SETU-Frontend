import {
    GET_ALL_CHAPTERS,
    GET_ALL_CHAPTERS_SUCCESS,
    GET_ALL_CHAPTERS_BY_ID,
    GET_ALL_CHAPTERS_BY_ID_SUCCESS,
    CLEAR_ALL_CHAPTERS
} from "../types";


const INIT_STATE = {
    loader: false,
    allChapters: [],
    allChaptersById: [],
};
export default (state = INIT_STATE, action) => {
    switch (action.type) {
        case GET_ALL_CHAPTERS: {
            return {
                ...state,
                loader: true,
                allChaptersById: [],
            };
        }
        case GET_ALL_CHAPTERS_SUCCESS: {
            return {
                ...state,
                loader: false,
                allChapters: action.payload
            };
        }
        case GET_ALL_CHAPTERS_BY_ID: {
            return {
                ...state,
                loader: true
            };
        }
        case GET_ALL_CHAPTERS_BY_ID_SUCCESS: {
            return {
                ...state,
                loader: false,
                allChaptersById: action.payload
            };
        }
        case CLEAR_ALL_CHAPTERS: {
            return {
                ...state,
                allChapters: []
            }
        }
        default: {
            return state;
        }
    }
};
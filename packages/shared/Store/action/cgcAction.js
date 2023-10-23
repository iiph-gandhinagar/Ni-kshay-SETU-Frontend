import {
    GET_ALL_CHAPTERS,
    GET_ALL_CHAPTERS_SUCCESS,
    GET_ALL_CHAPTERS_BY_ID,
    GET_ALL_CHAPTERS_BY_ID_SUCCESS,
    CLEAR_ALL_CHAPTERS
} from "../types";
export const getAllChapters = () => {
    return {
        type: GET_ALL_CHAPTERS,
    };
};
export const getAllChaptersSuccess = (allChapters) => {
    return {
        type: GET_ALL_CHAPTERS_SUCCESS,
        payload: allChapters
    };
};
export const clearAllChapters = () => {
    return {
        type: CLEAR_ALL_CHAPTERS,
    };
};
export const getAllChaptersById = (id) => {
    return {
        type: GET_ALL_CHAPTERS_BY_ID,
        id
    };
};
export const getAllChaptersByIdSuccess = (allChaptersById) => {
    return {
        type: GET_ALL_CHAPTERS_BY_ID_SUCCESS,
        payload: allChaptersById
    };
};
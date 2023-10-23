import {
    CLEAR_MATERIALS,
    GET_MATERIALS,
    GET_MATERIALS_SUCCESS,
    GET_ROOT_FOLDERS,
    GET_ROOT_FOLDERS_SUCCESS
} from "../types";
export const getMaterials = (obj) => {
    return {
        type: GET_MATERIALS,
        payload: obj
    };
};
export const getMaterialsSuccess = (allMaterials) => {
    return {
        type: GET_MATERIALS_SUCCESS,
        payload: allMaterials
    };
};
export const clearMaterials = () => {
    return {
        type: CLEAR_MATERIALS
    };
};
export const getRootFolders = () => {
    return {
        type: GET_ROOT_FOLDERS,
    };
};
export const getRootFoldersSuccess = (folders) => {
    return {
        type: GET_ROOT_FOLDERS_SUCCESS,
        payload: folders
    };
};
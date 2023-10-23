import { GET_ALL_STATE, GET_ALL_STATE_SUCCESS, GET_DISTRICT_BY_STATE, GET_DISTRICT_BY_STATE_SUCCESS, GET_BLOCK_BY_DISTRICT, GET_BLOCK_BY_DISTRICT_SUCCESS, GET_ALL_CADRE, GET_ALL_CADRE_SUCCESS, GET_HEALTH_BY_BLOCK, GET_HEALTH_BY_BLOCK_SUCCESS, GET_ALL_CADRE_TYPE, GET_ALL_CADRE_TYPE_SUCCESS, CLEAR_DISTRICT, CLEAR_BLOCK, CLEAR_HELTH, CLEAR_CRADE, GET_USERDATA, GET_USERDATA_SUCCESS, UPDATE_USER_DATA, UPDATE_USER_DATA_SUCCESS } from "../types";


export const getAllState = () => {
    // console.log("getAllState");
    return {
        type: GET_ALL_STATE,
    };
};
export const getAllStateSuccess = (states) => {
    // console.log("getAllStateSuccess");
    return {
        type: GET_ALL_STATE_SUCCESS,
        payload: states
    };
};

export const getDistrictByState = (id) => {
    return {
        type: GET_DISTRICT_BY_STATE,
        id: id,
    };
};

export const getDistrictByStateSuccess = (allDistricts) => {
    return {
        type: GET_DISTRICT_BY_STATE_SUCCESS,
        payload: allDistricts
    };
};

export const getBlockByDistrict = (id) => {
    // console.log("getBlockByDistrict");
    return {
        type: GET_BLOCK_BY_DISTRICT,
        id: id
    };
};

export const getBlockByDistrictSuccess = (allBlocks) => {
    return {
        type: GET_BLOCK_BY_DISTRICT_SUCCESS,
        payload: allBlocks
    };
};

export const getAllCadre = (selectedCadreType) => {
    // console.log("getAllCadre");
    return {
        type: GET_ALL_CADRE,
        selectedCadreType
    };
};

export const getAllCadreSuccess = (allCadres) => {
    // console.log("getAllCadresuccess");
    return {
        type: GET_ALL_CADRE_SUCCESS,
        payload: allCadres
    };
};


export const getHealthByBlock = (id) => {
    // console.log("getHealthByBlock");
    return {
        type: GET_HEALTH_BY_BLOCK,
        id: id
    };
};

export const getHealthByBlockSuccess = (allHealths) => {
    // console.log("getAllHealthsuccess");
    return {
        type: GET_HEALTH_BY_BLOCK_SUCCESS,
        payload: allHealths
    };
};

export const getAllCadreType = () => {
    // console.log("getAllCadreType");
    return {
        type: GET_ALL_CADRE_TYPE,
    };
};

export const getAllCadreTypeSuccess = (allCadresType) => {
    // console.log("getAllCadreTypesuccess");
    return {
        type: GET_ALL_CADRE_TYPE_SUCCESS,
        payload: allCadresType
    };
};

export const clearDistrict = () => {
    return {
        type: CLEAR_DISTRICT,
    };
};
export const clearBlock = () => {
    return {
        type: CLEAR_BLOCK,
    };
};
export const clearHelth = () => {
    return {
        type: CLEAR_HELTH,
    };
};
export const clearCadre = () => {
    return {
        type: CLEAR_CRADE,
    };
};

export const getUserData = () => {
    return {
        type: GET_USERDATA,
    };
};

export const getUserDataSuccess = (userData) => {
    // console.log("getUserDatasuccess");
    return {
        type: GET_USERDATA_SUCCESS,
        payload: userData
    };
};
export const updateUserData = (userObj, callBack) => {
    return {
        type: UPDATE_USER_DATA,
        payload: userObj,
        callBack
    };
};

export const updateUserDataSuccess = () => {
    // console.log("getUserDatasuccess");
    return {
        type: UPDATE_USER_DATA_SUCCESS,
        // payload: userData
    };
};
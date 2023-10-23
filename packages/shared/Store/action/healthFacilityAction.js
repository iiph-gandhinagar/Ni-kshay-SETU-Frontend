import {
    CLEAR_FILTER,
    CLEAR_FILTER_DETAILS,
    GET_FILTER_DETAILS,
    GET_FILTER_DETAILS_SUCCESS,
    SET_BLOCK_ID,
    SET_DISTRICT_ID,
    SET_FACILITIES,
    SET_FILTER_PAGE,
    SET_SEARCH_TERM,
    SET_SORT_BY,
    SET_STATE_ID
} from "../types";
export const getFilterDetails = (obj) => {
    console.log(" getFilterDetails action", obj);
    return {
        type: GET_FILTER_DETAILS,
        obj
    };
};
export const getFilterDetailsSuccess = (filterDetails) => {
    return {
        type: GET_FILTER_DETAILS_SUCCESS,
        payload: filterDetails
    };
};
export const clearFilterDetails = () => {
    return {
        type: CLEAR_FILTER_DETAILS,
    };
};
export const setStateId = (id) => {
    // console.log("getAllState");
    return {
        type: SET_STATE_ID,
        id
    };
};
export const setDistrictId = (id) => {
    // console.log("getAllState");
    return {
        type: SET_DISTRICT_ID,
        id
    };
};
export const setBlockId = (id) => {
    // console.log("getAllState");
    return {
        type: SET_BLOCK_ID,
        id
    };
};
export const setFacilities = (facility) => {
    // console.log("getAllState");
    return {
        type: SET_FACILITIES,
        facility
    };
}
export const setFilterPage = (page) => {
    // console.log("getAllState");
    return {
        type: SET_FILTER_PAGE,
        page
    };
};
export const setSearchTerm = (text) => {
    // console.log("getAllState");
    return {
        type: SET_SEARCH_TERM,
        text
    };
};
export const setSortBy = (text) => {
    // console.log("getAllState");
    return {
        type: SET_SORT_BY,
        text
    };
};
export const clearFilters = () => {
    return {
        type: CLEAR_FILTER,
    };
};
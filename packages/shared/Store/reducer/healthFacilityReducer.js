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


const INIT_STATE = {
    loader: false,
    filterDetails: [],
    filterObj: {},
    stateID: -1,
    districtID: -1,
    blockID: -1,
    facility: '',
    filterPage: 1,
    searchTerm: '',
    sortBy: 'ASC',
};
export default (state = INIT_STATE, action) => {
    switch (action.type) {
        case GET_FILTER_DETAILS: {
            return {
                ...state,
                loader: true
            };
        }
        case GET_FILTER_DETAILS_SUCCESS: {
            return {
                ...state,
                loader: false,
                filterDetails: [...state.filterDetails, ...action.payload?.data],
                filterObj: action.payload,
            };
        }
        case CLEAR_FILTER_DETAILS: {
            // console.log("CLEAR_FILTER_DETAILS",action);
            return {
                ...state,
                filterDetails: [...[]],
                filterObj: {},
            };
        }
        case SET_STATE_ID: {
            return {
                ...state,
                stateID: action.id,
            };
        }
        case SET_DISTRICT_ID: {
            return {
                ...state,
                districtID: action.id,
            };
        }
        case SET_BLOCK_ID: {
            return {
                ...state,
                blockID: action.id,
            };
        }
        case SET_FACILITIES: {
            return {
                ...state,
                facility: action.facility,
            };
        } case SET_FILTER_PAGE: {
            return {
                ...state,
                filterPage: action.page,
            };
        }
        case SET_SEARCH_TERM: {
            return {
                ...state,
                searchTerm: action.text,
            };
        }
        case SET_SORT_BY: {
            return {
                ...state,
                sortBy: action.text,
            };
        }
        case CLEAR_FILTER: {
            return {
                ...state,
                stateID: -1,
                districtID: -1,
                blockID: -1,
                facility: '',
                filterPage: 1,
                searchTerm: '',
                sortBy: 'ASC',
            };
        }
        default: {
            return state;
        }
    }
};
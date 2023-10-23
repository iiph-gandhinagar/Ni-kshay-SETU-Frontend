import {
    CLEAR_LEADERBOARD_DATA,
    GET_ACHIVEMENT,
    GET_ACHIVEMENT_SUCCESS,
    GET_LEADERBOARD_DETAILES_SUCCESS,
    LEADERBOARD_DATA,
    LEADERBOARD_TASK_LIST,
    LEADERBOARD_TASK_LIST_SUCCESS,
    GET_ALL_CERTIFICATES,
    GET_ALL_CERTIFICATES_SUCCESS,
} from "../types";

const INIT_STATE = {
    loader: false,
    listData:{},
    lederBoardList: [],
    lederBoardTaskList: {},
    achivement: {},
    allCertificates: [],
};
export default (state = INIT_STATE, action) => {
    switch (action.type) {
        case LEADERBOARD_DATA: {
            return {
                ...state,
                loader: true
            };
        }
        case GET_LEADERBOARD_DETAILES_SUCCESS: {
            return {
                ...state,
                loader: false,
                listData: action.payload,
                lederBoardList: [...state.lederBoardList, ...action.payload?.data]
            };
        }
        case CLEAR_LEADERBOARD_DATA:{
            return {
                ...state,
                loader: false,
                listData: {},
                lederBoardList: []
            };
        }
        case LEADERBOARD_TASK_LIST: {
            return {
                ...state,
                loader: true
            };
        }
        case LEADERBOARD_TASK_LIST_SUCCESS: {
            return {
                ...state,
                loader: false,
                lederBoardTaskList: action.payload
            };
        }
        case GET_ACHIVEMENT: {
            return {
                ...state,
                loader: true
            };
        }
        case GET_ACHIVEMENT_SUCCESS: {
            return {
                ...state,
                loader: false,
                achivement: action.payload
            };
        }
        case GET_ALL_CERTIFICATES: {
            return {
                ...state,
                loader: true
            };
        }
        case GET_ALL_CERTIFICATES_SUCCESS: {
            return {
                ...state,
                loader: false,
                allCertificates: action.payload
            };
        }
        default: {
            return state;
        }
    }
};



import {
    CLEAN_CHAT_FLOW, GET_KEYWORDS,
    GET_KEYWORDS_SUCCESS,
    GET_QUESTIONS_BY_KEYWORD,
    GET_QUESTIONS_BY_KEYWORD_SUCCESS,
    LOAD_MORE_DATA,
    LOAD_MORE_DATA_SUCCESS,
    POP_LOADER,
    PUSH_LOADER,
    PUSH_TO_CHAT_FLOW,
    SEARCH_BY_KEYWORDS,
    SEARCH_BY_KEYWORDS_STATIC_SUCCESS,
    SEARCH_BY_KEYWORDS_SUCCESS,
    SEND_FEEDBACK_SUCCESS,
    SUBMIT_QUESTIONS_HIT,
    SUBMIT_QUESTIONS_HIT_SUCCESS
} from "../types";

const chatStaticData = []
const INIT_STATE = {
    chatloader: false,
    currentKeywordObj: {},
    questionHitLoader: false,
    chatArray: chatStaticData,
    feedBackArray: [],
    questionActivityId: '',
};
export default (state = INIT_STATE, action) => {
    switch (action.type) {
        case GET_KEYWORDS: {
            return {
                ...state,
                loader: true
            };
        }
        case GET_KEYWORDS_SUCCESS: {
            // console.log("chat reducer 1");
            return {
                ...state,
                loader: false,
                chatloader: false,
                chatArray: [...state.chatArray, {
                    type: 'StaticData',
                    data: [{
                        id: 2, title:
                            'Select the topic or write your question below.',
                    }]
                }, {
                    type: 'KeyWords',
                    data: action.payload
                }],
                currentKeywordObj: action.payload
            };
        }
        case GET_QUESTIONS_BY_KEYWORD: {
            return {
                ...state,
                loader: true
            };
        }
        case GET_QUESTIONS_BY_KEYWORD_SUCCESS: {
            // console.log("chat reducer 2");
            return {
                ...state,
                loader: false,
                chatArray: [...state.chatArray, {
                    type: 'Questions',
                    data: action.payload
                }
                ]
            };
        }
        case SUBMIT_QUESTIONS_HIT: {
            return {
                ...state,
                questionHitLoader: true
            };
        }
        case SUBMIT_QUESTIONS_HIT_SUCCESS: {
            return {
                ...state,
                questionHitLoader: false,
                questionActivityId: action.payload
            };
        }
        case PUSH_TO_CHAT_FLOW: {

            return {
                ...state,
                chatArray: [...state.chatArray, {
                    type: action.type_obj,
                    data: action.payload
                }]
            };
        }
        case CLEAN_CHAT_FLOW: {
            // console.log("chat reducer 4");
            // console.log("CLEAN_CHAT_FLOW");
            return {
                ...state,
                chatArray: chatStaticData,
                feedBackArray: [],
                questionActivityId: '',
            };
        }
        case GET_KEYWORDS: {
            return {
                ...state,
                loader: true
            };
        }
        case GET_KEYWORDS_SUCCESS: {
            // console.log("chat reducer 5");
            return {
                ...state,
                loader: false,
                chatloader: false,
                chatArray: [...state.chatArray, {
                    type: 'KeyWords',
                    data: action.payload
                }]
            };
        }
        case LOAD_MORE_DATA: {
            return {
                ...state,
                loader: true
            };
        }
        case LOAD_MORE_DATA_SUCCESS: {
            // console.log("chat reducer 6");
            return {
                ...state,
                loader: false,
                chatloader: false,
                chatArray: [...state.chatArray,
                {
                    type: action.dataType,
                    data: action.payload
                }, action.dataType === 'Questions' && {
                    type: 'QuestionsStaticAdd',
                    data: action.payload
                }
                ],
                currentKeywordObj: action.dataType === "KeyWords" ? action.payload : {}
            };
        }
        case SEARCH_BY_KEYWORDS: {
            return {
                ...state,
                loader: true
            };
        }
        case SEARCH_BY_KEYWORDS_SUCCESS: {
            // console.log("chat reducer 7");
            return {
                ...state,
                loader: false,
                chatArray: [...state.chatArray, {
                    type: 'tag-Modules',
                    data: action.payload
                }]
            };
        }
        case SEARCH_BY_KEYWORDS_STATIC_SUCCESS: {
            // console.log("chat reducer 8");
            return {
                ...state,
                loader: false,
                chatArray: [...state.chatArray, {
                    type: 'tag-Modules-static',
                    data: action.payload
                }]
            };
        }
        case PUSH_LOADER: {
            // console.log("chat reducer 8 push loader");
            return {
                ...state,
                chatloader: true,
                chatArray: [...state.chatArray, {
                    type: 'Loader',
                }]
            };
        }
        case POP_LOADER: {

            return {
                ...state,
                chatloader: false,

            };
        }
        case SEND_FEEDBACK_SUCCESS: {
            // console.log("chat reducer 1");
            return {
                ...state,
                feedBackArray: [...state.feedBackArray, action.payload]
            };
        }
        default:
            return state;
    }
};
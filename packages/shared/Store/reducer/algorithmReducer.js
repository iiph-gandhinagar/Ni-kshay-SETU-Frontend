import {
    ALGORITHMS_FLOW,
    CLEAN_ALGORITHMS_FLOW,
    CLEAN_ALGORITHMS_DEPENDENT_NODES,
    GET_ALGORITHMS_DEPENDENT_NODES,
    GET_ALGORITHMS_DEPENDENT_NODES_SUCCESS,
    GET_ALGORITHMS_MASTER_NODES,
    GET_ALGORITHMS_MASTER_NODES_SUCCESS,
    CLEAN_ALGORITHMS_MASTER_NODES,
    GET_LATENT_TB_NODES,
    GET_LATENT_TB_NODES_SUCCESS,
    GET_DYNAMIC_ALGORITHMS_MASTER_NODES,
    GET_DYNAMIC_ALGORITHMS_MASTER_NODES_SUCCESS,
    GET_DYNAMIC_ALGORITHMS_DEPENDENT_NODES,
    GET_DYNAMIC_ALGORITHMS_DEPENDENT_NODES_SUCCESS,

} from "../types";

const INIT_STATE = {
    loader: false,
    algorithmMasterNodes: [],
    algorithmDependentNodes: {},
    algorithmFlow: [],
    algoNodes: {},
};

export default (state = INIT_STATE, action) => {
    switch (action.type) {
        case GET_ALGORITHMS_MASTER_NODES: {
            return {
                ...state,
                loader: true
            };
        }
        case GET_ALGORITHMS_MASTER_NODES_SUCCESS: {
            return {
                ...state,
                loader: false,
                algorithmMasterNodes: action.payload,
            };
        }
        case CLEAN_ALGORITHMS_MASTER_NODES: {
            return {
                ...state,
                algorithmMasterNodes: []
            };
        }
        case GET_ALGORITHMS_DEPENDENT_NODES: {
            return {
                ...state,
                loader: true
            };
        }
        case GET_ALGORITHMS_DEPENDENT_NODES_SUCCESS: {
            return {
                ...state,
                loader: false,
                algorithmDependentNodes: action.payload,
            };
        }
        case ALGORITHMS_FLOW: {
            return {
                ...state,
                algorithmFlow: action.array,
            };
        }
        case CLEAN_ALGORITHMS_FLOW: {
            return {
                ...state,
                algorithmFlow: [...[]],
            };
        }
        case CLEAN_ALGORITHMS_DEPENDENT_NODES: {
            return {
                ...state,
                algorithmDependentNodes: {},
            };
        }
        case GET_LATENT_TB_NODES: {
            return {
                ...state,
                loader: true
            };
        }
        case GET_LATENT_TB_NODES_SUCCESS: {
            return {
                ...state,
                loader: false,
                algoNodes: action.payload,
            };
        }
        case GET_DYNAMIC_ALGORITHMS_MASTER_NODES: {
            return {
                ...state,
                loader: true
            };
        }
        case GET_DYNAMIC_ALGORITHMS_MASTER_NODES_SUCCESS: {
            return {
                ...state,
                loader: false,
                algorithmMasterNodes: action.payload,
            };
        }
        case GET_DYNAMIC_ALGORITHMS_DEPENDENT_NODES: {
            return {
                ...state,
                loader: true
            };
        }
        case GET_DYNAMIC_ALGORITHMS_DEPENDENT_NODES_SUCCESS: {
            return {
                ...state,
                loader: false,
                algorithmDependentNodes: action.payload,
            };
        }
        default:
            return state;
    }
};
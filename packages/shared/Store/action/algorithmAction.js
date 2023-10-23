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


export const getAlgorithmsMasterNode = (algo_type) => {
    return {
        type: GET_ALGORITHMS_MASTER_NODES,
        algorithm_Type: algo_type
    };
};
export const getAlgorithmsMasterNodeSuccess = (MasterNodes) => {
    return {
        type: GET_ALGORITHMS_MASTER_NODES_SUCCESS,
        payload: MasterNodes
    };
};
export const clearAlgorithmsMasterNode = () => {
    return {
        type: CLEAN_ALGORITHMS_MASTER_NODES
    };
};
export const getlgorithmsDependentNode = (obj) => {
    return {
        type: GET_ALGORITHMS_DEPENDENT_NODES,
        obj: obj,
    };
};
export const getAlgorithmsDependentNodeSuccess = (DependentNodes) => {
    return {
        type: GET_ALGORITHMS_DEPENDENT_NODES_SUCCESS,
        payload: DependentNodes
    };
};
export const AlgorithmFlow = (array) => {
    return {
        type: ALGORITHMS_FLOW,
        array: array
    };
};
export const cleanAlgorithmFlow = () => {
    return {
        type: CLEAN_ALGORITHMS_FLOW,
    };
};
export const cleanAlgorithmsDependentNode = () => {
    return {
        type: CLEAN_ALGORITHMS_DEPENDENT_NODES,
    };
};
export const getLatentTbAlgorithmNode = () => {
    return {
        type: GET_LATENT_TB_NODES
    };
};
export const getLatentTbAlgorithmNodeSuccess = (nodes) => {
    return {
        type: GET_LATENT_TB_NODES_SUCCESS,
        payload: nodes
    };
}
export const getDynamicAlgorithmsMasterNode = (id) => {
    return {
        type: GET_DYNAMIC_ALGORITHMS_MASTER_NODES,
        id: id
    };
};
export const getDynamicAlgorithmsMasterNodeSuccess = (MasterNodes) => {
    return {
        type: GET_DYNAMIC_ALGORITHMS_MASTER_NODES_SUCCESS,
        payload: MasterNodes
    };
};
export const getDynamicAlgoDependentNode = (obj) => {
    return {
        type: GET_DYNAMIC_ALGORITHMS_DEPENDENT_NODES,
        obj: obj,
    };
};
export const getDynamicAlgoDependentNodeSuccess = (DependentNodes) => {
    return {
        type: GET_DYNAMIC_ALGORITHMS_DEPENDENT_NODES_SUCCESS,
        payload: DependentNodes
    };
};
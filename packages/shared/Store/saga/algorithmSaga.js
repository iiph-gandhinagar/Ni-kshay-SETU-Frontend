import { call, put, takeEvery, select } from "redux-saga/effects";
import {
    getAlgorithmsDependentApi,
    getAlgorithmsMasterNodeApi,
    getDynamicAlgoDependentNodeApi,
    getDynamicAlgoNodeApi,
    getLatentTbAlgorithmNodeApi
} from "../../utils/Api";
import { processErrorAndRespond } from "../../utils/functions";
import {
    getAlgorithmsDependentNodeSuccess,
    getAlgorithmsMasterNodeSuccess,
    getDynamicAlgoDependentNodeSuccess,
    getDynamicAlgorithmsMasterNodeSuccess,
    getLatentTbAlgorithmNodeSuccess
} from "../action/algorithmAction";
import {
    GET_ALGORITHMS_DEPENDENT_NODES,
    GET_ALGORITHMS_MASTER_NODES,
    GET_DYNAMIC_ALGORITHMS_DEPENDENT_NODES,
    GET_DYNAMIC_ALGORITHMS_MASTER_NODES,
    GET_LATENT_TB_NODES
} from "../types";
function* getAlgorithmsMasterNodeSaga(action) {
    // console.log("getAlgorithmsMasterNodeSaga");
    try {
        const response = yield call(getAlgorithmsMasterNodeApi, action.algorithm_Type);

        if (response?.data.success) {
            yield put(getAlgorithmsMasterNodeSuccess(response?.data.data));
        }

    } catch (error) {
        console.log("Error :- ", error?.response);
        console.log("API Error:- ", processErrorAndRespond(error));
    }

}
function* getAlgorithmsDependentSaga(action) {
    try {
        const response = yield call(getAlgorithmsDependentApi, action.obj);

        if (response?.data.success) {
            // console.log("getAlgorithmsDependentSaga", response?.data.data);
            yield put(getAlgorithmsDependentNodeSuccess(response?.data.data));
        }

    } catch (error) {
        console.log("Error :- ", error?.response);
        console.log("API Error:- ", processErrorAndRespond(error));
    }

}
function* getLatentTbAlgorithmNodeSaga() {
    try {
        const response = yield call(getLatentTbAlgorithmNodeApi);

        if (response?.data.success) {
            // console.log("getLatentTbAlgorithmNodeSaga", response?.data.data);
            yield put(getLatentTbAlgorithmNodeSuccess(response?.data.data));
        }

    } catch (error) {
        console.log("Error :- ", error?.response);
        console.log("API Error:- ", processErrorAndRespond(error));
    }

}
function* getDynamicAlgorithmsMasterNodeSaga(action) {
    // console.log("getAlgorithmsMasterNodeSaga");
    try {
        const response = yield call(getDynamicAlgoNodeApi, action.id);

        if (response?.data.success) {
            yield put(getDynamicAlgorithmsMasterNodeSuccess(response?.data.data));
        }

    } catch (error) {
        console.log("Error :- ", error?.response);
        console.log("API Error:- ", processErrorAndRespond(error));
    }

}
function* getDynamicAlgorithmsDependentSaga(action) {
    try {
        const response = yield call(getDynamicAlgoDependentNodeApi, action.obj);

        if (response?.data.success) {
            // console.log("getAlgorithmsDependentSaga", response?.data.data);
            yield put(getDynamicAlgoDependentNodeSuccess(response?.data.data));
        }

    } catch (error) {
        console.log("Error :- ", error?.response);
        console.log("API Error:- ", processErrorAndRespond(error));
    }

}
export function* algorithmSaga() {
    [
        yield takeEvery(GET_ALGORITHMS_MASTER_NODES, getAlgorithmsMasterNodeSaga),
        yield takeEvery(GET_ALGORITHMS_DEPENDENT_NODES, getAlgorithmsDependentSaga),
        yield takeEvery(GET_LATENT_TB_NODES, getLatentTbAlgorithmNodeSaga),
        yield takeEvery(GET_DYNAMIC_ALGORITHMS_MASTER_NODES, getDynamicAlgorithmsMasterNodeSaga),
        yield takeEvery(GET_DYNAMIC_ALGORITHMS_DEPENDENT_NODES, getDynamicAlgorithmsDependentSaga),
    ];
}